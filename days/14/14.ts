import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";

const roll = (field: string[][], direction: 1 | -1, axis: "h" | "v") => {
  const getEntry = (x: number, y: number) =>
    axis === "h" ? field[x]?.[y] : field[y]?.[x];
  for (let rx = 0; rx < field.length; rx++) {
    for (let ry = 0; ry < field.length; ry++) {
      const x = direction < 0 ? rx : field.length - 1 - rx;
      const y = direction < 0 ? ry : field.length - 1 - ry;

      if (getEntry(x, y) !== "O") continue;
      let roll = x;
      while (true) {
        const element = getEntry(roll + direction, y);
        if (element === ".") {
          roll += direction;
        } else {
          break;
        }
      }
      if (axis === "h") {
        field[x][y] = ".";
        field[roll][y] = "O";
      } else {
        field[y][x] = ".";
        field[y][roll] = "O";
      }
    }
  }
};

const determineStress = (field: string[][]) =>
  field.reduce(
    (sum, row, rowIndex) =>
      sum + row.filter((e) => e === "O").length * (field.length - rowIndex),
    0,
  );

const oneCycle = (field: string[][]) => {
  roll(field, -1, "h");
  roll(field, -1, "v");
  roll(field, 1, "h");
  roll(field, 1, "v");
};

const cycle = (field: string[][]) => {
  const target = 1000000000
  const runs: Record<string, number> = {}
  for (let c = 0; c < target; c++) {
    oneCycle(field);
    const key = JSON.stringify(field);
    const run = runs[key]
    if (run !== undefined) {
      const period = c - run;
      const remaining = (target - run) % period;
      return JSON.parse(Object.entries(runs).find(([_, n]) => n === run + remaining - 1)![0]);
    } else {
      runs[key] = c;
    }
  }
};

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);
  const field = data.map((d) => d.split(""));

  if (star === 1) {
    roll(field, -1, "h");
    return determineStress(field);
  } else {
    const resultField = cycle(field);
    return determineStress(resultField);
  }
};
