export const splitNumbers = (str: string): number[] =>
  str.split(" ").filter(Boolean).map(Number);

export const flipField = (field: string[]): string[] =>
  field[0].split("").map((_, i) => field.map((s) => s[i]).join(""));
