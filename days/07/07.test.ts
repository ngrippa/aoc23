import {compareHands, Hands, solve, valueHand} from "./07";

describe("Day 07", () => {
  it("should be correct s1 example", () => {
    expect(solve(1, "example")).toBe(6440);
  });

  it("should be correct s1 real", () => {
    expect(solve(1, "real")).toBe(253313241);
  });

  it("should be correct s2 example", () => {
    expect(solve(2, "example")).toBe(5905);
  });

  describe("jokers...", () => {
    it("fullHouse with jokers", () => {
      expect(valueHand(2)("J2233")).toBe(Hands["fullHouse"])
    })

    it("fullHouse with two jokers", () => {
      expect(valueHand(2)("JJ233")).toBe(Hands["fourOfKind"])
    })

    it("two pair with jokers", () => {
      expect(valueHand(2)("223J5")).toBe(Hands["threeOfKind"])
    })

    it("jokers only", () => {
      expect(valueHand(2)("JJJJJ")).toBe(Hands["fiveOfKind"])
    })

    it("five of kind", () => {
      expect(valueHand(2)("2JJJJ")).toBe(Hands["fiveOfKind"])
    })
    it("four of kind", () => {
      expect(valueHand(2)("23JJJ")).toBe(Hands["fourOfKind"])
    })

    it("one pair", () => {
      expect(valueHand(2)("2345J")).toBe(Hands["onePair"])
    })

    it("three of kind?", () => {
      expect(valueHand(2)("75J8J")).toBe(Hands["threeOfKind"])
    })

    it("compare cards", () => {
      expect(compareHands(2)("J2345", "JJJJJ")).toBeLessThan(0);
      expect(compareHands(2)("J2345", "2J345")).toBeLessThan(0);
    })


  })



  it("should be correct s2 real", () => {
    expect(solve(2, "real")).toBe(253362743);
  });
});
