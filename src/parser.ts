import { Equation } from "./equation"
import { Expression } from "./expressions"
import { Fraction } from "./fraction"
import { Inequation } from "./inequation"
import { Lexer } from "./lexer"

interface Token {
  type: string
  value: string
  pos: number
}

export class Parser {
  private lexer: Lexer
  private current_token: Token | null

  constructor() {
    this.lexer = new Lexer()
    this.current_token = null

    /**
     * Base-grammar:
     *
     * expr   -> expr + term
     *        | expr - term
     *        | - term
     *        | term
     *
     * term   -> term * factor
     *        | term factor
     *        | term / factor
     *        | term ^ factor
     *        | factor
     *
     * factor -> (expr)
     *        | num
     *        | id
     *
     * ===============================
     *
     * Grammar without left recursion -> the grammar actually used
     *
     * eqn         -> expr = expr
     * expr        -> term expr_rest
     * expr_rest   -> + term expr_rest
     *             | - term expr_rest
     *             | ε
     *
     * term        -> factor term_rest
     * term_rest   -> * term term_rest
     *             |   term term_rest
     *             | ^ term term_rest
     *             | / term term_rest
     *             | ε
     *
     * factor      -> (expr)
     *             | num
     *             | id
     *
     **/
  }

  // Updates the current token to the next input token
  update() {
    this.current_token = this.lexer.token()
  }

  // Returns true if the current token matches the keyword
  match(keyword: string) {
    if (this.current_token === null) return keyword === "epsilon"

    switch (keyword) {
      case "plus":
        return (
          this.current_token.type === "OPERATOR" &&
          this.current_token.value === "PLUS"
        )
      case "minus":
        return (
          this.current_token.type === "OPERATOR" &&
          this.current_token.value === "MINUS"
        )
      case "multiply":
        return (
          this.current_token.type === "OPERATOR" &&
          this.current_token.value === "MULTIPLY"
        )
      case "power":
        return (
          this.current_token.type === "OPERATOR" &&
          this.current_token.value === "POWER"
        )
      case "divide":
        return (
          this.current_token.type === "OPERATOR" &&
          this.current_token.value === "DIVIDE"
        )
      case "equal":
        return (
          this.current_token.type === "OPERATOR" &&
          this.current_token.value === "EQUALS"
        )
      case "less_than":
        return (
          this.current_token.type === "OPERATOR" &&
          this.current_token.value === "LESS_THAN"
        )
      case "less_than_equals":
        return (
          this.current_token.type === "OPERATOR" &&
          this.current_token.value === "LESS_THAN_EQUALS"
        )
      case "greater_than":
        return (
          this.current_token.type === "OPERATOR" &&
          this.current_token.value === "GREATER_THAN"
        )
      case "greater_than_equals":
        return (
          this.current_token.type === "OPERATOR" &&
          this.current_token.value === "GREATER_THAN_EQUALS"
        )
      case "l_paren":
        return (
          this.current_token.type === "PAREN" &&
          this.current_token.value === "L_PAREN"
        )
      case "r_paren":
        return (
          this.current_token.type === "PAREN" &&
          this.current_token.value === "R_PAREN"
        )
      case "num":
        return this.current_token.type === "NUMBER"
      case "id":
        return this.current_token.type === "IDENTIFIER"
      default:
        return false
    }
  }

  /*
      Initializes the parser internals and the lexer.
      The input is then parsed according to the grammar described in the
      header comment. The parsing process constructs a abstract syntax tree
      using the classes the algebra.js library provides
  */
  parse(input: string) {
    //pass the input to the lexer
    this.lexer.input(input)
    this.update()
    return this.#parseEqn()
  }

