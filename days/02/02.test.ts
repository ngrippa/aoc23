import {matchColor, solve} from "./02";

describe("Day 02", () => {
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(8);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(2600);
  });

  it("color should match", () => {
    expect(matchColor("1 green, 3 red, 6 blue", "green")).toBe(1)
  })

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(2286);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(86036);
  });
});
