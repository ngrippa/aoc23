import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";

const isNumber = (n: string) => !isNaN(+n);

const hasAdjacentMarkers = (
  data: string[],
  row: number,
  firstCell: number,
  lastCell: number,
) => {
  const adjacentCells = [];
  adjacentCells.push(data[row][firstCell - 1]);
  adjacentCells.push(data[row][lastCell + 1]);
  for (let i = firstCell - 1; i <= lastCell + 1; i++) {
    adjacentCells.push(data[row - 1]?.[i]);
    adjacentCells.push(data[row + 1]?.[i]);
  }
  const res = adjacentCells
    .filter(Boolean)
    .find((c) => c !== "." && !isNumber(c));
  return res!!;
};

const getGearValue = (
  partNumbers: PartNumber[],
  row: number,
  cell: number,
) => {
  const adjacent = partNumbers.filter((pn) => {
    if (pn.row === row) {
      return pn.end + 1 === cell || cell + 1 === pn.start;
    } else if (Math.abs(pn.row - row) === 1) {
      return pn.start <= cell + 1 && pn.end >= cell - 1;
    }
    return false;
  });
  if (adjacent.length === 2) return adjacent[0].number * adjacent[1].number;
  return 0;
};

type PartNumber = {
  number: number;
  row: number;
  start: number;
  end: number;
};

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);

  const partNumbers: PartNumber[] = [];

  data.forEach((row, rowIndex) => {
    let i = 0;
    let currentNumberString = "";
    while (true) {
      const char = row[i];
      if (isNumber(char)) {
        currentNumberString += char;
      } else {
        if (currentNumberString) {
          const start = i - currentNumberString.length;
          const end = i - 1;
          if (hasAdjacentMarkers(data, rowIndex, start, end)) {
            const number = +currentNumberString;
            partNumbers.push({ number, row: rowIndex, start, end });
          } else {
          }
          currentNumberString = "";
        }
        if (!char) break;
      }
      i++;
    }
  });

  if (star === 1) {
    return partNumbers.reduce((acc, curr) => acc + curr.number, 0);
  } else {
    let gears = 0;
    data.forEach((s, row) => {
      s.split("").forEach((char, cell) => {
        if (char === "*") {
          gears += getGearValue(partNumbers, row, cell);
        }
      });
    });
    return gears;
  }
};
