#!/usr/bin/env node

/**
 * Basic Node.js CLI calculator.
 *
 * Supported operations:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*)
 * - division (/)
 * - modulo (%)
 * - exponentiation (^)
 * - square root (sqrt)
 */

function validateOperands(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError("Both operands must be valid numbers.");
  }
}

// Addition: returns the sum of two numbers.
function addition(a, b) {
  validateOperands(a, b);
  return a + b;
}

// Subtraction: returns the difference between two numbers.
function subtraction(a, b) {
  validateOperands(a, b);
  return a - b;
}

// Multiplication: returns the product of two numbers.
function multiplication(a, b) {
  validateOperands(a, b);
  return a * b;
}

// Division: returns the quotient of two numbers.
function division(a, b) {
  validateOperands(a, b);
  if (b === 0) {
    throw new RangeError("Division by zero is not allowed.");
  }
  return a / b;
}

// Modulo: returns the remainder after dividing the first number by the second.
function modulo(a, b) {
  validateOperands(a, b);
  if (b === 0) {
    throw new RangeError("Modulo by zero is not allowed.");
  }
  return a % b;
}

// Power: raises the first number to the power of the second number.
function power(a, b) {
  validateOperands(a, b);
  return a ** b;
}

// Square root: returns the non-negative square root of a number.
function squareRoot(a) {
  if (!Number.isFinite(a)) {
    throw new TypeError("The operand must be a valid number.");
  }
  if (a < 0) {
    throw new RangeError("Square root of a negative number is not allowed.");
  }
  return Math.sqrt(a);
}

const operations = {
  "+": addition,
  addition,
  "-": subtraction,
  subtraction,
  "*": multiplication,
  multiplication,
  "/": division,
  division,
  "%": modulo,
  modulo,
  "^": power,
  power,
  sqrt: squareRoot,
  squareroot: squareRoot,
  squareRoot,
};

function calculate(operation, a, b) {
  const operationFunction = operations[operation.toLowerCase?.() ?? operation];
  if (!operationFunction) {
    throw new Error(
      `Invalid operation "${operation}". Use addition, subtraction, multiplication, division, modulo, power, or squareRoot.`,
    );
  }
  return operationFunction === squareRoot
    ? operationFunction(a)
    : operationFunction(a, b);
}

function runCli(args) {
  if (args.length !== 3 && !(args.length === 2 && args[0].toLowerCase() === "sqrt")) {
    throw new Error(
      "Usage: node src/calculator.js <operation> <first number> [second number]",
    );
  }

  const [operation, firstOperand, secondOperand] = args;
  const firstNumber = Number(firstOperand);
  const secondNumber = Number(secondOperand);

  return calculate(operation, firstNumber, secondNumber);
}

if (require.main === module) {
  try {
    console.log(runCli(process.argv.slice(2)));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
};
