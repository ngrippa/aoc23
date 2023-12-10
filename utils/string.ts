export const replaceCharacter = (
  str: string,
  index: number,
  inserted: string,
) => str.substring(0, index) + inserted + str.substring(index + 1);
