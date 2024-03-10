import { Equation } from "./equation"
import { Expression } from "./expressions"
import { Fraction } from "./fraction"
import { Inequation } from "./inequation"
import { Parser } from "./parser"

const parse = function (input: string) {
  const parser = new Parser()
  const result = parser.parse(input)
  return result
}

const toTex = function (input: unknown) {
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
          return String(e)
        }
      })
      .join()
  } else {
    return String(input)
  }
}

export default {
  parse,
  toTex
}
