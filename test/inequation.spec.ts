import { Expression } from "../src/expressions"
import { Inequation } from "../src/inequations"

describe("creating inequations", () => {
  ;["<", ">"].forEach(relation => {
    it("should not throw SyntaxError for supported relations", () => {
      expect(() => {
        new Inequation(new Expression(0), 1, relation)
      }).not.toThrow()
    })
  })

  it("should throw SyntaxError for unsupported relation", () => {
    expect(() => {
      new Inequation(new Expression(0), 1, "!=")
    }).toThrow(
      new SyntaxError(
        'Relation "!=" is not supported. Only "<", "<=", ">", ">=" are supported.'
      )
    )
  })
})

describe("copy", () => {
  it("should return different objects", () => {
    const exp1 = new Expression("x").multiply(42)
    const exp2 = new Expression("23")
    const equation = new Inequation(exp1, exp2, "<")

    const copy = equation.copy()

    expect(copy.lhs).not.toBe(exp1)
    expect(copy.rhs).not.toBe(exp2)
  })

  it("should return equal objects", () => {
    const exp1 = new Expression("x").multiply(42)
    const exp2 = new Expression("23")
    const equation = new Inequation(exp1, exp2, "<")

    const copy = equation.copy()

    expect(copy.lhs).toEqual(exp1)
    expect(copy.rhs).toEqual(exp2)
  })
})

describe("solving inequations", () => {
  it("should not reverse inequality when multiplying with a positive coefficient", () => {
    const inequation = new Inequation(
      new Expression("x").divide(2),
      new Expression(-4),
      "<"
    ) // x / 2 < -4 <=> x < -8

    expect(inequation.solveFor("x").toString()).toEqual("x < -8")
  })

  it("should not reverse inequality when dividing by a positive coefficient", () => {
    const inequation = new Inequation(
      new Expression("x").multiply(2),
      new Expression(-4),
      "<"
    ) // x * 2 < -4 <=> x < -2

    expect(inequation.solveFor("x").toString()).toEqual("x < -2")
  })

  it("should reverse inequality when multiplying with a negative coefficient", () => {
    const inequation = new Inequation(
      new Expression("x").divide(-2),
      new Expression(4),
      "<"
    ) // x / -2 < 4 <=> x > -8

    expect(inequation.solveFor("x").toString()).toEqual("x > -8")
  })

  it("should reverse inequality when dividing by a negative coefficient", () => {
    const inequation = new Inequation(
      new Expression("x").multiply(-2),
      new Expression(4),
      "<"
    ) // x * -2 < 4 <=> x > -2

    expect(inequation.solveFor("x").toString()).toEqual("x > -2")
  })

  it("should solve for variable when multiple variables are present", () => {
    const inequation = new Inequation(
      new Expression("x"),
      new Expression("y").multiply(4).add(2),
      "<"
    ) // x < 4y + 2 <=> y > 1/4x - 1/2

    expect(inequation.solveFor("y").toString()).toEqual("y > 1/4x - 1/2")
  })

  it("should not modify original inequation when solving for a variable", () => {
    const inequation = new Inequation(
      new Expression("x"),
      new Expression("y").multiply(4).add(2),
      "<"
    ) // x < 4y + 2 <=> y > 1/4x - 1/2

    inequation.solveFor("y")

    expect(inequation.toString()).toEqual("x < 4y + 2")
  })

  it("should throw for non-linear inequations", () => {
    const inequation = new Inequation(
      new Expression("x").pow(2).multiply(-2),
      new Expression(4),
      "<"
    ) // x^2 * -2 < 4

    expect(() => inequation.solveFor("x")).toThrow(
      new EvalError("Only linear inequations are supported.")
    )
  })
})

describe("evaluating inequations", () => {
  it("should substitute numbers", () => {
    const x = new Expression("x")
    const y = new Expression("y")
    const eq = new Inequation(x, y.add(2), "<") // x < y + 2

    const answer = eq.eval({ x: 3 })

    expect(answer.toString()).toEqual("3 < y + 2")
  })

  it("should substitute expressions", () => {
    const x = new Expression("x")
    const y = new Expression("y")
    const eq = new Inequation(x, y.add(2), ">=") // x >= y + 2
    const expression = new Expression("z").subtract(3)

    const answer = eq.eval({ x: expression })

    expect(answer.toString()).toEqual("z - 3 >= y + 2")
  })
  //
  ;[
    ["<", false],
    ["<=", true],
    [">", false],
    [">=", true]
  ].forEach(([operator, expected]) => {
    it(`evalToBoolean and operator ${operator} returns boolean of there are no free variables`, () => {
      const x = new Expression("x")
      const y = new Expression("y")
      const eq = new Inequation(x, y.add(2), String(operator)) // x OPERATOR y + 2

      const answer = eq.evalToBoolean({ x: 3, y: 1 })

      expect(answer).toEqual(expected)
    })
  })

  it("evalToBoolean throws if there are free variables", () => {
    const x = new Expression("x")
    const y = new Expression("y")
    const eq = new Inequation(x, y.add(2), ">") // x > y + 2

    expect(() => eq.evalToBoolean({ x: 3 })).toThrow(
      new EvalError(
        "Can't evaluate inequation to boolean since there are free variables."
      )
    )
  })
})

describe("toTex", () => {
  it("should return correct string for inequation with less than", () => {
    const inequation = new Inequation(
      new Expression("x").multiply(2),
      new Expression(5),
      "<"
    )

    expect(inequation.toTex()).toEqual("2x < 5")
  })

  it("should return correct string for inequation with less than equals", () => {
    const inequation = new Inequation(
      new Expression("x").multiply(2),
      new Expression(5),
      "<="
    )

    expect(inequation.toTex()).toEqual("2x \\le 5")
  })

  it("should return correct string for inequation with greater than", () => {
    const inequation = new Inequation(
      new Expression("x").multiply(2),
      new Expression(5),
      ">"
    )

    expect(inequation.toTex()).toEqual("2x > 5")
  })

  it("should return correct string for inequation with greater than equals", () => {
    const inequation = new Inequation(
      new Expression("x").multiply(2),
      new Expression(5),
      ">="
    )

    expect(inequation.toTex()).toEqual("2x \\ge 5")
  })
})
