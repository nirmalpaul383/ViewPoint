const isValidNumberPair = (a, b) =>
  (typeof a === typeof b) &&
  (typeof a === 'number' || typeof a === 'bigint');

export const mathOperations = Object.freeze({

  operator_precedence: {
    '^': 4,
    '*': 3,
    '/': 3,
    '%': 3,
    '+': 1,
    '-': 1,
  },

  power: function(a, b) {
    if (isValidNumberPair(a, b)) return a ** b;
    throw new Error("Invalid types for ^");
  },

  multiply: function(a, b) {
    if (isValidNumberPair(a, b)) return a * b;
    throw new Error("Invalid types for *");
  },

  divide: function(a, b) {
    if (isValidNumberPair(a, b)) {
      if (b === 0) throw new Error("Division by zero");
      return a / b;
    }
    throw new Error("Invalid types for /");
  },

  add: function(a, b) {
    if (isValidNumberPair(a, b)) return a + b;
    if (typeof a === 'string' && typeof b === 'string') return a + b;
    throw new Error("Invalid types for +");
  },
  subtract: function(a, b) {
    if (isValidNumberPair(a, b)) return a - b;
    throw new Error("Invalid types for -");
  },

  modulus: function(a, b) {
    if (isValidNumberPair(a, b)) return a % b;
    throw new Error("Invalid types for %");
  }
});