const assert = require("node:assert/strict");
const test = require("node:test");

const {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
} = require("../calculator");

test("addition adds two numbers", () => {
  assert.equal(addition(2, 3), 5);
  assert.equal(addition(-4, 6), 2);
  assert.equal(addition(1.5, 2.25), 3.75);
});

test("subtraction subtracts the second number from the first", () => {
  assert.equal(subtraction(10, 4), 6);
  assert.equal(subtraction(4, 10), -6);
  assert.equal(subtraction(5.5, 2.25), 3.25);
});

test("multiplication multiplies two numbers", () => {
  assert.equal(multiplication(45, 2), 90);
  assert.equal(multiplication(-3, 4), -12);
  assert.equal(multiplication(1.5, 2), 3);
});

test("division divides the first number by the second", () => {
  assert.equal(division(20, 5), 4);
  assert.equal(division(7, 2), 3.5);
  assert.equal(division(-12, 3), -4);
});

test("division rejects division by zero", () => {
  assert.throws(() => division(20, 0), {
    name: "RangeError",
    message: "Division by zero is not allowed.",
  });
});

test("operations reject non-finite operands", () => {
  for (const operation of [
    addition,
    subtraction,
    multiplication,
    division,
  ]) {
    assert.throws(() => operation(Number.NaN, 1), {
      name: "TypeError",
      message: "Both operands must be valid numbers.",
    });
    assert.throws(() => operation(1, Number.POSITIVE_INFINITY), {
      name: "TypeError",
      message: "Both operands must be valid numbers.",
    });
  }
});

test("calculate supports operation names and symbols", () => {
  assert.equal(calculate("addition", 2, 3), 5);
  assert.equal(calculate("+", 2, 3), 5);
  assert.equal(calculate("subtraction", 10, 4), 6);
  assert.equal(calculate("-", 10, 4), 6);
  assert.equal(calculate("multiplication", 45, 2), 90);
  assert.equal(calculate("*", 45, 2), 90);
  assert.equal(calculate("division", 20, 5), 4);
  assert.equal(calculate("/", 20, 5), 4);
});

test("calculate rejects unsupported operations", () => {
  assert.throws(() => calculate("modulo", 10, 3), {
    name: "Error",
    message:
      'Invalid operation "modulo". Use addition, subtraction, multiplication, or division.',
  });
});
