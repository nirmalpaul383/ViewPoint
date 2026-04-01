import { tokenize } from "../src/parser/tokenizer.js";
import { infixToPostfix } from "../src/parser/infixToPostfix.js";
import { stringToJS } from "../src/utils/typeConverter.js";
import { mathOperations } from "../src/math/operations.js";

describe("Parser Tests", () => {
  const mockContext = {
    variablesDB: {},
    stringToJS: (str) => stringToJS(str, {})
  };

  test("Tokenize simple expression", () => {
    const expr = "5 + 7 * 2";
    const tokens = tokenize(expr, mockContext);
    expect(tokens).toEqual([5, "+", 7, "*", 2]);
  });

  test("Tokenize expression with parentheses", () => {
    const expr = "(5 + 7) * 2";
    const tokens = tokenize(expr, mockContext);
    expect(tokens).toEqual(["(", 5, "+", 7, ")", "*", 2]);
  });

  test("Tokenize expression with strings", () => {
    const expr = `"hello" + " world"`;
    const tokens = tokenize(expr, mockContext);
    expect(tokens).toEqual(["hello", "+", " world"]);
  });

  test("Convert infix to postfix: simple", () => {
    const infix = [5, "+", 7, "*", 2];
    const postfix = infixToPostfix(infix, mathOperations.operator_precedence);
    expect(postfix).toEqual([5, 7, 2, "*", "+"]);
  });

  test("Convert infix to postfix: with parentheses", () => {
    const infix = ["(", 5, "+", 7, ")", "*", 2];
    const postfix = infixToPostfix(infix, mathOperations.operator_precedence);
    expect(postfix).toEqual([5, 7, "+", 2, "*"]);
  });

  test("Convert infix to postfix: multiple operators", () => {
    const infix = [3, "+", 4, "*", 2, "/", "(", 1, "-", 5, ")", "^", 2, "^", 3];
    const postfix = infixToPostfix(infix, mathOperations.operator_precedence);
    expect(postfix).toEqual([3, 4, 2, "*", 1, 5, "-", 2, 3, "^", "^", "/", "+"]);
  });
});