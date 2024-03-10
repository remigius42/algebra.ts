import { Equation } from "./equation"
import { Expression } from "./expressions"
import { Fraction } from "./fraction"
import { Inequation } from "./inequation"
import { Parser } from "./parser"

export function parse(input: string) {
  const parser = new Parser()
  const result = parser.parse(input)
  return result
}

export function toTex(input: unknown) {
  if (isExposedLibraryType(input)) {
    return input.toTex()
  } else if (input instanceof Array) {
    return input
      .map(e => {
        if (isExposedLibraryType(e)) {
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

function isExposedLibraryType(
  input: unknown
): input is Fraction | Expression | Equation | Inequation {
  return (
    input instanceof Fraction ||
    input instanceof Expression ||
    input instanceof Equation ||
    input instanceof Inequation
  )
}
