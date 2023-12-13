import { solve } from "./13";
import { flipField } from "../../utils/processing";

describe("Day 13", () => {
  it("flip field", () => {
    expect(flipField(["#.##", "..#."])).toEqual(["#.", "..", "##", "#."]);
  });

  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(405);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(27664);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(400);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(33991);
  });
});
