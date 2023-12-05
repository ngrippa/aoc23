import { loadDataRaw } from "../../utils/loadData";
import { Solve } from "../../utils/types";
import { splitNumbers } from "../../utils/processing";
import { chunk, sortBy } from "lodash";

export const parseMap = (map: string) => {
  const rows = map.split("\n").filter(Boolean);
  const [head, ...body] = rows;
  const match = /(.*)-to-(.*) map:/g.exec(head);
  if (!match) throw new Error("No match");
  const [_, from, to] = match;
  return {
    from,
    to,
    maps: body.map((line) => {
      const [toN, fromN, range] = splitNumbers(line);
      const fromNEnd = fromN + range - 1;
      return { fromN, toN, fromNEnd, range };
    }),
  };
};

type SeedRange = { from: number; to: number };

export const splitSeedRanges = (
  seedRanges: SeedRange[],
  map: ReturnType<typeof parseMap>,
) =>
  seedRanges.flatMap((sr) => {
    let seedRangesForThisSr: SeedRange[] = [];
    map.maps.forEach((location) => {
      const commonStart = Math.max(location.fromN, sr.from);
      const commonEnd = Math.min(location.fromNEnd, sr.to);
      if (commonEnd >= commonStart) {
        seedRangesForThisSr.push({
          from: commonStart,
          to: commonEnd,
        });
      }
    });
    seedRangesForThisSr = sortBy(seedRangesForThisSr, "from");
    const newSeedRanges: SeedRange[] = [];
    let nextN = sr.from;
    while (true) {
      const s = seedRangesForThisSr.shift();
      if (!s) break;
      if (s.from !== nextN) newSeedRanges.push({ from: nextN, to: s.from - 1 });
      newSeedRanges.push(s);
      nextN = s.to + 1;
    }
    if (nextN <= sr.to) newSeedRanges.push({ from: nextN, to: sr.to });
    return newSeedRanges;
  });

export const solve: Solve = (star, input) => {
  const data = loadDataRaw(star, input, __dirname);
  const sections = data.split("\n\n");
  const [seeds, ...mapsString] = sections;
  const initialSeeds = splitNumbers(seeds.split(":")[1]);
  const maps = mapsString.map(parseMap);

  if (star === 1) {
    return Math.min(
      ...initialSeeds.map((seed) =>
        maps.reduce((acc, curr) => {
          const map = curr.maps.find(
            (map) => map.fromN <= acc && map.fromNEnd >= acc,
          );
          return acc + (map ? map.toN - map.fromN : 0);
        }, seed),
      ),
    );
  } else {
    let seedRanges = chunk(initialSeeds, 2).map(
      (sr) =>
        ({
          from: sr[0],
          to: sr[1] + sr[0] - 1,
        }) as SeedRange,
    );
    maps.forEach((map) => {
      seedRanges = splitSeedRanges(seedRanges, map);
      seedRanges = seedRanges.map((sr) => {
        const result = map.maps.find(
          (map) => map.fromN <= sr.to && map.fromNEnd >= sr.from,
        );
        const shift = result ? result.toN - result.fromN : 0;
        return { from: sr.from + shift, to: sr.to + shift };
      });
    });
    return Math.min(...seedRanges.map((sr) => sr.from));
  }
};
