import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";
import { indexBy } from "lodash/fp";
import { lcm } from "../../utils/math";

type Node = { node: string; L: string; R: string };

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);
  const [directionsRaw, ...rawNodes] = data;
  const parsedNodes = rawNodes.filter(Boolean).map((rawNode) => {
    const s = /(.*) = \((.*), (.*)\)/.exec(rawNode);
    if (!s) throw new Error("Cant parse regex");
    const [_, node, L, R] = s;
    return { node, L, R } as Node;
  });
  const nodes = indexBy<Node>("node")(parsedNodes);

  const directions = directionsRaw.split("") as ("L" | "R")[];

  const stepThrough = (startingNode: Node) => {
    let steps = 0;
    let node = startingNode;
    while (true) {
      if (star === 1 ? node.node === "ZZZ" : node.node[2] === "Z") {
        return steps;
      }
      const direction = directions[steps % directions.length];
      node = nodes[node[direction]];
      steps++;
    }
  };

  if (star === 1) {
    return stepThrough(nodes["AAA"]);
  } else {
    // I hate that this works. it shouldn't for every input which feels like cheating.
    return Object.values(nodes)
      .filter((n) => n.node[2] === "A")
      .map(stepThrough)
      .reduce(lcm, 1);
  }
};
