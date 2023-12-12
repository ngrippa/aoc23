export const splitNumbers = (str: string, sep = " "): number[] =>
  str.split(sep).filter(Boolean).map(Number);
