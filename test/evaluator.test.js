import { evaluatePostfix } from "../src/parser/evaluator.js";
import { mathOperations } from "../src/math/operations.js";

describe("Evaluator Module", () => {
  test("evaluates simple addition", () => {
    const postfix = [2, 3, "+"];
    const result = evaluatePostfix(postfix, mathOperations);
    expect(result).toBe(5);
  });

  test("evaluates multiplication and addition", () => {
    const postfix = [2, 3, 4, "*", "+"];
    const result = evaluatePostfix(postfix, mathOperations);
    expect(result).toBe(14);
  });

  test("evaluates exponentiation", () => {
    const postfix = [2, 3, "^"];
    const result = evaluatePostfix(postfix, mathOperations);
    expect(result).toBe(8);
  });

  test("evaluates complex expression", () => {
    const postfix = [5, 3, 2, "+", "*"];
    const result = evaluatePostfix(postfix, mathOperations);
    expect(result).toBe(25);
  });

  test("evaluates bigints", () => {
    const postfix = [2n, 3n, "+"];
    const result = evaluatePostfix(postfix, mathOperations);
    expect(result).toBe(5n);
  });
});