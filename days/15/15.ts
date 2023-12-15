import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";
import { sum } from "lodash";
import { initDeepArray } from "../../utils/array";

export const calcHash = (str: string) =>
  str.split("").reduce((acc, c) => {
    const asciiCode = c.charCodeAt(0);
    let res = acc;
    res += asciiCode;
    res *= 17;
    res = res % 256;
    return res;
  }, 0);

type Sequence = {
  label: string;
  operation: "=" | "-";
  focal: number | null;
  box: number;
};

export const parseSequence = (seq: string) => {
  const match = seq.match(/([a-z]*)([=-])(\d)?/);
  if (!match) throw new Error("Failed to parse sequence");
  const label = match[1];
  return {
    label,
    operation: match[2],
    focal: match[3] ? +match[3] : null,
    box: calcHash(label),
  } as Sequence;
};

const calcBoxStrength = (box: Sequence[], i: number) =>
  (i + 1) *
  box.reduce((acc, seq, position) => acc + seq.focal! * (position + 1), 0);

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);
  const sequences = data[0].split(",");
  if (star === 1) {
    const hashValues = sequences.map(calcHash);
    return sum(hashValues);
  } else {
    const boxes = initDeepArray<Sequence>(256);
    const parsed = sequences.map(parseSequence);
    parsed.forEach((seq) => {
      const box = boxes[seq.box];
      const index = box.findIndex((e) => e.label === seq.label);
      if (seq.operation === "=") {
        if (index > -1) {
          box.splice(index, 1, seq);
        } else {
          box.push(seq);
        }
      } else {
        if (index > -1) box.splice(index, 1);
      }
    });
    return sum(boxes.map(calcBoxStrength));
  }
};
