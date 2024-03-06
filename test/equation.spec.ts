import algebra from "../algebra"
import { Equation } from "../src/equations"
import { Expression } from "../src/expressions"
import { Fraction } from "../src/fractions"
import { round } from "../src/helper"

describe("copy", () => {
  it("should return different objects", () => {
    const exp1 = new Expression("x").multiply(42)
    const exp2 = new Expression("23")
    const equation = new Equation(exp1, exp2)

    const copy = equation.copy()

    expect(copy.lhs).not.toBe(exp1)
    expect(copy.rhs).not.toBe(exp2)
  })

  it("should return equal objects", () => {
    const exp1 = new Expression("x").multiply(42)
    const exp2 = new Expression("23")
    const equation = new Equation(exp1, exp2)

    const copy = equation.copy()

    expect(copy.lhs).toEqual(exp1)
    expect(copy.rhs).toEqual(exp2)
  })
})

describe("A linear equation with one variable", () => {
  const x1 = new Expression("x").add(4).divide(5) // 1/5x + 4/5
  const x2 = new Expression("x").subtract(new Fraction(1, 6)) // x - 1/6
  const eq = new Equation(x1, x2) // 1/5x + 4/5 = x - 1/6

  it("should initialize", () => {
    expect(eq).toBeDefined()
  })

  it("should print properly", () => {
    expect(eq.toString()).toEqual("1/5x + 4/5 = x - 1/6")
  })

  it("should print to Tex properly", () => {
    expect(eq.toTex()).toEqual(
      "\\frac{1}{5}x + \\frac{4}{5} = x - \\frac{1}{6}"
    )
  })

  it("should print to TeX properly with algebra.toTex", () => {
    expect(algebra.toTex(eq)).toEqual(
      "\\frac{1}{5}x + \\frac{4}{5} = x - \\frac{1}{6}"
    )
  })

  it("should return a fraction when solving for the one variable", () => {
    const answer = eq.solveFor("x")
    expect(answer instanceof Fraction).toBe(true)
  })

  it("should throw an exception when solving for a variable that isn't there", () => {
    expect(() => {
      eq.solveFor("y")
    }).toThrow(
      new TypeError(
        "Invalid Argument (y): Variable does not exist in the equation."
      )
    )
  })

  it("should get the right answer", () => {
    const answer = eq.solveFor("x")
    expect(answer.toString()).toEqual("29/24")
  })
})

describe("An equation with multiple variables", () => {
  const a = new Expression("a")
  const b = new Expression("b")
  const c = new Expression("c")
  const d = new Expression("d")

  const eq = new Equation(a.add(b), c.add(d)) // a + b = c + d

  it("should initialize", () => {
    expect(eq).toBeDefined()
  })

  it("should print properly", () => {
    expect(eq.toString()).toEqual("a + b = c + d")
  })

  it("should return an expression when solving for a variable", () => {
    const answer = eq.solveFor("a")
    expect(answer instanceof Expression).toBe(true)
  })

  it("should throw an exception when solving for a variable that isn't there", () => {
    expect(() => {
      eq.solveFor("y")
    }).toThrow(
      new TypeError(
        "Invalid Argument (y): Variable does not exist in the equation."
      )
    )
  })

  it("should get the right answer", () => {
    const answer = eq.solveFor("a") // a = c + d - b
    expect(answer.toString()).toEqual("c + d - b")
  })

  it("should solve for variables that can be isolated", () => {
    const eq = new Equation(a.multiply(a).add(b), c.add(d)) // a^2 + b = c + d

    const answer = eq.solveFor("b")

    expect(answer.toString()).toEqual("-a^2 + c + d")
  })

  it("should return undefined when solving for a variable that can't be isolated", () => {
    const eq = new Equation(a.multiply(a).add(b), c.add(d)) // a^2 + b = c + d

    const answer = eq.solveFor("a")

    expect(answer).toBeUndefined()
  })
})

