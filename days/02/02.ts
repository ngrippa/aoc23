import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";

type Run = {
  red: number;
  green: number;
  blue: number;
};

type Game = {
  id: number;
  runs: Run[];
};

const colors = ["red", "green", "blue"] as const;

export const matchColor = (run: string, c: string): number =>
  +(run.match(new RegExp(`(\\d*) ${c}`))?.[1] ?? 0);

export const parseRun = (run: string) =>
  Object.fromEntries(colors.map((c) => [c, matchColor(run, c)])) as Run;

export const parseGames = (gameString: string): Game => {
  const game = gameString.match(/Game (\d*):/);
  const runs = gameString.split(":")[1].split(";");
  return {
    id: +game![1],
    runs: runs.map(parseRun),
  };
};

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);
  return data.reduce((acc, curr) => {
    const game = parseGames(curr);
    const max = Object.fromEntries(
      colors.map((c) => [c, Math.max(...game.runs.map((r) => r[c]))]),
    ) as Run;
    if (star === 1) {
      if (max.red <= 12 && max.green <= 13 && max.blue <= 14)
        return acc + game.id;
      return acc;
    } else {
      return acc + Object.values(max).reduce((acc, curr) => acc * curr, 1);
    }
  }, 0);
};
