import { calcHash, parseSequence, solve } from "./15";

describe("Day 15", () => {
  it("calc hash", () => {
    expect(calcHash("rn=1")).toBe(30);
  });

  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(1320);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(517315);
  });

  it("parseSequence", () => {
    expect(parseSequence("rn=1")).toEqual({
      label: "rn",
      operation: "=",
      focal: 1,
      box: 0
    });
    expect(parseSequence("zcgrr=3")).toEqual({
      label: "zcgrr",
      operation: "=",
      focal: 3,
      box: 184
    });
    expect(parseSequence("cm-")).toEqual({
      label: "cm",
      operation: "-",
      focal: null,
      box: 0
    });
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(145);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(247763);
  });
});
