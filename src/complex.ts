import { Expression } from "./expressions"
import { Fraction } from "./fractions"
import { isInt } from "./helper"

export class Complex {
  real: Fraction
  imaginary: Fraction

  constructor(real: unknown, imaginary: unknown) {
    if (real instanceof Fraction && imaginary instanceof Fraction) {
      this.real = real
      this.imaginary = imaginary
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          String(real) +
          ", " +
          String(imaginary) +
          "): Real and imaginary parts must be of type Fraction."
      )
    }
  }

  copy() {
    return new Complex(this.real, this.imaginary)
  }

  add(a: unknown) {
    const copy = this.copy()

    if (a instanceof Fraction || isInt(a)) {
      copy.real = copy.real.add(a)
    } else if (a instanceof Complex) {
      copy.real = copy.real.add(a.real)
      copy.imaginary = copy.imaginary.add(a.imaginary)
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          String(a) +
          "): Summand must be of type Complex, Fraction or Integer."
      )
    }

    return copy
  }

  subtract(a: unknown) {
    const copy = this.copy()

    if (a instanceof Fraction || isInt(a)) {
      copy.real = copy.real.subtract(a)
    } else if (a instanceof Complex) {
      copy.real = copy.real.subtract(a.real)
      copy.imaginary = copy.imaginary.subtract(a.imaginary)
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          String(a) +
          "): Subtrahend must be of type Complex, Fraction or Integer."
      )
    }

    return copy
  }

  multiply(a: unknown) {
    if (a instanceof Fraction || isInt(a)) {
      const copy = this.copy()
      copy.real = copy.real.multiply(a)
      copy.imaginary = copy.imaginary.multiply(a)
      return copy
    } else if (a instanceof Complex) {
      const expr1 = new Expression("i").multiply(this.imaginary).add(this.real)
      const expr2 = new Expression("i").multiply(a.imaginary).add(a.real)
      const foil = expr1.multiply(expr2)
      const coefs = foil.quadraticCoefficients()
      const coefA = coefs.a
      const coefB = coefs.b
      const coefC = coefs.c

      const real = coefA.multiply(-1).add(coefC)
      return new Complex(real, coefB)
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          String(a) +
          "): Multiplicand must be of type Complex, Fraction or Integer."
      )
    }
  }

  divide(a: unknown): Complex {
    if (a instanceof Fraction || isInt(a)) {
      const copy = this.copy()
      copy.real = copy.real.divide(a)
      copy.imaginary = copy.imaginary.divide(a)
      return copy
    } else if (a instanceof Complex) {
      const conjugate = new Complex(a.real, a.imaginary.multiply(-1))
      const numerator = this.multiply(conjugate)
      const denominator = a.multiply(conjugate).real
      return numerator.divide(denominator)
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          String(a) +
          "): Divisor must be of type Complex, Fraction or Integer."
      )
    }
  }
}
