import { loadData } from "../../utils/loadData";
import { Solve } from "../../utils/types";
import {Point, pointToString} from "../../utils/graph";

type Beam = { position: Point; direction: Point };

const changeBeamDirection = (c: string, beam: Beam) => {
  if (c === "/" || c === "\\") {
    const sign = c === "/" ? -1 : 1;
    if (beam.direction[0]) {
      beam.direction = [0, sign * beam.direction[0]];
    } else {
      beam.direction = [sign * beam.direction[1], 0];
    }
  }
};

const splitBeam = (c: string, beam: Beam): [Beam, Beam] | null => {
  if (c === "-") {
    if (beam.direction[1]) {
      return [
        { ...beam, direction: [-1, 0] },
        { ...beam, direction: [1, 0] },
      ];
    }
  } else if (c === "|") {
    if (beam.direction[0]) {
      return [
        { ...beam, direction: [0, -1] },
        { ...beam, direction: [0, 1] },
      ];
    }
  }
  return null;
};

export const simulateBeams = (field: string[]) => {
  const beams: Beam[] = [{ position: [0, 0], direction: [1, 0] }];
  const energized: Record<string, string> = {};
  let beam;
  while ((beam = beams.pop())) {
    while (true) {
      const c = field[beam.position[1]]?.[beam.position[0]];
      if (!c) break;
      const pos = pointToString(beam.position);
      const dir = pointToString(beam.direction);
      if (energized[pos] === dir) break;
      energized[pos] = dir;
      const newBeams = splitBeam(c, beam);
      if (newBeams) {
        beams.push(...newBeams);
        break;
      }
      changeBeamDirection(c, beam);
      beam.position = [
        beam.position[0] + beam.direction[0],
        beam.position[1] + beam.direction[1],
      ];
    }

  }
  return Object.keys(energized).length
};

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);
  if (star === 1) {
    return simulateBeams(data);
  } else {
    return 1;
  }
};
