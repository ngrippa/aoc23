import { loadDataGrouped } from "../../utils/loadData";
import { Solve, Star } from "../../utils/types";
import { flipField } from "../../utils/processing";
import { stringsHaveExactlyOneDiff } from "../../utils/string";

const findSymmetries =
  (star: Star) =>
  (field: string[]): number => {
    axis: for (let start = 0; start < field.length - 1; start++) {
      let smudge = star === 1;
      for (let a = start; a >= 0; a--) {
        const b = 2 * start - a + 1;
        if (!field[b]) break;
        if (field[a] === field[b]) continue;
        if (smudge || stringsHaveExactlyOneDiff(field[a], field[b]) === null)
          continue axis;
        smudge = true;
      }
      if (smudge) return start + 1;
    }
    return 0;
  };

export const solve: Solve = (star, input) => {
  const data = loadDataGrouped(star, input, __dirname);
  const findSym = findSymmetries(star);
  return data.reduce(
    (acc, field) => acc + (findSym(field) * 100 || findSym(flipField(field))),
    0,
  );
};
