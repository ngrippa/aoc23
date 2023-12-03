import { solve } from "./03";

describe("Day 03", () => {
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(4361);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(536202);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(467835);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(78272573);
  });
});
