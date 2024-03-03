import algebra from "../algebra.js"
import { Equation } from "../src/equations.js"
import { Expression } from "../src/expressions.js"
import { Fraction } from "../src/fractions.js"
import { round } from "../src/helper.js"

describe("A linear equation with one variable", function () {
  const x1 = new Expression("x").add(4).divide(5) // 1/5x + 4/5
  const x2 = new Expression("x").subtract(new Fraction(1, 6)) // x - 1/6
  const eq = new Equation(x1, x2) // 1/5x + 4/5 = x - 1/6

  it("should initialize", function () {
    expect(eq).toBeDefined()
  })

  it("should print properly", function () {
    expect(eq.toString()).toEqual("1/5x + 4/5 = x - 1/6")
  })

  it("should print to Tex properly", function () {
    expect(eq.toTex()).toEqual(
      "\\frac{1}{5}x + \\frac{4}{5} = x - \\frac{1}{6}"
    )
  })

  it("should print to TeX properly with algebra.toTex", function () {
    expect(algebra.toTex(eq)).toEqual(
      "\\frac{1}{5}x + \\frac{4}{5} = x - \\frac{1}{6}"
    )
  })

  it("should return a fraction when solving for the one variable", function () {
    const answer = eq.solveFor("x")
    expect(answer instanceof Fraction).toBe(true)
  })

  it("should throw an exception when solving for a variable that isn't there", function () {
    expect(function () {
      eq.solveFor("y")
    }).toThrow(
      new TypeError(
        "Invalid Argument (y): Variable does not exist in the equation."
      )
    )
  })

  it("should get the right answer", function () {
    const answer = eq.solveFor("x")
    expect(answer.toString()).toEqual("29/24")
  })
})

describe("An equation with multiple variables", function () {
  const a = new Expression("a")
  const b = new Expression("b")
  const c = new Expression("c")
  const d = new Expression("d")

  const eq = new Equation(a.add(b), c.add(d)) // a + b = c + d

  it("should initialize", function () {
    expect(eq).toBeDefined()
  })

  it("should print properly", function () {
    expect(eq.toString()).toEqual("a + b = c + d")
  })

  it("should return an expression when solving for a variable", function () {
    const answer = eq.solveFor("a")
    expect(answer instanceof Expression).toBe(true)
  })

  it("should throw an exception when solving for a variable that isn't there", function () {
    expect(function () {
      eq.solveFor("y")
    }).toThrow(
      new TypeError(
        "Invalid Argument (y): Variable does not exist in the equation."
      )
    )
  })

  it("should get the right answer", function () {
    const answer = eq.solveFor("a") // a = c + d - b
    expect(answer.toString()).toEqual("c + d - b")
  })

  it("should solve for variables that can be isolated", function () {
    const eq = new Equation(a.multiply(a).add(b), c.add(d)) // a^2 + b = c + d

    const answer = eq.solveFor("b")

    expect(answer.toString()).toEqual("-a^2 + c + d")
  })

  it("should return undefined when solving for a variable that can't be isolated", function () {
    const eq = new Equation(a.multiply(a).add(b), c.add(d)) // a^2 + b = c + d

    const answer = eq.solveFor("a")

    expect(answer).toBeUndefined()
  })
})

