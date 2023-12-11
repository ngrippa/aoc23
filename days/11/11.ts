import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";
import { manhattanDistance, Point } from "../../utils/graph";
import { elementsBetween } from "../../utils/math";

export const expandUniverse = (data: string[]): [number[], number[]] => {
  const colsToExpand = [];
  for (let col = 0; col < data[0].length; col++) {
    if (data.every((d) => d[col] === ".")) colsToExpand.push(col);
  }
  const rowsToExpand = [];
  for (let row = 0; row < data.length; row++) {
    if (data[row].split("").every((c) => c === ".")) rowsToExpand.push(row);
  }
  return [rowsToExpand, colsToExpand];
};

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);
  const [expandedRows, expandedCols] = expandUniverse(data);

  const modifiedManhattanDistance = (galaxyA: Point, galaxyB: Point) => {
    const manhatten = manhattanDistance(galaxyA, galaxyB);
    const expanded =
      elementsBetween(expandedRows, galaxyA[0], galaxyB[0]) +
      elementsBetween(expandedCols, galaxyA[1], galaxyB[1]);
    const expansionResult = star === 1 ? 2 : 1000000;
    return manhatten + expanded * (expansionResult - 1);
  };

  const galaxies = data.reduce(
    (acc, curr, row) => [
      ...acc,
      ...curr.split("").reduce((accI, currI, col) => {
        if (currI === "#") accI.push([row, col] as Point);
        return accI;
      }, [] as Point[]),
    ],
    [] as Point[],
  );

  return galaxies.reduce(
    (acc, galaxyA, galaxyAIndex) =>
      acc +
      galaxies.slice(galaxyAIndex + 1).reduce((accI, galaxyB, galaxyBIndex) => {
        const distance = modifiedManhattanDistance(galaxyA, galaxyB);
        return distance + accI;
      }, 0),
    0,
  );
};
