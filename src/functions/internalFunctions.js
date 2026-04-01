const and = (...args) => args.every(Boolean);
const or = (...args) => args.some(Boolean);
const not = (val) => !val;

const gt = (a, b) => a > b;
const lt = (a, b) => a < b;
const eq = (a, b) => a === b;
const gte = (a, b) => a >= b;
const lte = (a, b) => a <= b;

export const internalFunctions = Object.freeze({

  max: (...args) => {
    if (!args.every(v => typeof v === 'number')) {
      throw new Error("max() expects numbers only");
    }
    return Math.max(...args);
  },

  min: (...args) => {
    if (!args.every(v => typeof v === 'number')) {
      throw new Error("min() expects numbers only");
    }
    return Math.min(...args);
  },

  and,
  "&&": and,

  or,
  "||": or,

  not,
  "!": not,

  greaterThan: gt,
  ">": gt,

  lessThan: lt,
  "<": lt,

  isEqual: eq,
  "==": eq,

  greaterThanOrEqual: gte,
  ">=": gte,

  lessThanOrEqual: lte,
  "<=": lte,

  if: (cond, t, f = false) => cond ? t : f

});