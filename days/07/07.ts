import { loadData } from "../../utils/loadData";
import { Solve, Star } from "../../utils/types";

const getCards = (star: Star) =>
  star === 1
    ? ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
    : ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];

export const Hands = {
  highCard: 1,
  onePair: 2,
  twoPair: 3,
  threeOfKind: 4,
  fullHouse: 5,
  fourOfKind: 6,
  fiveOfKind: 7,
};

export type CardCount = [string, number];

export const valueHand =
  (star: Star) =>
  (handString: string): number => {
    const hand = handString.split("");
    const cards = getCards(star);
    const counts = cards.map(
      (card) => [card, hand.filter((c) => c === card).length] as CardCount,
    );

    const countsWithoutJokers = star === 1 ? counts : counts.slice(1);
    const xOfKind = (x: number) => (c: CardCount) => c[1] === x;

    const hasXOfKind = (x: number) => {
      if (star === 1) {
        return countsWithoutJokers.find(xOfKind(x));
      } else {
        const [_, jokers] = counts[0];
        return countsWithoutJokers.find(xOfKind(x - jokers));
      }
    };

    const differentMatch = (firstMatch: CardCount, x: number) =>
      countsWithoutJokers.some((c) => c[0] !== firstMatch[0] && xOfKind(x)(c));

    if (hasXOfKind(5)) return Hands["fiveOfKind"];
    if (hasXOfKind(4)) return Hands["fourOfKind"];
    const firstHasThree = hasXOfKind(3);
    if (firstHasThree && differentMatch(firstHasThree, 2))
      return Hands["fullHouse"];
    if (firstHasThree) return Hands["threeOfKind"];
    const firstPair = hasXOfKind(2);
    if (firstPair && differentMatch(firstPair, 2)) return Hands["twoPair"];
    if (firstPair) return Hands["onePair"];
    return Hands["highCard"];
  };

const compareCards = (star: Star) => (handA: string, handB: string) => {
  const cards = getCards(star);
  for (let i = 0; i < handA.length; i++) {
    const comp = cards.indexOf(handA[i]) - cards.indexOf(handB[i]);
    if (comp) return comp;
  }
  throw new Error("To hands are equal. What to we do now??");
};

export const compareHands = (star: Star) => (handA: string, handB: string) =>
  valueHand(star)(handA) - valueHand(star)(handB) ||
  compareCards(star)(handA, handB);

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);
  const handsAndBids = data.map((row) => {
    const split = row.split(" ");
    return { hand: split[0], bid: +split[1] };
  });
  const sorted = handsAndBids.sort((a, b) =>
    compareHands(star)(a.hand, b.hand),
  );
  return sorted.reduce((acc, curr, i) => curr.bid * (i + 1) + acc, 0);
};
