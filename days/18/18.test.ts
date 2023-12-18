import { solve } from "./18";

describe("Day 18", () => {
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(62);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(41019);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(952408144115);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(96116995735219);
  });
});
