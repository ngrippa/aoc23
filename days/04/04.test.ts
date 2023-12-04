import { createNumberSet, solve } from "./04";

describe("Day 04", () => {
  it("Number set should be correct", () => {
    const res = createNumberSet(
      "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
    );
    expect(res.winning).toEqual([41, 48, 83, 86, 17])
    expect(res.mine).toEqual([83, 86, 6, 31, 17, 9, 48, 53 ])
  });
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(13);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(25231);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(30);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(9721255);
  });
});
