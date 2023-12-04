import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";

type NumberSet = { winning: number[]; mine: number[] };

export const createNumberSet = (row: string): NumberSet => {
  const numberSets = row
    .split(": ")[1]
    .split(" | ")
    .map((ns) => ns.split(" ").filter(Boolean).map(Number));
  return { winning: numberSets[0], mine: numberSets[1] };
};

export const getValue = (set: NumberSet): number =>
  set.winning.reduce(
    (acc, curr) => (set.mine.includes(curr) ? (acc === 0 ? 1 : acc * 2) : acc),
    0,
  );

export const getNumberOfWinningNumbers = (set: NumberSet): number =>
  set.winning.reduce(
    (acc, curr) => (set.mine.includes(curr) ? acc + 1 : acc),
    0,
  );

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);
  const numbers = data.map(createNumberSet);
  if (star === 1) {
    const values = numbers.map(getValue);
    return values.reduce((acc, curr) => acc + curr, 0);
  } else {
    const winningNumbers = numbers.map(getNumberOfWinningNumbers);
    const instances: Record<number, number> = {};
    winningNumbers.forEach((_, i) => instances[i + 1] = 1)
    winningNumbers.forEach((winning, index) => {
      const cardNumber = index + 1;
      const increment = instances[cardNumber];
      for (let i = cardNumber + 1; i <= cardNumber + winning; i++) {
        if (instances[i]) instances[i] += increment
      }
    });
    return Object.values(instances).reduce((acc, curr) => acc + curr, 0)

  }
};
