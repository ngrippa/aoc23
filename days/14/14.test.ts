import { solve } from "./14";

describe("Day 14", () => {
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(136);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(112773);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(64);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(98894);
  });
});