describe("Solving a quadratic equation", () => {
  const x = new Expression("x")

  it("should return two reduced fractions if the equation has two real roots that are rational", () => {
    const ex = x.multiply(x).add(x).subtract(2)
    const eq = new Equation(ex, 0) // x^2 + x - 2 = 0

    const answers = eq.solveFor("x") // -2, 1

    expect(answers[0].equalTo(new Fraction(-2, 1))).toBe(true)
    expect(answers[1].equalTo(new Fraction(1, 1))).toBe(true)
  })

  it("should return two reduced fractions if the equation has two real roots that are rational fractions", () => {
    const ex = x.multiply(x).multiply(2).add(x)
    const eq = new Equation(ex, 0)
    const answers = eq.solveFor("x")

    expect(answers[0].equalTo(new Fraction(-1, 2))).toBe(true)
    expect(answers[1].equalTo(new Fraction(0, 1))).toBe(true)
  })

  it("should return two numbers if the equation has two real roots that are irrational", () => {
    const ex = x.multiply(x).add(x.multiply(4)).add(2)
    const eq = new Equation(ex, 0) // x^2 + 4x + 2 = 0

    const answers = eq.solveFor("x") // -2 - √2, √2 - 2
    const expected = [-2 - Math.sqrt(2), Math.sqrt(2) - 2]

    expect(round(answers[0])).toEqual(round(expected[0]))
    expect(round(answers[1])).toEqual(round(expected[1]))
  })

  it("should get the right answer when the answers are irrational and a > 1", () => {
    let lhs = x.pow(2).multiply(2)
    lhs = lhs.add(x.multiply(2))
    lhs = lhs.subtract(5)

    const eq = new Equation(lhs, 0) // 2x^2 + 2x - 5 = 0
    const answers = eq.solveFor("x")
    const expected = [-1 / 2 - Math.sqrt(11) / 2, Math.sqrt(11) / 2 - 1 / 2]

    expect(round(answers[0])).toEqual(round(expected[0]))
    expect(round(answers[1])).toEqual(round(expected[1]))
  })

  it("should return one reduced fraction if there's only one real root", () => {
    const ex = x.multiply(x).add(x.multiply(2))
    const eq = new Equation(ex, -1) // x^2 + 2x = -1

    const answers = eq.solveFor("x")

    expect(answers[0].equalTo(new Fraction(-1, 1)))
  })

  it("should return an empty array if there are no real roots", () => {
    const ex = x.multiply(x.multiply(2)).add(4)
    const eq = new Equation(ex, 0) // x^2 + 2x + 4 = 0

    const answers = eq.solveFor("x")

    expect(answers.length).toEqual(0)
  })

  it("should work when some terms are on the other side", () => {
    const eq = new Equation(x.multiply(x), x.multiply(-1).add(2)) // x^2 = -x + 2

    const answers = eq.solveFor("x") // -2, 1

    expect(answers[0].equalTo(new Fraction(-2, 1))).toBe(true)
    expect(answers[1].equalTo(new Fraction(1, 1))).toBe(true)
  })

  it("should return 1 if there are infinite solutions", () => {
    const eq = new Equation(x.multiply(x), x.multiply(x)) // x^2 = x^2
    const answers = eq.solveFor("x")

    expect(answers[0].equalTo(new Fraction(1, 1))).toBe(true)
  })
})

describe("An array of answers resulting from solving an equation", () => {
  const x = new Expression("x")

  it("should convert toTex properly with rational solutions", () => {
    const ex = x.multiply(x).add(x).subtract(2)
    const eq = new Equation(ex, 0) // x^2 + x - 2 = 0

    const answers = eq.solveFor("x") // -2, 1
    expect(algebra.toTex(answers)).toEqual("-2,1")
  })

  it("should convert toTex properly with irrational solutions", () => {
    const ex = x.multiply(x).multiply(5).add(x).subtract(2)
    const eq = new Equation(ex, 0) // 5x^2 + x - 2 = 0

    const answers = eq.solveFor("x")
    expect(algebra.toTex(answers)).toEqual(
      "-0.7403124237432849,0.5403124237432848"
    )
  })
})

describe("An equation built with an expression and an integer or fraction", () => {
  const x = new Expression("x").add(4).divide(5)
  const eq = new Equation(x, new Fraction(3, 4))

  it("should initialize", () => {
    expect(eq).toBeDefined()
  })

  it("should print properly", () => {
    expect(eq.toString()).toEqual("1/5x + 4/5 = 3/4")
  })
})

describe("An invalid equation", () => {
  const x = new Expression("x")

  it("should throw an exception with a float on the lhs", () => {
    expect(() => {
      new Equation(0.25, x)
    }).toThrow(
      new TypeError(
        "Invalid Argument (0.25): Left-hand side must be of type Expression."
      )
    )
  })

  it("should throw an exception with a float on the rhs", () => {
    expect(() => {
      new Equation(x, 0.25)
    }).toThrow(
      new TypeError(
        "Invalid Argument (0.25): Right-hand side must be of type Expression, Fraction or Integer."
      )
    )
  })

  it("should throw an exception if neither args are expressions", () => {
    expect(() => {
      new Equation(1, 2)
    }).toThrow(
      new TypeError(
        "Invalid Argument (1): Left-hand side must be of type Expression."
      )
    )
  })
})