  #parseEqn() {
    const ex1 = this.#parseExpr()
    if (this.match("equal")) {
      this.update()
      const ex2 = this.#parseExpr()
      return new Equation(ex1, ex2)
    } else if (this.#isInequation()) {
      const relations = new Map([
        ["LESS_THAN", "<"],
        ["LESS_THAN_EQUALS", "<="],
        ["GREATER_THAN", ">"],
        ["GREATER_THAN_EQUALS", ">="]
      ])
      if (this.current_token && relations.has(this.current_token.value)) {
        const relation = relations.get(this.current_token.value)!
        this.update()
        const ex2 = this.#parseExpr()
        return new Inequation(ex1, ex2, relation)
      } /* c8 ignore start */ else {
        throw new Error(
          `Should not be reached since the operator "${this.current_token?.value}" has been matched as inequation relational operator.`
        )
        /* c8 ignore end */
      }
    } else if (this.match("epsilon")) {
      return ex1
    } else {
      throw new SyntaxError("Unbalanced Parenthesis")
    }
  }

  #isInequation() {
    return (
      this.match("less_than") ||
      this.match("less_than_equals") ||
      this.match("greater_than") ||
      this.match("greater_than_equals")
    )
  }

  #parseExpr() {
    const term = this.#parseTerm()
    return this.#parseExprRest(term)
  }

  #parseExprRest(term?: Expression): Expression | undefined {
    if (this.match("plus")) {
      this.update()
      const plusTerm = this.#parseTerm()
      if (term === undefined || plusTerm === undefined)
        throw new SyntaxError("Missing operand")
      return this.#parseExprRest(term.add(plusTerm))
    } else if (this.match("minus")) {
      this.update()
      const minusTerm = this.#parseTerm()
      //This case is entered when a negative number is parsed e.g. x = -4
      if (term === undefined) {
        return minusTerm
          ? this.#parseExprRest(minusTerm.multiply(-1))
          : undefined
      } else {
        return this.#parseExprRest(term.subtract(minusTerm))
      }
    } else {
      return term
    }
  }

  #parseTerm() {
    const factor = this.#parseFactor()
    return this.#parseTermRest(factor)
  }

  #parseTermRest(factor: Expression | undefined): Expression | undefined {
    if (factor === undefined) {
      return factor
    } else if (this.match("multiply")) {
      this.update()
      const mulFactor = this.#parseFactor()
      return factor.multiply(this.#parseTermRest(mulFactor))
    } else if (this.match("power")) {
      this.update()
      const powFactor = this.#parseFactor()
      //WORKAROUND: algebra.js only allows integers and fractions for raising
      return this.#parseTermRest(factor.pow(parseInt(String(powFactor))))
    } else if (this.match("divide")) {
      this.update()
      const divFactor = this.#parseFactor()
      //WORKAROUND: algebra.js only allows integers and fractions for division
      return divFactor
        ? this.#parseTermRest(factor.divide(this.#convertToFraction(divFactor)))
        : undefined
    } else if (this.match("epsilon")) {
      return factor
    } else {
      //a missing operator between terms is treated like a multiplier
      const mulFactor2 = this.#parseFactor()
      if (mulFactor2 === undefined) {
        return factor
      } else {
        return factor.multiply(this.#parseTermRest(mulFactor2))
      }
    }
  }

  /**
   * Is used to convert expressions to fractions, as dividing by expressions is not possible
   **/
  #convertToFraction(expression: Expression) {
    if (expression.terms.length > 0) {
      throw new TypeError(
        "Invalid Argument (" +
          expression.toString() +
          "): Divisor must be of type Integer or Fraction."
      )
    } else {
      const c = expression.constants[0]
      return new Fraction(c.numer, c.denom)
    }
  }

  #parseFactor(): Expression | undefined {
    if (this.match("num")) {
      const num = this.#parseNumber()
      this.update()
      return num
    } else if (this.match("id")) {
      const id = new Expression(this.current_token?.value)
      this.update()
      return id
    } else if (this.match("l_paren")) {
      this.update()
      const expr = this.#parseExpr()
      if (this.match("r_paren")) {
        this.update()
        return expr
      } else {
        throw new SyntaxError("Unbalanced Parenthesis")
      }
    } else {
      return undefined
    }
  }

  // Converts a number token - integer or decimal - to an expression
  #parseNumber() {
    //Integer conversion
    if (this.current_token) {
      if (
        parseInt(this.current_token.value) ===
        parseFloat(this.current_token.value)
      ) {
        return new Expression(parseInt(this.current_token.value))
      } else {
        //Split the decimal number to integer and decimal parts
        const splits = this.current_token.value.split(".")
        //count the digits of the decimal part
        const decimals = splits[1].length
        //determine the multiplication factor
        const factor = Math.pow(10, decimals)
        const float_op = parseFloat(this.current_token.value)
        //multiply the float with the factor and divide it again afterwards
        //to create a valid expression object
        return new Expression(float_op * factor).divide(factor)
      }
    } /* c8 ignore start */ else {
      throw new Error(
        "Should not be reached since the current token has been matched as a number"
      )
      /* c8 ignore end */
    }
  }
}
