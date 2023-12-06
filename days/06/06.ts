import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";
import { splitNumbers } from "../../utils/processing";

export const getPossibleWins = (time: number, distance: number) => {
  let sufficient = 0;
  for (let velocity = 1; velocity < time; velocity++) {
    const distanceCovered = (time - velocity) * velocity;
    if (distanceCovered > distance) sufficient++;
  }
  return sufficient;
};

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);
  if (star === 1) {
    const [times, distances] = data.map((row) =>
      splitNumbers(row.split(":")[1]),
    );
    return times.reduce(
      (acc, time, i) => acc * getPossibleWins(time, distances[i]),
      1,
    );
  } else {
    const [time, distance] = data.map((row) =>
      Number(row.split(":")[1].split(" ").filter(Boolean).join("")),
    );
    return getPossibleWins(time, distance);
  }
};
