export type Point = [number, number];

export const manhattanDistance = (pointA: Point, pointB: Point) =>
  Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1]);
