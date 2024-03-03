import { Expression, Term, Variable } from "./expressions.js"
import { Fraction } from "./fractions.js"
import { isInt } from "./helper.js"

const ROOT_PRECISION = 10e-15

export class Equation {
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

  solveFor(variable) {
    if (!this.lhs.hasVariable(variable) && !this.rhs.hasVariable(variable)) {
      throw new TypeError(
        "Invalid Argument (" +
          variable.toString() +
          "): Variable does not exist in the equation."
      )
    }

    // If the equation is linear and the variable in question can be isolated through arithmetic, solve.
    if (this.isLinear() || this.#variableCanBeIsolated(variable)) {
      const solvingFor = new Term(new Variable(variable))
      let newLhs = new Expression()
      let newRhs = new Expression()

      for (let i = 0; i < this.rhs.terms.length; i++) {
        let term = this.rhs.terms[i]

        if (term.canBeCombinedWith(solvingFor)) {
          newLhs = newLhs.subtract(term)
        } else {
          newRhs = newRhs.add(term)
        }
      }

      for (let i = 0; i < this.lhs.terms.length; i++) {
        let term = this.lhs.terms[i]

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

      newRhs = newRhs.divide(newLhs.terms[0].coefficient())

      if (newRhs.terms.length === 0) {
        return newRhs.constant().reduce()
      }

      newRhs.sort()
      return newRhs

      // Otherwise, move everything to the LHS.
    } else {
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
        let coefs = newLhs.quadraticCoefficients()

        let a = coefs.a
        let b = coefs.b
        let c = coefs.c

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
              let root1 = b
                .multiply(-1)
                .subtract(squareRootDiscriminant)
                .divide(a.multiply(2))
              let root2 = b
                .multiply(-1)
                .add(squareRootDiscriminant)
                .divide(a.multiply(2))
              return [root1.reduce(), root2.reduce()]
              // If the answers will be irrational, return numbers.
            } else {
              squareRootDiscriminant = Math.sqrt(discriminant.valueOf())
              a = a.valueOf()
              b = b.valueOf()

              let root1 = (-b - squareRootDiscriminant) / (2 * a)
              let root2 = (-b + squareRootDiscriminant) / (2 * a)
              return [root1, root2]
            }
          }
          // If the discriminant is negative, there are no real roots.
        } else {
          return []
        }
      } else if (this.#isCubic(variable)) {
        let coefs = newLhs.cubicCoefficients()

        let a = coefs.a
        let b = coefs.b
        let c = coefs.c
        let d = coefs.d

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
            let root1 = b.multiply(-1).divide(a.multiply(3))

            return [root1.reduce()]
            // Otherwise, if D0 != 0, there are two distinct real roots.
            // 9ad - bc / 2D0
            // 4abc - 9a^2d - b^3 / aD0
          } else {
            let root1 = a.multiply(b).multiply(c).multiply(4)
            root1 = root1.subtract(a.pow(2).multiply(d).multiply(9))
            root1 = root1.subtract(b.pow(3))
            root1 = root1.divide(a.multiply(D0))

            let root2 = a
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
            let root1 = S + U - b / (3 * a)
            return [root1].map(this.#roundRootToPrecision)
          } else {
            const i = Math.sqrt(Math.pow(g, 2) / 4 - h)
            const j = Math.cbrt(i)

            const k = Math.acos(-(g / (2 * i)))
            const L = -j
            const M = Math.cos(k / 3)
            const N = Math.sqrt(3) * Math.sin(k / 3)
            const P = -(b / (3 * a))

            let root1 = 2 * j * Math.cos(k / 3) - b / (3 * a)
            let root2 = L * (M + N) + P
            let root3 = L * (M - N) + P

            const roots = [root1, root2, root3].map(this.#roundRootToPrecision)
            roots.sort(function (a, b) {
              return a - b
            }) // roots in ascending order

            return [roots[0], roots[1], roots[2]]
          }
        }
      }
    }
  }

  eval(values) {
    return new Equation(this.lhs.eval(values), this.rhs.eval(values))
  }

  toString(options) {
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

  /**
   * Round root if the next integer is within ROOT_PRECISION.
   */
  #roundRootToPrecision(root) {
    const roundedRoot = Math.round(root)
    if (Math.abs(roundedRoot - root) < ROOT_PRECISION) {
      return roundedRoot
    } else {
      return root
    }
  }
}
