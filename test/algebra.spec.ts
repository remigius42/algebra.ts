import { parse, toTex } from "../src/algebra"
import { Equation } from "../src/equation"
import { Expression } from "../src/expressions"
import { Fraction } from "../src/fraction"
import { Inequation } from "../src/inequation"
import { Parser } from "../src/parser"
jest.mock("../src/parser")

const mockedParser = jest.mocked(Parser)

beforeEach(() => {
  mockedParser.mockClear()
})

describe("parse", () => {
  it("should dispatch to `Parser.parse`", () => {
    const someExpression = "x + 42"

    parse(someExpression)

    expect(mockedParser).toHaveBeenCalledTimes(1)
    const mockParserInstance = mockedParser.mock.instances[0]
    expect(mockParserInstance.parse).toHaveBeenCalledTimes(1)
    expect(mockParserInstance.parse).toHaveBeenCalledWith(someExpression)
  })
})

describe("toTex", () => {
  it.each([
    {
      obj: new Equation(new Expression("x"), new Expression(42)),
      name: "Equation"
    },
    {
      obj: new Inequation(new Expression("x"), new Expression(42), "<"),
      name: "Inequation"
    },
    {
      obj: new Expression("x"),
      name: "Expression"
    },
    {
      obj: new Fraction(1, 2),
      name: "Fraction"
    }
  ])("should invoke 'toTex' on library type $name", ({ obj }) => {
    const spy = jest.spyOn(obj, "toTex")

    toTex(obj)

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  describe("when given an array", () => {
    it("should invoke 'toTex' on Fractions", () => {
      const someFraction = new Fraction(1, 2)
      const spy = jest.spyOn(someFraction, "toTex")
      const arrayWithFraction = [someFraction]

      toTex(arrayWithFraction)

      expect(spy).toHaveBeenCalledTimes(1)
      spy.mockRestore()
    })

    it("should coerce to a string for elements which are not instances of Fraction", () => {
      const someStringRepresentation = "someStringRepresentation"
      const toStringMock = jest.fn(() => someStringRepresentation)
      const someOtherObject = {
        toString: toStringMock
      }
      const arrayWithSomeOtherObject = [someOtherObject]

      toTex(arrayWithSomeOtherObject)

      expect(toStringMock).toHaveBeenCalledTimes(1)
    })
  })

  it("should coerce to a string if not an instance of library types or array", () => {
    const someStringRepresentation = "someStringRepresentation"
    const toStringMock = jest.fn(() => someStringRepresentation)
    const someOtherObject = {
      toString: toStringMock
    }

    const actual = toTex(someOtherObject)

    expect(toStringMock).toHaveBeenCalledTimes(1)
    expect(actual).toBe(someStringRepresentation)
  })
})
