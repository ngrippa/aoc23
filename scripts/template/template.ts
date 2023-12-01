import * as path from "path";
import * as fs from "fs";

const loadData = (star: 1 | 2, input: "example" | "real") => {
  return fs
    .readFileSync(
      path.join(
        __dirname,
        input === "example" ? `exampleInput${star}` : "input",
      ),
    )
    .toString()
    .split("\n")
    .filter(Boolean);
};

export const solve = (star: 1 | 2, input: "example" | "real") => {
  const data = loadData(star, input);
  return 1;
};
