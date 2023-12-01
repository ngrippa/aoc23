import { matchFirstAndLast, solve } from "./01";

describe("Day 01", () => {
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(142);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(54697);
  });

  it("regex", () => {
    const exampleString = "zoneight234"
    expect(matchFirstAndLast(1, exampleString)).toEqual([2, 4]);
    expect(matchFirstAndLast(2, exampleString)).toEqual([1, 4]);
    expect(matchFirstAndLast(2, "oneight")).toEqual([1, 8]);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(281);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(54885);
  });
});
