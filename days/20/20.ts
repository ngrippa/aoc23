import { loadData } from "../../utils/loadData";
import { Solve, Star } from "../../utils/types";
import { lcm } from "../../utils/math";

type Pulse = "high" | "low";

type Signal = { pulse: Pulse; dest: Module["name"]; origin: Module["name"] };
type ModuleType = "flipFlop" | "conjunction" | "neutral";
type Module = {
  name: string;
  type: ModuleType;
  dest: Module["name"][];
};

type DrSignals = Record<string, number[]>;

type Modules = Record<Module["name"], Module>;
type Memory = Record<Module["name"], Pulse>;
type State = Record<Module["name"], "on" | "off" | Memory>;

const parseModules = (data: string[]) => {
  const modules: Modules = {};
  const state: State = {};
  const modA: Module[] = [];
  data.forEach((d) => {
    let name = d.split(" ")[0];
    const dest = d.split("-> ")[1].split(", ");

    let type: ModuleType;
    if (name[0] === "%") {
      type = "flipFlop";
      name = name.substring(1);
      state[name] = "off";
    } else if (name[0] === "&") {
      type = "conjunction";
      name = name.substring(1);
    } else {
      type = "neutral";
    }
    const module = { name, type, dest };
    modules[name] = module;
    modA.push(module);
  });
  modA
    .filter((m) => m.type === "conjunction")
    .forEach((c) => {
      const inputs = modA.filter((m) => m.dest.includes(c.name));
      state[c.name] = Object.fromEntries(inputs.map((i) => [i.name, "low"]));
    });
  return { modules, state };
};

export const simulateButtonPress = (
  modules: Modules,
  state: State,
  run: number,
  gate?: string,
  drSignals?: DrSignals,
) => {
  let lows = 0,
    highs = 0;

  const signals: Signal[] = [
    { pulse: "low", origin: "start", dest: "broadcaster" },
  ];
  let signal: Signal | undefined;
  while ((signal = signals.shift())) {
    if (drSignals && signal.dest === gate && signal.pulse === "high") {
      drSignals[signal.origin].push(run);
    }
    signal.pulse === "high" ? highs++ : lows++;
    const origin = modules[signal.dest];
    if (!origin) continue;
    const addSignals = (pulse: Pulse) =>
      signals.push(
        ...origin.dest.map((d) => ({ dest: d, pulse, origin: origin.name })),
      );
    if (origin.type === "flipFlop") {
      if (signal.pulse === "low") {
        const s = state[signal.dest];
        addSignals(s === "off" ? "high" : "low");
        state[signal.dest] = s === "off" ? "on" : "off";
      }
    } else if (origin.type === "conjunction") {
      (state[signal.dest] as Memory)[signal.origin] = signal.pulse;
      if (
        Object.values(state[signal.dest] as Memory).every((v) => v === "high")
      ) {
        addSignals("low");
      } else {
        addSignals("high");
      }
    } else {
      addSignals(signal.pulse);
    }
  }
  return { highs, lows };
};

type HL = { highs: number; lows: number };
const sumHighsAndLows = (hls: HL[]): HL =>
  hls.reduce(
    (acc, curr) => {
      acc.highs += curr.highs;
      acc.lows += curr.lows;
      return acc;
    },
    { highs: 0, lows: 0 },
  );

export const solve: Solve = (star, input) => {
  const data = loadData(star, input, __dirname);
  const { modules, state } = parseModules(data);
  if (star === 1) {
    const results: HL[] = [];
    for (let i = 0; i < 1000; i++) {
      results.push(simulateButtonPress(modules, state, i));
    }
    const hl = sumHighsAndLows(results);
    return hl.highs * hl.lows;
  } else {
    // this seems to be a conj gate, so we use lcm to find the match
    const gate = Object.values(modules).find((m) =>
      m.dest.includes("rx"),
    )!.name;
    const gateSignals: DrSignals = Object.fromEntries(
      Object.keys(state[gate]).map((k) => [k, []]),
    );

    let i = 0;
    while (true) {
      simulateButtonPress(modules, state, i, gate, gateSignals);
      if (Object.values(gateSignals).every((v) => v.length > 1)) {
        break;
      }
      i++;
    }
    // okay, wow. This is funny. The periods minus the initial value is always -1. This might mean that the next
    // match occurs on button press lcm - 1. Because they are 1 indexed it actually is button press lcm.
    // Same as day8 basically

    return Object.values(gateSignals)
      .map((v) => v[1] - v[0])
      .reduce(lcm, 1);
  }
};
