import { loadDataGrouped } from "../../utils/loadData";
import { Solve } from "../../utils/types";
import {sum} from "lodash";

type C = "<" | ">";
type Part = Record<string, number>;
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

const parseFlows = (rawFlows: string[]): WF[] =>
  rawFlows.map((rawFlow) => {
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

export const solve: Solve = (star, input) => {
  const data = loadDataGrouped(star, input, __dirname);
  const [rawFlows, rawParts] = data;
  const parts = parseParts(rawParts);
  const flows = parseFlows(rawFlows);

  const evalPart = (part: Part) => {
    let flowStr = "in";
    findFlow: while (true) {
      if (flowStr === "A") {
        return true;
      } else if (flowStr === "R") {
        return false;
      }
      const flow = flows.find((f) => f.workflowName === flowStr);
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
  if (star === 1) {
    return sum(accepted.map((p) => sum(Object.values(p))));
  } else {
    return 1;
  }
};
