import { solve } from "./19";

describe("Day 19", () => {
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(19114);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(389114);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(1);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(1);
  });
});
