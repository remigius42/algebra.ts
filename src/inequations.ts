import { Equation } from "./equations"
import { Expression } from "./expressions"
import { Fraction } from "./fractions"

export class Inequation extends Equation {
  private isLessThan = false
  private isInclusive = false

  constructor(lhs, rhs, relation) {
    super(lhs, rhs)
    this.#parseRelation(relation)
  }

  copy() {
    const equation = super.copy()
    return new Inequation(equation.lhs, equation.rhs, this.#relationToString())
  }

  solveFor(variable) {
    if (this.isLinear()) {
      const copy = new Inequation(
        this.lhs.copy(),
        this.rhs.copy(),
        this.#relationToString()
      )

      return copy.solveForWithSideEffects(variable)
    } else {
      throw new EvalError("Only linear inequations are supported.")
    }
  }

  /**
   * Solve for a variable with possible side-effects like changing inequality.
   * In order to preserve state, this should normally be invoked on a copy.
   *
   * Note that the visibility of this method had to be switched from `#` to
   * `private` due to an issue with the TypeScript compiler when it comes to
   * references to `super`:
   * https://github.com/microsoft/TypeScript/issues/44515
   */
  private solveForWithSideEffects(variable) {
    const solution = super.solveFor(variable)
    this.lhs = new Expression(variable)
    this.rhs = solution

    return this
  }

  divideRhsByCoefficient(rhs, coefficient) {
    const isCoefficientNegative =
      (coefficient instanceof Fraction && coefficient.valueOf() < 0) ||
      coefficient < 0
    if (isCoefficientNegative) {
      this.isLessThan = !this.isLessThan
    }
    return rhs.divide(coefficient)
  }

  eval(values) {
    return new Inequation(
      this.lhs.eval(values),
      this.rhs.eval(values),
      this.#relationToString()
    )
  }

  evalToBoolean(values) {
    const inequation = this.eval(values)
    if (inequation.maxDegree() == 0) {
      if (inequation.isLessThan && inequation.isInclusive) {
        return (
          inequation.lhs.constant().valueOf() <=
          inequation.rhs.constant().valueOf()
        )
      } else if (inequation.isLessThan && !inequation.isInclusive) {
        return (
          inequation.lhs.constant().valueOf() <
          inequation.rhs.constant().valueOf()
        )
      } else if (!inequation.isLessThan && inequation.isInclusive) {
        return (
          inequation.lhs.constant().valueOf() >=
          inequation.rhs.constant().valueOf()
        )
      } else {
        return (
          inequation.lhs.constant().valueOf() >
          inequation.rhs.constant().valueOf()
        )
      }
    } else {
      throw new EvalError(
        "Can't evaluate inequation to boolean since there are free variables."
      )
    }
  }

  toString(options = { implicit: false }) {
    return `${this.lhs.toString(options)} ${this.#relationToString()} ${this.rhs.toString(options)}`
  }

  #relationToString() {
    return `${this.isLessThan ? "<" : ">"}${this.isInclusive ? "=" : ""}`
  }

  toTex() {
    let relationTexString = ""
    if (this.isInclusive) {
      relationTexString = this.isLessThan ? "\\le" : "\\ge"
    } else {
      relationTexString = this.#relationToString()
    }
    return `${this.lhs.toTex()} ${relationTexString} ${this.rhs.toTex()}`
  }

  #parseRelation(relation) {
    const RELATIONS = ["<", "<=", ">", ">="]
    if (RELATIONS.includes(relation)) {
      this.isLessThan = relation.match(/^</)
      this.isInclusive = relation.match(/=$/)
    } else {
      throw new SyntaxError(
        `Relation "${relation}" is not supported. Only ${RELATIONS.map(relation => `"${relation}"`).join(", ")} are supported.`
      )
    }
  }
}
