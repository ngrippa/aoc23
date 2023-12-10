import { solve } from "./10";

describe("Day 10", () => {
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(8);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(7005);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(10);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(417);
  });
});
