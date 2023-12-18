import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";
import { calcPolygonAreaIncludingBoundary, Point } from "../../utils/graph";

type Dig = { dir: "U" | "D" | "L" | "R"; tiles: number; color: string };

const digHole = (digs: Dig[]) => {
  let x = 0;
  let y = 0;

  const poly: Point[] = digs.map((dig) => {
    switch (dig.dir) {
      case "U":
        x -= dig.tiles;
        break;
      case "D":
        x += dig.tiles;
        break;
      case "L":
        y -= dig.tiles;
        break;
      case "R":
        y += dig.tiles;
    }
    return [x, y];
  });
  return calcPolygonAreaIncludingBoundary(poly);
};

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);
  const digs = data.map((row) => {
    const s = row.split(" ");
    if (star === 1) {
      return { dir: s[0], tiles: +s[1] } as Dig;
    } else {
      const hex = s[2].split("#")[1].split(")")[0];
      const tiles = parseInt(hex.substring(0, 5), 16);
      const d = +hex[5];
      const dir = !d ? "R" : d === 1 ? "D" : d === 2 ? "L" : "U";
      return { dir, tiles } as Dig;
    }
  });
  return digHole(digs);
};
