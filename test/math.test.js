import { mathOperations } from "../src/math/operations.js";

describe("mathOperations module", () => {
  test("add numbers", () => {
    expect(mathOperations.add(2, 3)).toBe(5);
  });

  test("add bigints", () => {
    expect(mathOperations.add(2n, 3n)).toBe(5n);
  });

  test("concatenate strings", () => {
    expect(mathOperations.add("Hello ", "World")).toBe("Hello World");
  });

  test("invalid add types", () => {
    expect(() => mathOperations.add(2, "3")).toThrow("Invalid types for +");
  });

  test("subtract numbers", () => {
    expect(mathOperations.subtract(10, 4)).toBe(6);
  });

  test("subtract bigints", () => {
    expect(mathOperations.subtract(10n, 4n)).toBe(6n);
  });

  test("multiply numbers", () => {
    expect(mathOperations.multiply(2, 3)).toBe(6);
  });

  test("multiply bigints", () => {
    expect(mathOperations.multiply(2n, 3n)).toBe(6n);
  });

  test("divide numbers", () => {
    expect(mathOperations.divide(10, 2)).toBe(5);
  });

  test("divide by zero", () => {
    expect(() => mathOperations.divide(10, 0)).toThrow("Division by zero");
  });

  test("divide bigints", () => {
    expect(mathOperations.divide(10n, 2n)).toBe(5n);
  });

  test("modulus numbers", () => {
    expect(mathOperations.modulus(10, 3)).toBe(1);
  });

  test("modulus bigints", () => {
    expect(mathOperations.modulus(10n, 3n)).toBe(1n);
  });

  test("power numbers", () => {
    expect(mathOperations.power(2, 3)).toBe(8);
  });

  test("power bigints", () => {
    expect(mathOperations.power(2n, 3n)).toBe(8n);
  });

  test("invalid types for power", () => {
    expect(() => mathOperations.power(2, "3")).toThrow("Invalid types for ^");
  });

  test("invalid types for multiply", () => {
    expect(() => mathOperations.multiply(2, "3")).toThrow("Invalid types for *");
  });
});