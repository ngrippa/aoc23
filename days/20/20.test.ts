import { solve } from "./20";

describe("Day 20", () => {
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(11687500);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(919383692);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(247702167614647);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(247702167614647);
  });
});
