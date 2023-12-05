export const splitNumbers = (str: string): number[] =>
  str.split(" ").filter(Boolean).map(Number);
