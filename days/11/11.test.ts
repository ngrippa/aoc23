import {expandedBetween, solve} from "./11";
import { manhattanDistance } from "../../utils/graph";

describe("Day 11", () => {
  it("manhatten distance", () => {
    expect(manhattanDistance([0, 4], [10, 9])).toBe(15);
  });

  it("expand between", () => {
    const rows = [3, 7];
    const cols = [2, 5, 8];
    // expect(expandedBetween(rows, 0, 0)).toBe(0);
    // expect(expandedBetween(rows, 0, 1)).toBe(0);
    expect(expandedBetween(cols, 3, 7)).toBe(1);
  })

  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(374);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(10228230);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(82000210);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(447073334102);
  });
});
