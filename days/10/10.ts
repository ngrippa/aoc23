import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";
import { replaceCharacter } from "../../utils/string";

const directions: Record<string, string> = {
  "|": "NS",
  "-": "EW",
  L: "NE",
  J: "NW",
  "7": "SW",
  F: "SE",
  ".": "",
  S: "Start",
};

const allDirs: Record<string, [number, number]> = {
  N: [-1, 0],
  S: [1, 0],
  W: [0, -1],
  E: [0, 1],
};

const invertDir: Record<string, string> = { N: "S", E: "W", S: "N", W: "E" };

const findStart = (data: string[]) => {
  for (let row = 0; row < data.length; row++) {
    const s = data[row].indexOf("S");
    if (s >= 0) return [row, s];
  }
  throw new Error("No start found");
};

const getDirection = (data: string[]) => (row: number, col: number) =>
  directions[data[row]?.[col]];

const getStartDirection = (data: string[]) => (row: number, col: number) => {
  const dirs: string[] = [];
  const getDir = getDirection(data);
  for (const dirEntry of Object.entries(allDirs)) {
    const [dir, mod] = dirEntry;
    const invert = invertDir[dir];
    const target = getDir(row + mod[0], col + mod[1]);
    if (target && target.includes(invert)) dirs.push(dir);
  }
  const replacementPipe = Object.entries(directions).find((d) =>
    dirs.every((dir) => d[1].includes(dir)),
  )!;
  return [dirs[0], replacementPipe[0]];
};

export const traverseMaze =
  (data: string[]) =>
  (startRow: number, startCol: number, startDirection: string) => {
    const getDir = getDirection(data);
    const visitedPoints: Record<string, boolean> = {};
    let steps = 0;
    let row = startRow,
      col = startCol;
    let direction = startDirection;
    while (true) {
      steps++;
      const mod = allDirs[direction];
      row = row + mod[0];
      col = col + mod[1];
      visitedPoints[`${row}/${col}`] = true;
      const tile = getDir(row, col);
      if (tile === "Start") break;
      const comingFrom = invertDir[direction];
      direction = tile.split("").find((d) => d !== comingFrom)!;
    }
    return { steps, visitedPoints };
  };

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);
  const [startRow, startCol] = findStart(data);
  const [startDirection, startSegment] = getStartDirection(data)(
    startRow,
    startCol,
  );

  const { steps, visitedPoints } = traverseMaze(data)(
    startRow,
    startCol,
    startDirection,
  );

  if (star === 1) {
    return steps / 2;
  } else {
    data[startRow] = replaceCharacter(data[startRow], startCol, startSegment);
    const getDir = getDirection(data);

    let insideLoop = false;
    let tilesInLoop = 0;
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < data[row].length; col++) {
        if (visitedPoints[`${row}/${col}`]) {
          if (getDir(row, col).includes("N")) insideLoop = !insideLoop;
        } else {
          if (insideLoop) tilesInLoop++;
        }
      }
    }

    return tilesInLoop;
  }
};
