import {countRowArrangements, solve} from "./12";

describe("Day 12", () => {
  describe("should recursively count", () => {
    it("line 1", () => {
      expect(countRowArrangements(1)("???.### 1,1,3")).toBe(1);
      expect(countRowArrangements(2)("???.### 1,1,3")).toBe(1);
    })
    it("line 2", () => {
      expect(countRowArrangements(1)(".??..??...?##. 1,1,3")).toBe(4);
      expect(countRowArrangements(2)(".??..??...?##. 1,1,3")).toBe(16384);
    })
  })
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(21);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(7922);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(525152);
  });

  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(18093821750095);
  });
});
