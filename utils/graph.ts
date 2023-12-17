export type Point = [number, number];

export const manhattanDistance = (pointA: Point, pointB: Point) =>
  Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1]);

export const pointToString = (point: Point) => `${point[0]}/${point[1]}`;
export const stringToPoint = (str: string) => str.split("/").map(Number) as Point;