describe("Checking the type of an equation", () => {
  const x = new Expression("x")
  const y = new Expression("y")

  it("should recognize a linear equation with one variable", () => {
    const eq = new Equation(x, 0)
    expect(eq.isLinear()).toBe(true)
  })

  it("should recognize a linear equation with multiple variables", () => {
    const eq = new Equation(x.add(y), 0)
    expect(eq.isLinear()).toBe(true)
  })

  it("should recognize a quadratic equation", () => {
    const eq = new Equation(x.multiply(x).add(x).add(1), 0)
    expect(eq.isQuadratic("x")).toBe(true)
  })
})

it("should return equation with solveFor and flag set", () => {
  const expr = new Expression("x").multiply(2)
  const eq = new Equation(expr, 2) // 2x = 2

  const answer = eq.solveFor("x", true)

  expect(answer).toEqual(new Equation(new Expression("x"), 1))
})

describe("Solving for variables that can't be isolated", () => {
  it("should return undefined if the variable is a cross product with other vars", () => {
    const expr = new Expression("x").multiply("y")
    const eq = new Equation(expr, 2) // xy = 2
    const answer = eq.solveFor("x")
    expect(answer).toBeUndefined()
  })

  it("should return undefined if the variable has multiple degrees and there are other vars", () => {
    let expr = new Expression("x")
    expr = expr.multiply("x")
    expr = expr.add("x")
    expr = expr.add("y")
    const eq = new Equation(expr, 4) // x^2 + x + y = 4
    const answer = eq.solveFor("x")
    expect(answer).toBeUndefined()
  })
})

describe("Solving linear equations with no / infinite solution", () => {
  it("should throw an exception when there's no solution", () => {
    const x = new Expression("x")
    const eq = new Equation(x, x.add(2)) // x = x + 2

    expect(() => {
      eq.solveFor("x")
    }).toThrow(new EvalError("No Solution"))
  })

  it("should return 1 when there's infinite solutions", () => {
    const x = new Expression("x")
    const eq = new Equation(x, x) // x = x

    const answer = eq.solveFor("x")
    expect(answer.equalTo(new Fraction(1, 1))).toBe(true)
  })
})

