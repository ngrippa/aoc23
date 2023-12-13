import { loadDataGrouped } from "../../utils/loadData";
import { Solve, Star } from "../../utils/types";
import { flipField } from "../../utils/processing";
import { cloneDeep } from "lodash";
import {
  replaceCharacter,
  stringsHaveExactlyOneDiff,
} from "../../utils/string";

type PotentialSymmetry = { i: number; field: string[]; usedSmudge: boolean };

const findPotentialSymmetriesInField =
  (star: Star) =>
  (field: string[]): PotentialSymmetry[] =>
    field.reduce((acc, curr, i) => {
      const next = field[i + 1];
      if (!next) return acc;
      if (curr === next) {
        acc.push({ i, field, usedSmudge: false });
      } else {
        if (star === 2) {
          const cmp = stringsHaveExactlyOneDiff(curr, next);
          if (cmp !== null) {
            const copiedField = cloneDeep(field);
            copiedField[i] = replaceCharacter(
              copiedField[i],
              cmp,
              copiedField[i + 1][cmp],
            );
            acc.push({ i, field: copiedField, usedSmudge: true });
          }
        }
      }
      return acc;
    }, [] as PotentialSymmetry[]);

const confirmSymmetriesInField =
  (star: Star) =>
  (potentialSymmetries: PotentialSymmetry[]): number => {
    const confirmedSymmetries = potentialSymmetries.filter(
      ({ i, field, usedSmudge }) => {
        let smudge = usedSmudge;
        for (let a = i - 1; a >= 0; a--) {
          const b = 2 * i - a + 1;
          if (!field[b]) break;
          if (field[a] !== field[b]) {
            if (star === 2 && !smudge) {
              const cmp = stringsHaveExactlyOneDiff(field[a], field[b]);
              if (cmp === null) {
                return false;
              } else {
                smudge = true;
              }
            } else {
              return false;
            }
          }
        }
        if (star === 2) return smudge;
        return true;
      },
    );
    return confirmedSymmetries.reduce((acc, curr) => acc + curr.i + 1, 0);
  };

const findSymmetries = (star: Star) => (field: string[]) => {
  const potential = findPotentialSymmetriesInField(star)(field);
  return confirmSymmetriesInField(star)(potential);
};

export const solve: Solve = (star, input) => {
  const data = loadDataGrouped(star, input, __dirname);
  const findSym = findSymmetries(star);
  const horizontal = data.reduce((acc, field) => acc + findSym(field), 0);
  const vertical = data.reduce(
    (acc, field) => acc + findSym(flipField(field)),
    0,
  );
  return horizontal * 100 + vertical;
};
