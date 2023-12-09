import { loadData } from "../../utils/loadData";
import { Solve, Star } from "../../utils/types";
import { splitNumbers } from "../../utils/processing";

export const extrapolateSequence = (star: Star) => (sequence: number[]) => {
  const sequenceStack = [sequence];
  while (true) {
    const lastSequence = sequenceStack[sequenceStack.length - 1];
    const nextSequence = [];
    for (let i = 0; i < lastSequence.length - 1; i++) {
      nextSequence.push(lastSequence[i + 1] - lastSequence[i]);
    }
    sequenceStack.push(nextSequence);
    if (nextSequence.every((e) => !e)) break;
  }

  let newAdd = 0;
  for (let i = sequenceStack.length - 2; i >= 0; i--) {
    const curr = sequenceStack[i];
    if (star === 1) {
      newAdd = curr[curr.length - 1] + newAdd;
    } else {
      newAdd = curr[0] - newAdd;
    }
  }
  return newAdd;
};

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);
  const sequences = data.map(splitNumbers);

  return sequences.reduce(
    (acc, curr) => acc + extrapolateSequence(star)(curr),
    0,
  );
};