describe("Solving a cubic equation", () => {
  it("works when there's one distinct real root - discriminant = 0", () => {
    const a = new Expression("x").pow(3)
    const b = new Expression("x").pow(2).multiply(-3)
    const c = new Expression("x").multiply(3)
    const d = -1

    const expr = a.add(b).add(c).add(d)

    const eq = new Equation(expr, 0) // x^3 - 3x^2 + 3x - 1 = 0
    const answers = eq.solveFor("x")
    expect(answers.toString()).toEqual("1")
  })

  it("works when there's one distinct real root - discriminant > 0", () => {
    const a = new Expression("x").pow(3)
    const b = new Expression("x").pow(2).multiply(-3)
    const c = new Expression("x").multiply(3)
    const d = -1

    const expr = a.add(b).add(c).add(d)

    const eq = new Equation(expr, 15) // x^3 - 3x^2 + 3x - 1 = 0
    const answers = eq.solveFor("x")
    expect(answers.toString()).toEqual("3.46621207433047")
  })

  it("works when there's one distinct real root less than zero - discriminant > 0", () => {
    const expression = new Expression("x").pow(3)
    const cubicEquation = new Equation(expression, -8)

    const answers = cubicEquation.solveFor("x")

    expect(answers.toString()).toEqual("-2")
  })

  it("works when there's two distinct real roots - discriminant = 0", () => {
    let expr = new Expression("x").pow(3)
    expr = expr.subtract(new Expression("x").multiply(3))
    expr = expr.add(2) // x^3 - 3x + 2

    const eq = new Equation(expr, 0) // x^3 - 3x + 2 = 0
    const answers = eq.solveFor("x")

    expect(answers.toString()).toEqual("-2,1")
  })

  it("works when there are three real roots, discriminant > 0, negative roots", () => {
    const n1 = new Expression("x").add(2) // x + 2
    const n2 = new Expression("x").add(3) // x + 3
    const n3 = new Expression("x").add(4) // x + 4

    let cubic = n1.multiply(n2).multiply(n3)
    cubic = new Equation(cubic, 0)
    const answers = cubic.solveFor("x")

    expect(answers.toString()).toEqual("-4,-3,-2")
  })

  it("works when there are three real roots, discriminant > 0 and a != 1", () => {
    const n1 = new Expression("x").add("x").add(2) // 2x + 2
    const n2 = new Expression("x").add(3) // x + 3
    const n3 = new Expression("x").add(4) // x + 4

    let cubic = n1.multiply(n2).multiply(n3)
    cubic = new Equation(cubic, 0)
    const answers = cubic.solveFor("x")

    expect(answers.toString()).toEqual("-4,-3,-1")
  })

  it("works when there are three real roots, discriminant > 0, positive roots", () => {
    const n1 = new Expression("x").subtract(2) // x - 2
    const n2 = new Expression("x").subtract(3) // x - 3
    const n3 = new Expression("x").subtract(4) // x - 4

    let cubic = n1.multiply(n2).multiply(n3)
    cubic = new Equation(cubic, 0)
    const answers = cubic.solveFor("x")

    expect(answers.toString()).toEqual("2,3,4")
  })

  it("rounds of roots when there are three real positive roots with values within 10E15 to next integer", () => {
    const n1 = new Expression("x").subtract(new Fraction(2 * 10e15 + 1, 10e15)) // x - 2 + 10e-15
    const n2 = new Expression("x").subtract(new Fraction(3 * 10e15 + 1, 10e15)) // x - 3 + 10e-15
    const n3 = new Expression("x").subtract(new Fraction(4 * 10e15 + 1, 10e15)) // x - 4 + 10e-15

    let cubic = n1.multiply(n2).multiply(n3)
    cubic = new Equation(cubic, 0)
    const answers = cubic.solveFor("x")

    expect(answers.toString()).toEqual("2,3,4")
  })

  it("does not round of roots when there are three real positive roots with values > 10E15 to next integer", () => {
    const n1 = new Expression("x").subtract(new Fraction(2 * 10e14 + 2, 10e14)) // x - 2 + 2*10e-14
    const n2 = new Expression("x").subtract(new Fraction(3 * 10e14 + 2, 10e14)) // x - 3 + 2*10e-14
    const n3 = new Expression("x").subtract(new Fraction(4 * 10e14 + 3, 10e14)) // x - 4 + 3*10e-14

    let cubic = n1.multiply(n2).multiply(n3)
    cubic = new Equation(cubic, 0)
    const answers = cubic.solveFor("x")

    expect(answers.toString()).toEqual(
      "2.0000000000000107,2.999999999999981,4.000000000000015"
    )
  })

  it("rounds of roots when there are three real negative roots with values within 10E15 to next integer", () => {
    const n1 = new Expression("x").add(new Fraction(2 * 10e15 + 1, 10e15)) // x + 2 + 10e-15
    const n2 = new Expression("x").add(new Fraction(3 * 10e15 + 1, 10e15)) // x + 3 + 10e-15
    const n3 = new Expression("x").add(new Fraction(4 * 10e15 + 1, 10e15)) // x + 4 + 10e-15

    let cubic = n1.multiply(n2).multiply(n3)
    cubic = new Equation(cubic, 0)
    const answers = cubic.solveFor("x")

    expect(answers.toString()).toEqual("-4,-3,-2")
  })

  it("does not round of roots when there are three real negative roots with values > 10E15 to next integer", () => {
    const n1 = new Expression("x").add(new Fraction(2 * 10e14 + 2, 10e14)) // x + 2 + 2*10e-14
    const n2 = new Expression("x").add(new Fraction(3 * 10e14 + 2, 10e14)) // x + 3 + 2*10e-14
    const n3 = new Expression("x").add(new Fraction(4 * 10e14 + 3, 10e14)) // x + 4 + 3*10e-14

    let cubic = n1.multiply(n2).multiply(n3)
    cubic = new Equation(cubic, 0)
    const answers = cubic.solveFor("x")

    expect(answers.toString()).toEqual(
      "-4.000000000000015,-2.9999999999999813,-2.0000000000000107"
    )
  })

  it("toTex works", () => {
    const n1 = new Expression("x").add("x").add(2) // 2x + 2
    const n2 = new Expression("x").add(3) // x + 3
    const n3 = new Expression("x").add(4) // x + 4

    let cubic = n1.multiply(n2).multiply(n3)
    cubic = new Equation(cubic, 0)
    const answers = cubic.solveFor("x")

    expect(algebra.toTex(answers)).toEqual("-4,-3,-1")
  })

  it("works when there is one real root, discriminant < 0", () => {
    const a = new Expression("x").pow(3)
    const c = new Expression("x").multiply(-2)

    const expr = a.add(c)
    const cubic = new Equation(expr, 4)

    const answers = cubic.solveFor("x")

    expect(answers.toString()).toEqual("2")
  })

  it("returns 1 when there are infinite solutions", () => {
    const exp = new Expression("x").pow(3)
    const cubic = new Equation(exp.add(4), exp.add(4)) // x^3 + 4 = x^3 + 4

    const answers = cubic.solveFor("x")
    expect(answers[0].equalTo(new Fraction(1, 1))).toBe(true)
  })

  it("should throw an exception when there's no solution", () => {
    const x = new Expression("x").pow(3)
    const eq = new Equation(x, x.add(2)) // x^3 = x^3 + 2

    expect(() => {
      eq.solveFor("x")
    }).toThrow(new EvalError("No Solution"))
  })
})

