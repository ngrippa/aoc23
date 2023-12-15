export const initDeepArray = <T>(len: number) =>
  new Array(len).fill(1).map(() => [] as T[]);
