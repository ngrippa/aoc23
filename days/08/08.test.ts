import { solve } from "./08";

describe("Day 08", () => {
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(6);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(20569);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(6);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(21366921060721);
  });
});
