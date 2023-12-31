import { solve } from "./16";

describe("Day 16", () => {
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(46);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(7392);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(51);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(7665);
  });
});
