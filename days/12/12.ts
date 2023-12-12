import { loadData } from "../../utils/loadData";
import { Solve, Star } from "../../utils/types";
import { splitNumbers } from "../../utils/processing";
import { repeat } from "../../utils/math";
import { memoize } from "lodash";

type Row = { springs: string; information: number[] };

const parseRow = (str: string): Row => {
  const s = str.split(" ");
  return {
    springs: s[0],
    information: splitNumbers(s[1], ","),
  } as Row;
};

const arrangementValid = memoize(
  (
    remainingSprings: string,
    remainingInfo: number[],
    lastGroupLength: number,
  ) => {
    if (!remainingSprings.length) {
      if (
        (!remainingInfo.length && !lastGroupLength) ||
        (remainingInfo.length === 1 && remainingInfo[0] === lastGroupLength)
      ) {
        return 1;
      } else {
        return 0;
      }
    }
    if (lastGroupLength > remainingInfo[0]) return 0;
    let returnValue = 0;
    const options =
      remainingSprings[0] === "?" ? ["#", "."] : remainingSprings[0];

    for (const option of options) {
      if (option === "#") {
        returnValue += arrangementValid(
          remainingSprings.substring(1),
          remainingInfo,
          lastGroupLength + 1,
        );
      } else {
        if (lastGroupLength && lastGroupLength !== remainingInfo[0]) continue;
        returnValue += arrangementValid(
          remainingSprings.substring(1),
          remainingInfo.slice(lastGroupLength ? 1 : 0),
          0,
        );
      }
    }
    return returnValue;
  },
  (springs, info, length) => `${length}_${info.join(",")}_${springs}`,
);

export const countRowArrangements = (star: Star) => (str: string) => {
  const row = parseRow(str);
  const newRow =
    star === 1
      ? row
      : {
          springs: repeat(row.springs.split(""), 5, ["?"]).join(""),
          information: repeat(row.information, 5, []),
        };
  return arrangementValid(newRow.springs, newRow.information, 0);
};

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);

  return data.reduce((acc, curr) => acc + countRowArrangements(star)(curr), 0);
};
