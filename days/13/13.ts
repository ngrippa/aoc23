import { loadDataGrouped } from "../../utils/loadData";
import { Solve, Star } from "../../utils/types";
import { flipField } from "../../utils/processing";
import { stringsHaveExactlyOneDiff } from "../../utils/string";

const findSymmetries =
  (star: Star) =>
  (field: string[]): number => {
    const confirmedSymmetries: number[] = [];

    axis: for (let start = 0; start < field.length - 1; start++) {
      let smudge = false;
      for (let a = start; a >= 0; a--) {
        const b = 2 * start - a + 1;
        if (!field[b]) break;
        if (field[a] === field[b]) continue;
        if (star === 1 || smudge) continue axis;
        const cmp = stringsHaveExactlyOneDiff(field[a], field[b]);
        if (cmp === null) continue axis;
        smudge = true;
      }
      if (star === 1 || smudge) confirmedSymmetries.push(start);
    }

    return confirmedSymmetries.reduce((acc, curr) => acc + curr + 1, 0);
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
