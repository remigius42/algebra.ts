import { GREEK_LETTERS } from "./helpers"

export class Variable {
  variable: string
  degree: number

  constructor(variable: unknown) {
    if (typeof variable === "string") {
      this.variable = variable
      this.degree = 1
    } else {
      throw new TypeError(
        "Invalid Argument (" +
          String(variable) +
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
