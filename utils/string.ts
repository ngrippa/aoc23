export const replaceCharacter = (
  str: string,
  index: number,
  inserted: string,
) => str.substring(0, index) + inserted + str.substring(index + 1);

export const insertString = (str: string, index: number, inserted: string) =>
  str.substring(0, index) + inserted + str.substring(index);

export const stringsHaveExactlyOneDiff = (
  strA: string,
  strB: string,
): null | number => {
  let diff = null;
  for (let i = 0; i < strA.length; i++) {
    if (strA[i] !== strB[i]) {
      if (diff !== null) return null;
      diff = i;
    }
  }
  return diff;
};