describe("Equation evaluation", () => {
  it("works with ints", () => {
    const x = new Expression("x")
    const y = new Expression("y")

    const eq = new Equation(x, y.add(2)) // x = y + 2
    const answer = eq.eval({ x: 2 })
    expect(answer.toString()).toEqual("2 = y + 2")
  })

  it("works with expressions", () => {
    const x = new Expression("x")
    const sub = new Expression("y").add(4)

    const eq = new Equation(x, 2) // x = 2
    const answer = eq.eval({ x: sub }) // y + 4 = 2

    expect(answer.toString()).toEqual("y + 4 = 2")
  })

  it("evalToBoolean returns boolean of there are no free variables", () => {
    const x = new Expression("x")
    const y = new Expression("y")
    const eq = new Equation(x, y.add(2)) // x = y + 2

    const answer = eq.evalToBoolean({ x: 3, y: 1 })

    expect(answer).toEqual(true)
  })

  it("evalToBoolean throws if there are free variables", () => {
    const x = new Expression("x")
    const y = new Expression("y")
    const eq = new Equation(x, y.add(2)) // x = y + 2

    expect(() => {
      eq.evalToBoolean({ x: 3 })
    }).toThrow(
      new EvalError(
        "Can't evaluate equation to boolean since there are free variables."
      )
    )
  })
})

describe("An equation toString should accept options", () => {
  const a = new Expression("a")
  const b = new Expression("b")
  const c = new Expression("c")
  const d = new Expression("d")

  const eq = new Equation(a.multiply(b), c.multiply(d))

  it("implicit should be disabled", () => {
    expect(eq.toString()).toEqual("ab = cd")
  })

  it("implicit should be applied to both expressions", () => {
    expect(eq.toString({ implicit: true })).toEqual("a*b = c*d")
  })
})

describe("variableNames", () => {
  it("should return empty array if the equation does not contain any variables", () => {
    const equation = new Equation(new Expression("x"), new Expression(42)).eval(
      { x: 6 * 7 }
    )

    expect(equation.variableNames).toHaveLength(0)
  })

  it("should return name if variable is present in left-hand side", () => {
    const equation = new Equation(new Expression("x"), new Expression(42))

    expect(equation.variableNames).toEqual(["x"])
  })

  it("should return name if variable is present in right-hand side", () => {
    const equation = new Equation(new Expression(42), new Expression("x"))

    expect(equation.variableNames).toEqual(["x"])
  })

  it("should return names of all variables present", () => {
    const equation = new Equation(
      new Expression("a").subtract(new Expression("b")),
      new Expression("c").add(new Expression("d"))
    )

    expect(equation.variableNames).toEqual(["a", "b", "c", "d"])
  })

  it("should return names of all variables present in alphabetical order", () => {
    const equation = new Equation(
      new Expression("d").subtract(new Expression("c")),
      new Expression("b").add(new Expression("a"))
    )

    expect(equation.variableNames).toEqual(["a", "b", "c", "d"])
  })

  it("should return name of all variables only once", () => {
    const equation = new Equation(
      new Expression("x").subtract(new Expression("y").pow(2)),
      new Expression("x").pow(4).add(new Expression("y"))
    )

    expect(equation.variableNames).toEqual(["x", "y"])
  })
})
