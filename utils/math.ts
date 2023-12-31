export const gcd = (a: number, b: number): number => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

export const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

export const elementsBetween = (
  elements: number[],
  a: number,
  b: number,
): number => {
  const start = Math.min(a, b);
  const end = Math.max(a, b);
  const firstSkip = elements.findIndex((e) => e >= start);
  if (firstSkip === -1) return 0;
  const lastSkip = elements.slice(firstSkip).findIndex((e) => e > end);
  return lastSkip === -1 ? elements.length - firstSkip : lastSkip;
};

export const repeat = <T>(arr: T[], n: number, join: T[]): T[] => {
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(arr);
    if (i < n - 1) res.push(join);
  }
  return res.flat();
};
