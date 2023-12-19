import { loadDataGrouped } from "../../utils/loadData";
import { Solve } from "../../utils/types";
import { sum } from "lodash";
import { Point } from "../../utils/graph";

type C = "<" | ">";
type Part = Record<string, number>;
type Interval = Record<string, Point>;
type WF = {
  workflowName: string;
  rules: { l: string; c: C; v: number; r: string }[];
  end: string;
};

const parseParts = (rawParts: string[]): Part[] =>
  rawParts.map((rawPart) => {
    const m = rawPart.match(/([a-z])=(\d*)/g)!;
    const obj: Record<string, number> = Object.fromEntries(
      m.map((e) => {
        const s = e.split("=");
        return [s[0], +s[1]];
      }),
    );
    return obj;
  });

const parseFlows = (rawFlows: string[]): Record<string, WF> => {
  const wfs = rawFlows.map((rawFlow) => {
    const m = rawFlow.match(/(.*)\{(.*)}/)!;
    const [_, workflowName, rawRules] = m;
    const spl = rawRules.split(",");
    const end = spl.pop()!;
    const rules = spl.map((s) => {
      const sp = s.split(":");
      return { l: s[0], c: s[1] as C, v: +sp[0].substring(2), r: sp[1] };
    });
    return { workflowName, rules, end };
  });
  return Object.fromEntries(wfs.map((w) => [w.workflowName, w]));
};

const getPointFromRule = (
  vI: Interval,
  rule: WF["rules"][0],
  inverse: boolean,
): Point => {
  const v = vI[rule.l];
  const mod = inverse ? 0 : 1;
  return rule.c === (inverse ? ">" : "<")
    ? [v[0], rule.v - mod]
    : [rule.v + mod, v[1]];
};

const isValidInt = (interval: Point): boolean => interval[0] <= interval[1];

export const solve: Solve = (star, input) => {
  const data = loadDataGrouped(star, input, __dirname);
  const [rawFlows, rawParts] = data;
  const flows = parseFlows(rawFlows);

  if (star === 1) {
    const parts = parseParts(rawParts);
    const evalPart = (part: Part) => {
      let flowStr = "in";
      findFlow: while (true) {
        if (flowStr === "A") {
          return true;
        } else if (flowStr === "R") {
          return false;
        }
        const flow = flows[flowStr];
        if (!flow) throw new Error("Out of flows");
        for (const rule of flow.rules) {
          const r = part[rule.l] - rule.v;
          if (rule.c === "<" ? r < 0 : r > 0) {
            flowStr = rule.r;
            continue findFlow;
          }
        }
        flowStr = flow.end;
      }
    };

    const accepted = parts.filter(evalPart);
    return sum(accepted.map((p) => sum(Object.values(p))));
  } else {
    const branch = (
      finalIntervals: Interval[],
      s: string,
      interval: Interval,
    ) => {
      if (s === "A") {
        finalIntervals.push(interval);
        return;
      } else if (s === "R") {
        return;
      }
      const flow = flows[s];
      if (!flow) throw new Error("Out of flows");
      let vI = interval;
      for (const rule of flow.rules) {
        const newInt: Point = getPointFromRule(vI, rule, false);

        if (isValidInt(newInt)) {
          branch(finalIntervals, rule.r, {
            ...vI,
            [rule.l]: newInt,
          });
        }
        const inverse = getPointFromRule(vI, rule, true);
        if (isValidInt(inverse)) {
          vI = { ...vI, [rule.l]: inverse };
        } else {
          return;
        }
      }
      branch(finalIntervals, flow.end, vI);
    };
    const interval: Interval = {
      x: [1, 4000],
      m: [1, 4000],
      a: [1, 4000],
      s: [1, 4000],
    };
    const final: Interval[] = [];
    branch(final, "in", interval);
    return sum(
      final.map((i) =>
        Object.values(i).reduce(
          (acc, curr) => acc * (curr[1] - curr[0] + 1),
          1,
        ),
      ),
    );
  }
};
