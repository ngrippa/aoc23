import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";

const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

export const toDigit = (s: string) => {
  if (s.length === 1) return Number(s);
  return numbers.indexOf(s) + 1;
};

export const matchFirstAndLast = (star: 1 | 2, input: string) => {
  const regexString = star === 1 ? "(\\d)" : `(\\d|${numbers.join("|")})`;
  const pattern = new RegExp(`(?=${regexString})`, "g");

  const matches = Array.from(input.matchAll(pattern), (x) => x[1]);

  return [toDigit(matches[0]), toDigit(matches[matches.length - 1])];
};

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);

  return data.reduce((acc, curr) => {
    const numbers = matchFirstAndLast(star, curr);
    const lineValue = numbers[0] * 10 + numbers[1];
    return acc + lineValue;
  }, 0);
};