describe("Solving a quadratic equation", function () {
  const x = new Expression("x")

  it("should return two reduced fractions if the equation has two real roots that are rational", function () {
    const ex = x.multiply(x).add(x).subtract(2)
    const eq = new Equation(ex, 0) // x^2 + x - 2 = 0

    const answers = eq.solveFor("x") // -2, 1

    expect(answers[0].equalTo(new Fraction(-2, 1))).toBe(true)
    expect(answers[1].equalTo(new Fraction(1, 1))).toBe(true)
  })

  it("should return two reduced fractions if the equation has two real roots that are rational fractions", function () {
    const ex = x.multiply(x).multiply(2).add(x)
    const eq = new Equation(ex, 0)
    const answers = eq.solveFor("x")

    expect(answers[0].equalTo(new Fraction(-1, 2))).toBe(true)
    expect(answers[1].equalTo(new Fraction(0, 1))).toBe(true)
  })

  it("should return two numbers if the equation has two real roots that are irrational", function () {
    const ex = x.multiply(x).add(x.multiply(4)).add(2)
    const eq = new Equation(ex, 0) // x^2 + 4x + 2 = 0

    const answers = eq.solveFor("x") // -2 - √2, √2 - 2
    const expected = [-2 - Math.sqrt(2), Math.sqrt(2) - 2]

    expect(round(answers[0])).toEqual(round(expected[0]))
    expect(round(answers[1])).toEqual(round(expected[1]))
  })

  it("should get the right answer when the answers are irrational and a > 1", function () {
    let lhs = x.pow(2).multiply(2)
    lhs = lhs.add(x.multiply(2))
    lhs = lhs.subtract(5)

    const eq = new Equation(lhs, 0) // 2x^2 + 2x - 5 = 0
    const answers = eq.solveFor("x")
    const expected = [-1 / 2 - Math.sqrt(11) / 2, Math.sqrt(11) / 2 - 1 / 2]

    expect(round(answers[0])).toEqual(round(expected[0]))
    expect(round(answers[1])).toEqual(round(expected[1]))
  })

  it("should return one reduced fraction if there's only one real root", function () {
    const ex = x.multiply(x).add(x.multiply(2))
    const eq = new Equation(ex, -1) // x^2 + 2x = -1

    const answers = eq.solveFor("x")

    expect(answers[0].equalTo(new Fraction(-1, 1)))
  })

  it("should return an empty array if there are no real roots", function () {
    const ex = x.multiply(x.multiply(2)).add(4)
    const eq = new Equation(ex, 0) // x^2 + 2x + 4 = 0

    const answers = eq.solveFor("x")

    expect(answers.length).toEqual(0)
  })

  it("should work when some terms are on the other side", function () {
    const eq = new Equation(x.multiply(x), x.multiply(-1).add(2)) // x^2 = -x + 2

    const answers = eq.solveFor("x") // -2, 1

    expect(answers[0].equalTo(new Fraction(-2, 1))).toBe(true)
    expect(answers[1].equalTo(new Fraction(1, 1))).toBe(true)
  })

  it("should return 1 if there are infinite solutions", function () {
    const eq = new Equation(x.multiply(x), x.multiply(x)) // x^2 = x^2
    const answers = eq.solveFor("x")

    expect(answers[0].equalTo(new Fraction(1, 1))).toBe(true)
  })
})

describe("An array of answers resulting from solving an equation", function () {
  const x = new Expression("x")

  it("should convert toTex properly with rational solutions", function () {
    const ex = x.multiply(x).add(x).subtract(2)
    const eq = new Equation(ex, 0) // x^2 + x - 2 = 0

    const answers = eq.solveFor("x") // -2, 1
    expect(algebra.toTex(answers)).toEqual("-2,1")
  })

  it("should convert toTex properly with irrational solutions", function () {
    const ex = x.multiply(x).multiply(5).add(x).subtract(2)
    const eq = new Equation(ex, 0) // 5x^2 + x - 2 = 0

    const answers = eq.solveFor("x")
    expect(algebra.toTex(answers)).toEqual(
      "-0.7403124237432849,0.5403124237432848"
    )
  })
})

describe("An equation built with an expression and an integer or fraction", function () {
  const x = new Expression("x").add(4).divide(5)
  const eq = new Equation(x, new Fraction(3, 4))

  it("should initialize", function () {
    expect(eq).toBeDefined()
  })

  it("should print properly", function () {
    expect(eq.toString()).toEqual("1/5x + 4/5 = 3/4")
  })
})

