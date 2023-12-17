import { solve } from "./17";

describe("Day 17", () => {
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(102);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(694);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(71);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(829);
  });
});
