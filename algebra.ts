import { Equation } from "./src/equations"
import { Expression } from "./src/expressions"
import { Fraction } from "./src/fractions"
import { Inequation } from "./src/inequations"
import { Parser } from "./src/parser"

const parse = function (input) {
  const parser = new Parser()
  const result = parser.parse(input)
  return result
}

const toTex = function (input) {
  if (
    input instanceof Fraction ||
    input instanceof Expression ||
    input instanceof Equation ||
    input instanceof Inequation
  ) {
    return input.toTex()
  } else if (input instanceof Array) {
    return input
      .map(e => {
        if (e instanceof Fraction) {
          return e.toTex()
        } else {
          return e.toString()
        }
      })
      .join()
  } else {
    return input.toString()
  }
}

export default {
  parse,
  toTex
}