describe("An invalid equation", function () {
  const x = new Expression("x")

  it("should throw an exception with a float on the lhs", function () {
    expect(function () {
      new Equation(0.25, x)
    }).toThrow(
      new TypeError(
        "Invalid Argument (0.25): Left-hand side must be of type Expression."
      )
    )
  })

  it("should throw an exception with a float on the rhs", function () {
    expect(function () {
      new Equation(x, 0.25)
    }).toThrow(
      new TypeError(
        "Invalid Argument (0.25): Right-hand side must be of type Expression, Fraction or Integer."
      )
    )
  })

  it("should throw an exception if neither args are expressions", function () {
    expect(function () {
      new Equation(1, 2)
    }).toThrow(
      new TypeError(
        "Invalid Argument (1): Left-hand side must be of type Expression."
      )
    )
  })
})

describe("Checking the type of an equation", function () {
  const x = new Expression("x")
  const y = new Expression("y")

  it("should recognize a linear equation with one variable", function () {
    const eq = new Equation(x, 0)
    expect(eq.isLinear()).toBe(true)
  })

  it("should recognize a linear equation with multiple variables", function () {
    const eq = new Equation(x.add(y), 0)
    expect(eq.isLinear()).toBe(true)
  })

  it("should recognize a quadratic equation", function () {
    const eq = new Equation(x.multiply(x).add(x).add(1), 0)
    expect(eq.isQuadratic("x")).toBe(true)
  })
})

describe("Solving for variables that can't be isolated", function () {
  it("should return undefined if the variable is a cross product with other vars", function () {
    const expr = new Expression("x").multiply("y")
    const eq = new Equation(expr, 2) // xy = 2
    const answer = eq.solveFor("x")
    expect(answer).toBeUndefined()
  })

  it("should return undefined if the variable has multiple degrees and there are other vars", function () {
    let expr = new Expression("x")
    expr = expr.multiply("x")
    expr = expr.add("x")
    expr = expr.add("y")
    const eq = new Equation(expr, 4) // x^2 + x + y = 4
    const answer = eq.solveFor("x")
    expect(answer).toBeUndefined()
  })
})

describe("Solving linear equations with no / infinite solution", function () {
  it("should throw an exception when there's no solution", function () {
    const x = new Expression("x")
    const eq = new Equation(x, x.add(2)) // x = x + 2

    expect(function () {
      eq.solveFor("x")
    }).toThrow(new EvalError("No Solution"))
  })

  it("should return 1 when there's infinite solutions", function () {
    const x = new Expression("x")
    const eq = new Equation(x, x) // x = x

    const answer = eq.solveFor("x")
    expect(answer.equalTo(new Fraction(1, 1))).toBe(true)
  })
})

