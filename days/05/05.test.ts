import { parseMap, solve } from "./05";

describe("Day 05", () => {
  it("parse map", () => {
    expect(parseMap("seed-to-soil map:\n" + "50 98 2\n" + "52 50 48")).toEqual({
      from: "seed",
      to: "soil",
      maps: [
        { fromN: 98, toN: 50, range: 2, fromNEnd: 99 },
        { fromN: 50, toN: 52, range: 48, fromNEnd: 97 },
      ],
    });
  });

  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(35);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(251346198);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(46);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(72263011);
  });
});
