import { Expression, Term, Variable } from "./expressions"
import { Fraction } from "./fractions"
import { isInt } from "./helper"

const ROOT_PRECISION = 10e-15

export class Equation {
  lhs: Expression
  rhs: Expression

  constructor(lhs, rhs) {
    if (lhs instanceof Expression) {
      this.lhs = lhs

      if (rhs instanceof Expression) {
        this.rhs = rhs
      } else if (rhs instanceof Fraction || isInt(rhs)) {
        this.rhs = new Expression(rhs)
      } else {
        throw new TypeError(
          "Invalid Argument (" +
            rhs.toString() +
            "): Right-hand side must be of type Expression, Fraction or Integer."
        )
      }
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          lhs.toString() +
          "): Left-hand side must be of type Expression."
      )
    }
  }

  get variableNames() {
    return [
      ...new Set([...this.lhs.variableNames, ...this.rhs.variableNames])
    ].sort()
  }

  copy() {
    return new Equation(this.lhs.copy(), this.rhs.copy())
  }

  solveFor(variable, returnEquation = false) {
    if (!this.lhs.hasVariable(variable) && !this.rhs.hasVariable(variable)) {
      throw new TypeError(
        "Invalid Argument (" +
          variable.toString() +
          "): Variable does not exist in the equation."
      )
    }

    let solution

    if (this.isLinear() || this.#variableCanBeIsolated(variable)) {
      // If the equation is linear and the variable in question can be isolated through arithmetic, solve.
      solution = this.#solveLinearEquationWithSeparableVariable(variable)
    } else {
      // Otherwise, move everything to the LHS.
      let newLhs = this.lhs.copy()
      newLhs = newLhs.subtract(this.rhs)

      // If there are no terms left after this rearrangement and the constant is 0, there are infinite solutions.
      // Otherwise, there are no solutions.
      if (newLhs.terms.length === 0) {
        if (newLhs.constant().valueOf() === 0) {
          return [new Fraction(1, 1)]
        } else {
          throw new EvalError("No Solution")
        }

        // Otherwise, check degree and solve.
      } else if (this.isQuadratic(variable)) {
        solution = this.#solveQuadraticEquation(newLhs)
      } else if (this.#isCubic(variable)) {
        solution = this.#solveCubicEquation(newLhs)
      }
    }

    if (returnEquation) {
      return new Equation(new Expression(variable), solution)
    } else {
      return solution
    }
  }

  /**
   * Divide given right-hand side by given coefficient.
   *
   * Defining this operation as a class member simplifies handling side-effects,
   * for example in case of inequations which reverse if the coefficient is
   * negative.
   * Note that you should be careful when introducing side-effects to
   * ensure the methods are operating on a copy to prevent inadvertent
   * modification.
   */
  divideRhsByCoefficient(rhs, coefficient) {
    return rhs.divide(coefficient)
  }

  eval(values) {
    return new Equation(this.lhs.eval(values), this.rhs.eval(values))
  }

  evalToBoolean(values) {
    const equation = this.eval(values)
    if (equation.maxDegree() === 0) {
      return (
        equation.lhs.constant().valueOf() === equation.rhs.constant().valueOf()
      )
    } else {
      throw new EvalError(
        "Can't evaluate equation to boolean since there are free variables."
      )
    }
  }

  toString(options = { implicit: false }) {
    return this.lhs.toString(options) + " = " + this.rhs.toString(options)
  }

  toTex() {
    return this.lhs.toTex() + " = " + this.rhs.toTex()
  }

  maxDegree() {
    const lhsMax = this.lhs.maxDegree()
    const rhsMax = this.rhs.maxDegree()
    return Math.max(lhsMax, rhsMax)
  }

  maxDegreeOfVariable(variable) {
    return Math.max(
      this.lhs.maxDegreeOfVariable(variable),
      this.rhs.maxDegreeOfVariable(variable)
    )
  }

  isLinear() {
    return this.maxDegree() === 1 && this.#noCrossProducts()
  }

  isQuadratic(variable) {
    return this.maxDegree() === 2 && this.#onlyHasVariable(variable)
  }

  #isCubic(variable) {
    return this.maxDegree() === 3 && this.#onlyHasVariable(variable)
  }

  #variableCanBeIsolated(variable) {
    return (
      this.maxDegreeOfVariable(variable) === 1 &&
      this.#noCrossProductsWithVariable(variable)
    )
  }

  #noCrossProductsWithVariable(variable) {
    return (
      this.lhs.noCrossProductsWithVariable(variable) &&
      this.rhs.noCrossProductsWithVariable(variable)
    )
  }

  #noCrossProducts() {
    return this.lhs.noCrossProducts() && this.rhs.noCrossProducts()
  }

  #onlyHasVariable(variable) {
    return (
      this.lhs.onlyHasVariable(variable) && this.rhs.onlyHasVariable(variable)
    )
  }

  #solveLinearEquationWithSeparableVariable(variable) {
    const solvingFor = new Term(new Variable(variable))
    let newLhs = new Expression()
    let newRhs = new Expression()

    for (let i = 0; i < this.rhs.terms.length; i++) {
      const term = this.rhs.terms[i]

      if (term.canBeCombinedWith(solvingFor)) {
        newLhs = newLhs.subtract(term)
      } else {
        newRhs = newRhs.add(term)
      }
    }

    for (let i = 0; i < this.lhs.terms.length; i++) {
      const term = this.lhs.terms[i]

      if (term.canBeCombinedWith(solvingFor)) {
        newLhs = newLhs.add(term)
      } else {
        newRhs = newRhs.subtract(term)
      }
    }

    newRhs = newRhs.subtract(this.lhs.constant())
    newRhs = newRhs.add(this.rhs.constant())

    if (newLhs.terms.length === 0) {
      if (newLhs.constant().equalTo(newRhs.constant())) {
        return new Fraction(1, 1)
      } else {
        throw new EvalError("No Solution")
      }
    }

    newRhs = this.divideRhsByCoefficient(newRhs, newLhs.terms[0].coefficient())

    if (newRhs.terms.length === 0) {
      return newRhs.constant().reduce()
    }

    newRhs.sort()
    return newRhs
  }

  #solveQuadraticEquation(newLhs) {
    const coefs = newLhs.quadraticCoefficients()

    let a = coefs.a
    let b = coefs.b
    const c = coefs.c

    // Calculate the discriminant, b^2 - 4ac.
    const discriminant = b.pow(2).subtract(a.multiply(c).multiply(4))

    // If the discriminant is greater than or equal to 0, there is at least one real root.
    if (discriminant.valueOf() >= 0) {
      // If the discriminant is equal to 0, there is one real root: -b / 2a.
      if (discriminant.valueOf() === 0) {
        return [b.multiply(-1).divide(a.multiply(2)).reduce()]

        // If the discriminant is greater than 0, there are two real roots:
        // (-b - √discriminant) / 2a
        // (-b + √discriminant) / 2a
      } else {
        let squareRootDiscriminant

        // If the answers will be rational, return reduced Fraction objects.
        if (discriminant.squareRootIsRational()) {
          squareRootDiscriminant = discriminant.pow(0.5)
          const root1 = b
            .multiply(-1)
            .subtract(squareRootDiscriminant)
            .divide(a.multiply(2))
          const root2 = b
            .multiply(-1)
            .add(squareRootDiscriminant)
            .divide(a.multiply(2))
          return [root1.reduce(), root2.reduce()]
          // If the answers will be irrational, return numbers.
        } else {
          squareRootDiscriminant = Math.sqrt(discriminant.valueOf())
          a = a.valueOf()
          b = b.valueOf()

          const root1 = (-b - squareRootDiscriminant) / (2 * a)
          const root2 = (-b + squareRootDiscriminant) / (2 * a)
          return [root1, root2]
        }
      }
      // If the discriminant is negative, there are no real roots.
    } else {
      return []
    }
  }

  #solveCubicEquation(newLhs) {
    const coefs = newLhs.cubicCoefficients()

    const a = coefs.a
    const b = coefs.b
    const c = coefs.c
    const d = coefs.d

    // Calculate D and D0.
    let D = a.multiply(b).multiply(c).multiply(d).multiply(18)
    D = D.subtract(b.pow(3).multiply(d).multiply(4))
    D = D.add(b.pow(2).multiply(c.pow(2)))
    D = D.subtract(a.multiply(c.pow(3)).multiply(4))
    D = D.subtract(a.pow(2).multiply(d.pow(2)).multiply(27))

    const D0 = b.pow(2).subtract(a.multiply(c).multiply(3))

    // Check for special cases when D = 0.

    if (D.valueOf() === 0) {
      // If D = D0 = 0, there is one distinct real root, -b / 3a.
      if (D0.valueOf() === 0) {
        const root1 = b.multiply(-1).divide(a.multiply(3))

        return [root1.reduce()]
        // Otherwise, if D0 != 0, there are two distinct real roots.
        // 9ad - bc / 2D0
        // 4abc - 9a^2d - b^3 / aD0
      } else {
        let root1 = a.multiply(b).multiply(c).multiply(4)
        root1 = root1.subtract(a.pow(2).multiply(d).multiply(9))
        root1 = root1.subtract(b.pow(3))
        root1 = root1.divide(a.multiply(D0))

        const root2 = a
          .multiply(d)
          .multiply(9)
          .subtract(b.multiply(c))
          .divide(D0.multiply(2))

        return [root1.reduce(), root2.reduce()]
      }

      // Otherwise, use a different method for solving.
    } else {
      const f = (3 * (c / a) - Math.pow(b, 2) / Math.pow(a, 2)) / 3
      let g = (2 * Math.pow(b, 3)) / Math.pow(a, 3)
      g = g - (9 * b * c) / Math.pow(a, 2)
      g = g + (27 * d) / a
      g = g / 27
      const h = Math.pow(g, 2) / 4 + Math.pow(f, 3) / 27

      /*
                   if f = g = h = 0 then roots are equal (has been already taken care of!)
                   if h>0, only one real root
                   if h<=0, all three roots are real
                 */

      if (h > 0) {
        const R = -(g / 2) + Math.sqrt(h)
        const S = Math.cbrt(R)
        const T = -(g / 2) - Math.sqrt(h)
        const U = Math.cbrt(T)
        const root1 = S + U - b / (3 * a)
        return [root1].map(Equation.#roundRootToPrecision)
      } else {
        const i = Math.sqrt(Math.pow(g, 2) / 4 - h)
        const j = Math.cbrt(i)

        const k = Math.acos(-(g / (2 * i)))
        const L = -j
        const M = Math.cos(k / 3)
        const N = Math.sqrt(3) * Math.sin(k / 3)
        const P = -(b / (3 * a))

        const root1 = 2 * j * Math.cos(k / 3) - b / (3 * a)
        const root2 = L * (M + N) + P
        const root3 = L * (M - N) + P

        const roots = [root1, root2, root3].map(Equation.#roundRootToPrecision)
        roots.sort(function (a, b) {
          return a - b
        }) // roots in ascending order

        return [roots[0], roots[1], roots[2]]
      }
    }
  }

  /**
   * Round root if the next integer is within ROOT_PRECISION.
   */
  static #roundRootToPrecision(root) {
    const roundedRoot = Math.round(root)
    if (Math.abs(roundedRoot - root) < ROOT_PRECISION) {
      return roundedRoot
    } else {
      return root
    }
  }
}
