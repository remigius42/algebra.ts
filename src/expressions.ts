/* spellchecker:ignore cdot */

import { Fraction } from "./fractions"
import { GREEK_LETTERS, isInt } from "./helper"

export class Expression {
  constants: Array<Fraction>
  terms: Array<Term>

  constructor(variable?) {
    this.constants = []

    if (typeof variable === "string") {
      const v = new Variable(variable)
      const t = new Term(v)
      this.terms = [t]
    } else if (isInt(variable)) {
      this.constants = [new Fraction(variable, 1)]
      this.terms = []
    } else if (variable instanceof Fraction) {
      this.constants = [variable]
      this.terms = []
    } else if (variable instanceof Term) {
      this.terms = [variable]
    } else if (typeof variable === "undefined") {
      this.terms = []
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          variable.toString() +
          "): Argument must be of type String, Integer, Fraction or Term."
      )
    }
  }

  get variableNames() {
    return [...new Set(this.terms.flatMap(t => t.variableNames))].sort()
  }

  constant() {
    return this.constants.reduce(
      function (p, c) {
        return p.add(c)
      },
      new Fraction(0, 1)
    )
  }

  simplify() {
    const copy = this.copy()

    //simplify all terms
    copy.terms = copy.terms.map(function (t) {
      return t.simplify()
    })

    copy.sort()
    copy.#combineLikeTerms()
    copy.#moveTermsWithDegreeZeroToConstants()
    copy.#removeTermsWithCoefficientZero()
    copy.constants = copy.constant().valueOf() === 0 ? [] : [copy.constant()]

    return copy
  }

  copy() {
    const copy = new Expression()

    //copy all constants
    copy.constants = this.constants.map(function (c) {
      return c.copy()
    })
    //copy all terms
    copy.terms = this.terms.map(function (t) {
      return t.copy()
    })

    return copy
  }

  add(a, simplify = true) {
    const thisExp = this.copy()

    if (
      typeof a === "string" ||
      a instanceof Term ||
      isInt(a) ||
      a instanceof Fraction
    ) {
      const exp = new Expression(a)
      return thisExp.add(exp, simplify)
    } else if (a instanceof Expression) {
      const keepTerms = a.copy().terms

      thisExp.terms = thisExp.terms.concat(keepTerms)
      thisExp.constants = thisExp.constants.concat(a.constants)
      thisExp.sort()
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          a.toString() +
          "): Summand must be of type String, Expression, Term, Fraction or Integer."
      )
    }

    return simplify || simplify === undefined ? thisExp.simplify() : thisExp
  }

  subtract(a, simplify = true) {
    const negative =
      a instanceof Expression ? a.multiply(-1) : new Expression(a).multiply(-1)
    return this.add(negative, simplify)
  }

  multiply(a, simplify = true) {
    const thisExp = this.copy()

    if (
      typeof a === "string" ||
      a instanceof Term ||
      isInt(a) ||
      a instanceof Fraction
    ) {
      const exp = new Expression(a)
      return thisExp.multiply(exp, simplify)
    } else if (a instanceof Expression) {
      const thatExp = a.copy()
      const newTerms: Array<Term> = []

      for (let i = 0; i < thisExp.terms.length; i++) {
        const thisTerm = thisExp.terms[i]

        for (let j = 0; j < thatExp.terms.length; j++) {
          const thatTerm = thatExp.terms[j]
          newTerms.push(thisTerm.multiply(thatTerm, simplify))
        }

        for (let j = 0; j < thatExp.constants.length; j++) {
          newTerms.push(thisTerm.multiply(thatExp.constants[j], simplify))
        }
      }

      for (let i = 0; i < thatExp.terms.length; i++) {
        let thatTerm = thatExp.terms[i]

        for (let j = 0; j < thisExp.constants.length; j++) {
          newTerms.push(thatTerm.multiply(thisExp.constants[j], simplify))
        }
      }

      const newConstants = []

      for (let i = 0; i < thisExp.constants.length; i++) {
        const thisConst = thisExp.constants[i]

        for (let j = 0; j < thatExp.constants.length; j++) {
          const thatConst = thatExp.constants[j]
          let t = new Term()
          t = t.multiply(thatConst, false)
          t = t.multiply(thisConst, false)
          newTerms.push(t)
        }
      }

      thisExp.constants = newConstants
      thisExp.terms = newTerms
      thisExp.sort()
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          a.toString() +
          "): Multiplicand must be of type String, Expression, Term, Fraction or Integer."
      )
    }

    return simplify || simplify === undefined ? thisExp.simplify() : thisExp
  }

  divide(a, simplify = true) {
    if (a instanceof Fraction || isInt(a)) {
      if (a.valueOf() === 0) {
        throw new EvalError("Divide By Zero")
      }

      const copy = this.copy()

      for (let i = 0; i < copy.terms.length; i++) {
        const thisTerm = copy.terms[i]

        for (let j = 0; j < thisTerm.coefficients.length; j++) {
          thisTerm.coefficients[j] = thisTerm.coefficients[j].divide(
            a,
            simplify
          )
        }
      }

      //divide every constant by a
      copy.constants = copy.constants.map(function (c) {
        return c.divide(a, simplify)
      })

      return copy
    } else if (a instanceof Expression) {
      //Simplify both expressions
      let num = this.copy().simplify()
      const denom = a.copy().simplify()

      //Total amount of terms and constants
      const numTotal = num.terms.length + num.constants.length
      const denomTotal = denom.terms.length + denom.constants.length

      //Check if both terms are monomial
      if (numTotal === 1 && denomTotal === 1) {
        //Divide coefficients
        const numCoef = num.terms[0].coefficients[0]
        const denomCoef = denom.terms[0].coefficients[0]

        //The expressions have just been simplified - only one coefficient per term
        num.terms[0].coefficients[0] = numCoef.divide(denomCoef, simplify)
        denom.terms[0].coefficients[0] = new Fraction(1, 1)

        //Cancel variables
        for (let i = 0; i < num.terms[0].variables.length; i++) {
          const numVar = num.terms[0].variables[i]
          for (let j = 0; j < denom.terms[0].variables.length; j++) {
            const denomVar = denom.terms[0].variables[j]
            //Check for equal variables
            if (numVar.variable === denomVar.variable) {
              //Use the rule for division of powers
              num.terms[0].variables[i].degree = numVar.degree - denomVar.degree
              denom.terms[0].variables[j].degree = 0
            }
          }
        }

        //Invert all degrees of remaining variables
        for (let i = 0; i < denom.terms[0].variables.length; i++) {
          denom.terms[0].variables[i].degree *= -1
        }
        //Multiply the inverted variables to the numerator
        num = num.multiply(denom, simplify)

        return num
      } else {
        throw new TypeError(
          "Invalid Argument ((" +
            num.toString() +
            ")/(" +
            denom.toString() +
            ")): Only monomial expressions can be divided."
        )
      }
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          a.toString() +
          "): Divisor must be of type Fraction or Integer."
      )
    }
  }

  pow(a, simplify = true) {
    if (isInt(a)) {
      let copy = this.copy()

      if (a === 0) {
        return new Expression().add(1)
      } else {
        for (let i = 1; i < a; i++) {
          copy = copy.multiply(this, simplify)
        }

        copy.sort()
      }

      return simplify || simplify === undefined ? copy.simplify() : copy
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          a.toString() +
          "): Exponent must be of type Integer."
      )
    }
  }

  eval(values, simplify = true) {
    let exp = new Expression()
    exp.constants = simplify ? [this.constant()] : this.constants.slice()

    //add all evaluated terms of this to exp
    exp = this.terms.reduce(function (p, c) {
      return p.add(c.eval(values, simplify), simplify)
    }, exp)

    return exp
  }

  summation(variable, lower, upper, simplify = true) {
    const thisExpr = this.copy()
    let newExpr = new Expression()
    for (let i = lower; i < upper + 1; i++) {
      const sub = {}
      sub[variable] = i
      newExpr = newExpr.add(thisExpr.eval(sub, simplify), simplify)
    }
    return newExpr
  }

  toString(options = { implicit: false }) {
    let str = ""

    for (let i = 0; i < this.terms.length; i++) {
      const term = this.terms[i]

      str +=
        (term.coefficients[0].valueOf() < 0 ? " - " : " + ") +
        term.toString(options)
    }

    for (let i = 0; i < this.constants.length; i++) {
      const constant = this.constants[i]

      str +=
        (constant.valueOf() < 0 ? " - " : " + ") + constant.abs().toString()
    }

    if (str.substring(0, 3) === " - ") {
      return "-" + str.substring(3, str.length)
    } else if (str.substring(0, 3) === " + ") {
      return str.substring(3, str.length)
    } else {
      return "0"
    }
  }

  toTex(dict = { multiplication: "cdot" }) {
    let str = ""

    for (let i = 0; i < this.terms.length; i++) {
      const term = this.terms[i]

      str +=
        (term.coefficients[0].valueOf() < 0 ? " - " : " + ") + term.toTex(dict)
    }

    for (let i = 0; i < this.constants.length; i++) {
      const constant = this.constants[i]

      str += (constant.valueOf() < 0 ? " - " : " + ") + constant.abs().toTex()
    }

    if (str.substring(0, 3) === " - ") {
      return "-" + str.substring(3, str.length)
    } else if (str.substring(0, 3) === " + ") {
      return str.substring(3, str.length)
    } else {
      return "0"
    }
  }

  sort() {
    function sortTerms(a, b) {
      const x = a.maxDegree()
      const y = b.maxDegree()

      if (x === y) {
        const m = a.variables.length
        const n = b.variables.length

        return n - m
      } else {
        return y - x
      }
    }

    this.terms = this.terms.sort(sortTerms)
    return this
  }

  hasVariable(variable) {
    for (let i = 0; i < this.terms.length; i++) {
      if (this.terms[i].hasVariable(variable)) {
        return true
      }
    }

    return false
  }

  onlyHasVariable(variable) {
    for (let i = 0; i < this.terms.length; i++) {
      if (!this.terms[i].onlyHasVariable(variable)) {
        return false
      }
    }

    return true
  }

  noCrossProductsWithVariable(variable) {
    for (let i = 0; i < this.terms.length; i++) {
      const term = this.terms[i]
      if (term.hasVariable(variable) && !term.onlyHasVariable(variable)) {
        return false
      }
    }

    return true
  }

  noCrossProducts() {
    for (let i = 0; i < this.terms.length; i++) {
      const term = this.terms[i]
      if (term.variables.length > 1) {
        return false
      }
    }

    return true
  }

  maxDegree() {
    return this.terms.reduce(function (p, c) {
      return Math.max(p, c.maxDegree())
    }, 0)
  }

  maxDegreeOfVariable(variable) {
    return this.terms.reduce(function (p, c) {
      return Math.max(p, c.maxDegreeOfVariable(variable))
    }, 0)
  }

  quadraticCoefficients() {
    // This function isn't used until everything has been moved to the LHS in Equation.solve.
    let a
    let b = new Fraction(0, 1)
    for (let i = 0; i < this.terms.length; i++) {
      const thisTerm = this.terms[i]
      a = thisTerm.maxDegree() === 2 ? thisTerm.coefficient().copy() : a
      b = thisTerm.maxDegree() === 1 ? thisTerm.coefficient().copy() : b
    }
    const c = this.constant()

    return { a, b, c }
  }

  cubicCoefficients() {
    // This function isn't used until everything has been moved to the LHS in Equation.solve.
    let a
    let b = new Fraction(0, 1)
    let c = new Fraction(0, 1)

    for (let i = 0; i < this.terms.length; i++) {
      const thisTerm = this.terms[i]
      a = thisTerm.maxDegree() === 3 ? thisTerm.coefficient().copy() : a
      b = thisTerm.maxDegree() === 2 ? thisTerm.coefficient().copy() : b
      c = thisTerm.maxDegree() === 1 ? thisTerm.coefficient().copy() : c
    }

    const d = this.constant()
    return { a, b, c, d }
  }

  #removeTermsWithCoefficientZero() {
    this.terms = this.terms.filter(function (t) {
      return t.coefficient().reduce().numer !== 0
    })
    return this
  }

  #combineLikeTerms() {
    function alreadyEncountered(term, encountered) {
      for (let i = 0; i < encountered.length; i++) {
        if (term.canBeCombinedWith(encountered[i])) {
          return true
        }
      }

      return false
    }

    const newTerms: Array<Term> = []
    const encountered: Array<Term> = []

    for (let i = 0; i < this.terms.length; i++) {
      let thisTerm = this.terms[i]

      if (alreadyEncountered(thisTerm, encountered)) {
        continue
      } else {
        for (let j = i + 1; j < this.terms.length; j++) {
          const thatTerm = this.terms[j]

          if (thisTerm.canBeCombinedWith(thatTerm)) {
            thisTerm = thisTerm.add(thatTerm)
          }
        }

        newTerms.push(thisTerm)
        encountered.push(thisTerm)
      }
    }

    this.terms = newTerms
    return this
  }

  #moveTermsWithDegreeZeroToConstants() {
    const keepTerms: Array<Term> = []
    let constant = new Fraction(0, 1)

    for (let i = 0; i < this.terms.length; i++) {
      const thisTerm = this.terms[i]

      if (thisTerm.variables.length === 0) {
        constant = constant.add(thisTerm.coefficient())
      } else {
        keepTerms.push(thisTerm)
      }
    }

    this.constants.push(constant)
    this.terms = keepTerms
    return this
  }
}

