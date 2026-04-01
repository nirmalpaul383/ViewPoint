import ViewPoint from "../src/core/ViewPoint.js";

describe("ViewPoint Engine", () => {
  let vp;

  beforeEach(() => {
    vp = new ViewPoint();
  });

  test("addition", () => {
    expect(vp.evaluate("2 + 3 + 5")).toBe(10);
  });

  test("operator precedence", () => {
    expect(vp.evaluate("2 + 3 * 4")).toBe(14); // 3*4=12+2=14
  });

  test("parentheses", () => {
    expect(vp.evaluate("(2 + 3) * 4")).toBe(20);
  });

  test("subtraction and division", () => {
    expect(vp.evaluate("20 - 4 / 2")).toBe(18);
  });

  test("power operator", () => {
    expect(vp.evaluate("2 ^ 3")).toBe(8);
  });

  test("modulus", () => {
    expect(vp.evaluate("10 % 3")).toBe(1);
  });

  test("mixed parentheses", () => {
    expect(vp.evaluate("(1 + 2) * (3 + 4)")).toBe(21);
  });

  test("set and use variable", () => {
    vp.setVariable("x", 5);
    vp.setVariable("y", 3);
    expect(vp.evaluate("x + y")).toBe(8);
    expect(vp.evaluate("x * y + 2")).toBe(17); // 5*3=15 +2=17
  });

  test("variable in parentheses", () => {
    vp.setVariable("a", 2);
    vp.setVariable("b", 4);
    expect(vp.evaluate("(a + b) * 3")).toBe(18); // (2+4)*3=18
  });

  test("add and use external function", () => {
    // Example: #double(n) returns n*2
    vp.addFunction("double", (n) => n * 2);
    expect(vp.evaluate("#double(4)")).toBe(8);
    expect(vp.evaluate("2 + #double(5)")).toBe(12); // 2+10=12
  });

  test("external function with multiple arguments", () => {
    vp.addFunction("sumThree", (a, b, c) => a + b + c);
    expect(vp.evaluate("#sumThree(2, 3, 5)")).toBe(10);
  });

  test("nested function calls", () => {
    vp.addFunction("double", (n) => n * 2);
    vp.addFunction("addTen", (n) => n + 10);
    expect(vp.evaluate("#addTen(#double(5))")).toBe(20); // double(5)=10 → addTen(10)=20
  });

  test("using internal function (if any pre-defined)", () => {
    // Example: if you have #max(a,b) internally
    if (vp.func_DB_intrnl.max) {
      expect(vp.evaluate("#max(3,7)")).toBe(7);
    }
  });
});