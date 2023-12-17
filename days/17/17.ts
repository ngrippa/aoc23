import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";
import { Point, pointToString, stringToPoint } from "../../utils/graph";
import { initDeepArray } from "../../utils/array";

const getDirString = (a: Point, b: Point) =>
  pointToString([a[0] - b[0], a[1] - b[1]]);

const getNeighbors = ([cx, cy]: Point): Point[] => [
  [cx, cy + 1],
  [cx, cy - 1],
  [cx + 1, cy],
  [cx - 1, cy],
];

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname).map((str) =>
    str.split("").filter(Boolean).map(Number),
  );

  const buildString = (point: Point, prev: Point, n: number) =>
    [pointToString(point), pointToString(prev), n].join(",");

  const unvisited = new Set<string>();
  const dist: Record<string, number> = {};
  const prev: Record<string, string> = {};
  data.forEach((r, x) =>
    r.forEach((n, y) => {
      if (!x && !y) {
        const str = buildString([x, y], [x, y - 1], 0);
        unvisited.add(str);
        dist[str] = 0;
      } else {
        const neighbors = getNeighbors([x, y]);
        neighbors.forEach((n) => {
          for (let i = 1; i <= (star === 1 ? 3 : 10); i++) {
            const str = buildString([x, y], n, i);
            unvisited.add(str);
          }
        });
      }
    }),
  );
  const end = pointToString([data.length - 1, data[0].length - 1]);

  const maxDist = data.length * 20;

  const start = `0/0,0/-1,0`;
  let current = start;
  const dists = initDeepArray<string>(maxDist);
  let minDist = 0;

  const getNextNode = () => {
    for (let i = minDist; i < maxDist; i++) {
      if (dists[i].length) {
        return dists[i].pop();
      }
    }
    return [...unvisited][0];
  };

  while (true) {
    const split = current.split(",");
    if (split[0] === end && dist[current] && (star === 1 || +split[2] >= 4)) {
      return dist[current];
    }
    const cp = stringToPoint(split[0]);
    for (const neighbor of getNeighbors(cp)) {
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

      if (pointToString(neighbor) === split[1]) continue;
      const ns = buildString(neighbor, cp, newN);
      const d = dist[current] + c;
      const oldDist = dist[ns] ?? Infinity;
      if (d < oldDist) {
        dists[d].push(ns);
        if (dists[oldDist]) dists[oldDist] = dists[d].filter((s) => s !== ns);
        dist[ns] = d;
        prev[ns] = current;
      }
    }
    unvisited.delete(current);
    const nextNode = getNextNode();
    if (!nextNode) return 0;
    current = nextNode;
    const d = dist[current];
    minDist = d;
  }
};
