import { solve } from "./06";

describe("Day 06", () => {
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(288);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(449550);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(71503);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(28360140);
  });
});
