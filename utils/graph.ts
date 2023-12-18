export type Point = [number, number];

export const manhattanDistance = (pointA: Point, pointB: Point) =>
  Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1]);

export const pointToString = (point: Point) => `${point[0]}/${point[1]}`;
export const stringToPoint = (str: string) =>
  str.split("/").map(Number) as Point;

export const getDirString = (a: Point, b: Point) =>
  pointToString([a[0] - b[0], a[1] - b[1]]);

export const calcPolygonAreaIncludingBoundary = (vertices: Point[]) => {
  let total = 0;
  const l = vertices.length;
  let j = l - 1;
  for (let i = 0; i < l; i++) {
    const [x1, y1] = vertices[i];
    const [x2, y2] = vertices[j];
    total += x1 * y2 - x2 * y1 + Math.abs(x2 - x1) + Math.abs(y2 - y1);
    j = i;
  }

  return Math.ceil(Math.abs(total) / 2) + 1;
};
