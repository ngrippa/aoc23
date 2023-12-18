import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";
import {
  getDirString,
  Point,
  pointToString,
  stringToPoint,
} from "../../utils/graph";
import { initDeepArray } from "../../utils/array";

const getNeighbors = ([cx, cy]: Point): Point[] => [
  [cx, cy + 1],
  [cx, cy - 1],
  [cx + 1, cy],
  [cx - 1, cy],
];

const buildString = (point: Point, prev: Point, n: number) =>
  [pointToString(point), pointToString(prev), n].join(",");

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname).map((str) =>
    str.split("").filter(Boolean).map(Number),
  );
  const maxDist = data.length * 20;
  const visitedByDistance = initDeepArray<string>(maxDist);
  const dist: Record<string, number> = {};
  const start = `0/0,0/-1,0`;
  dist[start] = 0;

  const end = pointToString([data.length - 1, data[0].length - 1]);

  let current = start;
  let minDist = 0;

  const getNextNode = () => {
    for (let i = minDist; i < maxDist; i++) {
      if (visitedByDistance[i].length) {
        return visitedByDistance[i].pop();
      }
    }
  };

  while (true) {
    const split = current.split(",");
    if (split[0] === end && dist[current] && (star === 1 || +split[2] >= 4)) {
      return dist[current];
    }
    const cp = stringToPoint(split[0]);
    for (const neighbor of getNeighbors(cp)) {
      if (pointToString(neighbor) === split[1]) continue;
      const [nx, ny] = neighbor;
      const c = data[nx]?.[ny];
      if (!c) continue;
      const prevDir = getDirString(cp, stringToPoint(split[1]));
      const newDir = getDirString(neighbor, cp);
      if (
        star === 2 &&
        prevDir !== newDir &&
        +split[2] < 4 &&
        current !== start
      ) {
        continue;
      }
      const newN = prevDir === newDir ? +split[2] + 1 : 1;
      if (newN > (star === 1 ? 3 : 10)) {
        continue;
      }
      const ns = buildString(neighbor, cp, newN);
      const d = dist[current] + c;
      const oldDist = dist[ns] ?? Infinity;
      if (d < oldDist) {
        visitedByDistance[d].push(ns);
        if (visitedByDistance[oldDist])
          visitedByDistance[oldDist] = visitedByDistance[d].filter(
            (s) => s !== ns,
          );
        dist[ns] = d;
      }
    }
    const nextNode = getNextNode();
    if (!nextNode) return 0;
    current = nextNode;
    minDist = dist[current];
  }
};