export class Term {
  coefficients: Array<Fraction>
  variables: Array<Variable>

  constructor(variable?) {
    if (variable instanceof Variable) {
      this.variables = [variable.copy()]
    } else if (typeof variable === "undefined") {
      this.variables = []
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          variable.toString() +
          "): Term initializer must be of type Variable."
      )
    }

    this.coefficients = [new Fraction(1, 1)]
  }

  coefficient() {
    //calculate the product of all coefficients
    return this.coefficients.reduce(
      function (p, c) {
        return p.multiply(c)
      },
      new Fraction(1, 1)
    )
  }

  get variableNames() {
    return [...new Set(this.variables.map(v => v.variable))].sort()
  }

  simplify() {
    const copy = this.copy()
    copy.coefficients = [this.coefficient()]
    copy.combineVars()
    return copy.sort()
  }

  combineVars() {
    const uniqueVars = {}

    for (let i = 0; i < this.variables.length; i++) {
      const thisVar = this.variables[i]

      if (thisVar.variable in uniqueVars) {
        uniqueVars[thisVar.variable] += thisVar.degree
      } else {
        uniqueVars[thisVar.variable] = thisVar.degree
      }
    }

    const newVars: Array<Variable> = []

    for (let v in uniqueVars) {
      const newVar = new Variable(v)
      newVar.degree = uniqueVars[v]
      newVars.push(newVar)
    }

    this.variables = newVars
    return this
  }

  copy() {
    const copy = new Term()
    copy.coefficients = this.coefficients.map(function (c) {
      return c.copy()
    })
    copy.variables = this.variables.map(function (v) {
      return v.copy()
    })
    return copy
  }

  add(term) {
    if (term instanceof Term && this.canBeCombinedWith(term)) {
      const copy = this.copy()
      copy.coefficients = [copy.coefficient().add(term.coefficient())]
      return copy
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          term.toString() +
          "): Summand must be of type String, Expression, Term, Fraction or Integer."
      )
    }
  }

  subtract(term) {
    if (term instanceof Term && this.canBeCombinedWith(term)) {
      const copy = this.copy()
      copy.coefficients = [copy.coefficient().subtract(term.coefficient())]
      return copy
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          term.toString() +
          "): Subtrahend must be of type String, Expression, Term, Fraction or Integer."
      )
    }
  }

  multiply(a, simplify = true) {
    const thisTerm = this.copy()

    if (a instanceof Term) {
      thisTerm.variables = thisTerm.variables.concat(a.variables)
      thisTerm.coefficients = a.coefficients.concat(thisTerm.coefficients)
    } else if (isInt(a) || a instanceof Fraction) {
      const newCoef = isInt(a) ? new Fraction(a, 1) : a

      if (thisTerm.variables.length === 0) {
        thisTerm.coefficients.push(newCoef)
      } else {
        thisTerm.coefficients.unshift(newCoef)
      }
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          a.toString() +
          "): Multiplicand must be of type String, Expression, Term, Fraction or Integer."
      )
    }

    return simplify || simplify === undefined ? thisTerm.simplify() : thisTerm
  }

  divide(a, simplify = true) {
    if (isInt(a) || a instanceof Fraction) {
      const thisTerm = this.copy()
      thisTerm.coefficients = thisTerm.coefficients.map(function (c) {
        return c.divide(a, simplify)
      })
      return thisTerm
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          a.toString() +
          "): Argument must be of type Fraction or Integer."
      )
    }
  }

  eval(values, simplify = true) {
    const copy = this.copy()
    let exp = copy.coefficients.reduce(function (p, c) {
      return p.multiply(c, simplify)
    }, new Expression(1))

    for (let i = 0; i < copy.variables.length; i++) {
      const thisVar = copy.variables[i]

      let ev

      if (thisVar.variable in values) {
        const sub = values[thisVar.variable]

        if (sub instanceof Fraction || sub instanceof Expression) {
          ev = sub.pow(thisVar.degree)
        } else if (isInt(sub)) {
          ev = Math.pow(sub, thisVar.degree)
        } else {
          throw new TypeError(
            "Invalid Argument (" +
              sub +
              "): Can only evaluate Expressions or Fractions."
          )
        }
      } else {
        ev = new Expression(thisVar.variable).pow(thisVar.degree)
      }

      exp = exp.multiply(ev, simplify)
    }

    return exp
  }

  hasVariable(variable) {
    for (let i = 0; i < this.variables.length; i++) {
      if (this.variables[i].variable === variable) {
        return true
      }
    }

    return false
  }

  maxDegree() {
    return this.variables.reduce(function (p, c) {
      return Math.max(p, c.degree)
    }, 0)
  }

  maxDegreeOfVariable(variable) {
    return this.variables.reduce(function (p, c) {
      return c.variable === variable ? Math.max(p, c.degree) : p
    }, 0)
  }

  canBeCombinedWith(term) {
    const thisVars = this.variables
    const thatVars = term.variables

    if (thisVars.length != thatVars.length) {
      return false
    }

    let matches = 0

    for (let i = 0; i < thisVars.length; i++) {
      for (let j = 0; j < thatVars.length; j++) {
        if (
          thisVars[i].variable === thatVars[j].variable &&
          thisVars[i].degree === thatVars[j].degree
        ) {
          matches += 1
        }
      }
    }

    return matches === thisVars.length
  }

  onlyHasVariable(variable) {
    for (let i = 0; i < this.variables.length; i++) {
      if (this.variables[i].variable != variable) {
        return false
      }
    }

    return true
  }

  sort() {
    function sortVars(a, b) {
      return b.degree - a.degree
    }

    this.variables = this.variables.sort(sortVars)
    return this
  }

  toString(options = { implicit: false }) {
    const implicit = options && options.implicit
    let str = ""

    for (let i = 0; i < this.coefficients.length; i++) {
      const coef = this.coefficients[i]

      if (coef.abs().numer !== 1 || coef.abs().denom !== 1) {
        str += " * " + coef.toString()
      }
    }
    str = this.variables.reduce(function (p, c) {
      if (implicit && !!p) {
        const vStr = c.toString()
        return vStr ? p + "*" + vStr : p
      } else return p.concat(c.toString())
    }, str)
    str = str.substring(0, 3) === " * " ? str.substring(3, str.length) : str
    str = str.substring(0, 1) === "-" ? str.substring(1, str.length) : str

    return str
  }

  toTex(dict = { multiplication: "cdot" }) {
    const op = " \\" + dict.multiplication + " "

    let str = ""

    for (let i = 0; i < this.coefficients.length; i++) {
      const coef = this.coefficients[i]

      if (coef.abs().numer !== 1 || coef.abs().denom !== 1) {
        str += op + coef.toTex()
      }
    }
    str = this.variables.reduce(function (p, c) {
      return p.concat(c.toTex())
    }, str)
    str =
      str.substring(0, op.length) === op
        ? str.substring(op.length, str.length)
        : str
    str = str.substring(0, 1) === "-" ? str.substring(1, str.length) : str
    str =
      str.substring(0, 7) === "\\frac{-"
        ? "\\frac{" + str.substring(7, str.length)
        : str

    return str
  }
}

export class Variable {
  variable: string
  degree: number

  constructor(variable) {
    if (typeof variable === "string") {
      this.variable = variable
      this.degree = 1
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          variable.toString() +
          "): Variable initializer must be of type String."
      )
    }
  }

  copy() {
    const copy = new Variable(this.variable)
    copy.degree = this.degree
    return copy
  }

  toString() {
    const degree = this.degree
    const variable = this.variable

    if (degree === 0) {
      return ""
    } else if (degree === 1) {
      return variable
    } else {
      return variable + "^" + degree
    }
  }

  toTex() {
    const degree = this.degree
    let variable = this.variable

    if (GREEK_LETTERS.indexOf(variable) > -1) {
      variable = "\\" + variable
    }

    if (degree === 0) {
      return ""
    } else if (degree === 1) {
      return variable
    } else {
      return variable + "^{" + degree + "}"
    }
  }
}
