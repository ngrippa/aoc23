import fs from "fs";
import path from "path";
import { Input, Star } from "./types";

export const loadData = (star: Star, input: Input, dirname: string) => {
  return fs
    .readFileSync(
      path.join(dirname, input === "example" ? `exampleInput${star}` : "input"),
    )
    .toString()
    .split("\n")
    .filter(Boolean);
};
