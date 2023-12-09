import {extrapolateSequence, solve} from "./09";

describe("Day 09", () => {
  it("extrapolate sequence", () => {
    expect(extrapolateSequence(1)([0, 3, 6, 9, 12, 15])).toBe(18)
  })

  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(114);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(1798691765);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(2);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(1104);
  });
});
