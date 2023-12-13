import fs from "fs";
import path from "path";
import { Input, Star } from "./types";

export const loadDataRaw = (star: Star, input: Input, dirname: string) =>
  fs
    .readFileSync(
      path.join(dirname, input === "example" ? `exampleInput${star}` : "input"),
    )
    .toString();

export const loadData = (star: Star, input: Input, dirname: string) =>
  loadDataRaw(star, input, dirname).split("\n").filter(Boolean);

export const loadDataGrouped = (
  star: Star,
  input: Input,
  dirname: string,
): string[][] =>
  loadDataRaw(star, input, dirname)
    .split("\n\n")
    .map((d) => d.split("\n").filter(Boolean));
