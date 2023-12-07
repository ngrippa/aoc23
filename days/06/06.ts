import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";
import { splitNumbers } from "../../utils/processing";

export const getPossibleWins = (time: number, distance: number) => {
  // quadratic equation and then pq formula: x2 - time*x + distance = 0
  const halfTime = time / 2;
  const root = Math.sqrt(halfTime ** 2 - distance);
  const x1 = halfTime + root,
    x2 = halfTime - root;
  // we have to take out exact matches (because exactly hitting the distance is not sufficient, we need to beat it.
  // so we switch floor to ceil - 1 and vice versa. Rounding is also the reason why we cant' just take root * 2.
  return Math.ceil(x1 - 1) - Math.floor(x2 + 1) + 1;
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