describe("Solving a cubic equation", function () {
  it("works when there's one distinct real root - discriminant = 0", function () {
    const a = new Expression("x").pow(3)
    const b = new Expression("x").pow(2).multiply(-3)
    const c = new Expression("x").multiply(3)
    const d = -1

    const expr = a.add(b).add(c).add(d)

    const eq = new Equation(expr, 0) // x^3 - 3x^2 + 3x - 1 = 0
    const answers = eq.solveFor("x")
    expect(answers.toString()).toEqual("1")
  })

  it("works when there's one distinct real root - discriminant > 0", function () {
    const a = new Expression("x").pow(3)
    const b = new Expression("x").pow(2).multiply(-3)
    const c = new Expression("x").multiply(3)
    const d = -1

    const expr = a.add(b).add(c).add(d)

    const eq = new Equation(expr, 15) // x^3 - 3x^2 + 3x - 1 = 0
    const answers = eq.solveFor("x")
    expect(answers.toString()).toEqual("3.46621207433047")
  })

  it("works when there's one distinct real root less than zero - discriminant > 0", function () {
    const expression = new Expression("x").pow(3)
    const cubicEquation = new Equation(expression, -8)

    const answers = cubicEquation.solveFor("x")

    expect(answers.toString()).toEqual("-2")
  })

  it("works when there's two distinct real roots - discriminant = 0", function () {
    let expr = new Expression("x").pow(3)
    expr = expr.subtract(new Expression("x").multiply(3))
    expr = expr.add(2) // x^3 - 3x + 2

    const eq = new Equation(expr, 0) // x^3 - 3x + 2 = 0
    const answers = eq.solveFor("x")

    expect(answers.toString()).toEqual("-2,1")
  })

  it("works when there are three real roots, discriminant > 0, negative roots", function () {
    const n1 = new Expression("x").add(2) // x + 2
    const n2 = new Expression("x").add(3) // x + 3
    const n3 = new Expression("x").add(4) // x + 4

    let cubic = n1.multiply(n2).multiply(n3)
    cubic = new Equation(cubic, 0)
    const answers = cubic.solveFor("x")

    expect(answers.toString()).toEqual("-4,-3,-2")
  })

  it("works when there are three real roots, discriminant > 0 and a != 1", function () {
    const n1 = new Expression("x").add("x").add(2) // 2x + 2
    const n2 = new Expression("x").add(3) // x + 3
    const n3 = new Expression("x").add(4) // x + 4

    let cubic = n1.multiply(n2).multiply(n3)
    cubic = new Equation(cubic, 0)
    const answers = cubic.solveFor("x")

    expect(answers.toString()).toEqual("-4,-3,-1")
  })

  it("works when there are three real roots, discriminant > 0, positive roots", function () {
    const n1 = new Expression("x").subtract(2) // x - 2
    const n2 = new Expression("x").subtract(3) // x - 3
    const n3 = new Expression("x").subtract(4) // x - 4

    let cubic = n1.multiply(n2).multiply(n3)
    cubic = new Equation(cubic, 0)
    const answers = cubic.solveFor("x")

    expect(answers.toString()).toEqual("2,3,4")
  })

  it("toTex works", function () {
    const n1 = new Expression("x").add("x").add(2) // 2x + 2
    const n2 = new Expression("x").add(3) // x + 3
    const n3 = new Expression("x").add(4) // x + 4

    let cubic = n1.multiply(n2).multiply(n3)
    cubic = new Equation(cubic, 0)
    const answers = cubic.solveFor("x")

    expect(algebra.toTex(answers)).toEqual("-4,-3,-1")
  })

  it("works when there is one real root, discriminant < 0", function () {
    const a = new Expression("x").pow(3)
    const c = new Expression("x").multiply(-2)

    const expr = a.add(c)
    const cubic = new Equation(expr, 4)

    const answers = cubic.solveFor("x")

    expect(answers.toString()).toEqual("2")
  })

  it("returns 1 when there are infinite solutions", function () {
    const exp = new Expression("x").pow(3)
    const cubic = new Equation(exp.add(4), exp.add(4)) // x^3 + 4 = x^3 + 4

    const answers = cubic.solveFor("x")
    expect(answers[0].equalTo(new Fraction(1, 1))).toBe(true)
  })

  it("should throw an exception when there's no solution", function () {
    const x = new Expression("x").pow(3)
    const eq = new Equation(x, x.add(2)) // x^3 = x^3 + 2

    expect(function () {
      eq.solveFor("x")
    }).toThrow(new EvalError("No Solution"))
  })
})

describe("Equation evaluation", function () {
  it("works with ints", function () {
    const x = new Expression("x")
    const y = new Expression("y")

    const eq = new Equation(x, y.add(2)) // x = y + 2
    const answer = eq.eval({ x: 2 })
    expect(answer.toString()).toEqual("2 = y + 2")
  })

  it("works with expressions", function () {
    const x = new Expression("x")
    const sub = new Expression("y").add(4)

    const eq = new Equation(x, 2) // x = 2
    const answer = eq.eval({ x: sub }) // y + 4 = 2

    expect(answer.toString()).toEqual("y + 4 = 2")
  })
})

describe("An equation toString should accept options", function () {
  const a = new Expression("a")
  const b = new Expression("b")
  const c = new Expression("c")
  const d = new Expression("d")

  const eq = new Equation(a.multiply(b), c.multiply(d))

  it("implicit should be disabled", function () {
    expect(eq.toString()).toEqual("ab = cd")
  })

  it("implicit should be applied to both expressions", function () {
    expect(eq.toString({ implicit: true })).toEqual("a*b = c*d")
  })
})
