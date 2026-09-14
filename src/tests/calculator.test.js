const assert = require("node:assert/strict");
const test = require("node:test");

const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
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

test("modulo returns the remainder", () => {
  // Example from calc-extended-operations.png: 5 % 2 = 1.
  assert.equal(modulo(5, 2), 1);
  assert.equal(modulo(10, 3), 1);
  assert.equal(modulo(-10, 3), -1);
});

test("modulo rejects modulo by zero", () => {
  assert.throws(() => modulo(10, 0), {
    name: "RangeError",
    message: "Modulo by zero is not allowed.",
  });
});

test("power raises the first number to the second power", () => {
  // Example from calc-extended-operations.png: 2 ^ 3 = 8.
  assert.equal(power(2, 3), 8);
  assert.equal(power(9, 0.5), 3);
  assert.equal(power(-2, 3), -8);
});

test("square root returns the non-negative square root", () => {
  // Example from calc-extended-operations.png: sqrt(16) = 4.
  assert.equal(squareRoot(16), 4);
  assert.equal(squareRoot(0), 0);
  assert.equal(squareRoot(9), 3);
  assert.equal(squareRoot(2), Math.sqrt(2));
});

test("square root rejects negative numbers", () => {
  assert.throws(() => squareRoot(-1), {
    name: "RangeError",
    message: "Square root of a negative number is not allowed.",
  });
});

test("operations reject non-finite operands", () => {
  for (const operation of [
    addition,
    subtraction,
    multiplication,
    division,
    modulo,
    power,
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
  assert.throws(() => squareRoot(Number.NaN), {
    name: "TypeError",
    message: "The operand must be a valid number.",
  });
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
  assert.equal(calculate("modulo", 10, 3), 1);
  assert.equal(calculate("%", 10, 3), 1);
  assert.equal(calculate("power", 2, 3), 8);
  assert.equal(calculate("^", 2, 3), 8);
  assert.equal(calculate("sqrt", 9), 3);
  assert.equal(calculate("squareRoot", 9), 3);
});

test("calculate rejects unsupported operations", () => {
  assert.throws(() => calculate("unknown", 10, 3), {
    name: "Error",
    message:
      'Invalid operation "unknown". Use addition, subtraction, multiplication, division, modulo, power, or squareRoot.',
  });
});
