---
layout: default
---

<!-- spellchecker:words klipse, unsimplified -->

<!-- h1 is provided by layout -->
<!-- markdownlint-disable first-line-heading -->

## Quick Start

You can edit the code in the following example. Note that like all interactive
examples on this page it uses the [UMD](https://github.com/umdjs/umd) version of
the library, which is why the prefix `algebra` is required.

```eval-js
let expr = new algebra.Expression("x")
expr = expr.subtract(3)
expr = expr.add("x")
console.log(String(expr)) // 2x - 3

const eq = new algebra.Equation(expr, 4)
console.log(String(eq)) // 2x - 3 = 4

const x = eq.solveFor("x")
"x = " + String(x) // x = 7/2
```

## Contents

- [Quick Start](#quick-start)
- [Contents](#contents)
- [Usage](#usage)
  - [Right Now](#right-now)
  - [In your website](#in-your-website)
  - [In Node](#in-node)
  - [In TypeScript](#in-typescript)
- [Getting Started](#getting-started)
  - [Fractions](#fractions)
  - [Expressions](#expressions)
    - [Add / Subtract](#add--subtract)
    - [Multiply](#multiply)
    - [Divide](#divide)
    - [Summation](#summation)
    - [Raise](#raise)
    - [Evaluate](#evaluate)
      - [Integers and Fractions](#integers-and-fractions)
      - [Other Expressions](#other-expressions)
    - [Simplification](#simplification)
  - [Equations](#equations)
    - [Build an Equation](#build-an-equation)
    - [Solve Linear Equations](#solve-linear-equations)
      - [One Variable](#one-variable)
      - [Multiple Variables](#multiple-variables)
    - [Solve Quadratic Equations](#solve-quadratic-equations)
    - [Solve Cubic Equations](#solve-cubic-equations)
    - [Solve Anything Else](#solve-anything-else)
  - [Parser](#parser)
    - [Parse Expressions](#parse-expressions)
    - [Parse Equations](#parse-equations)
- [LaTeX](#latex)
  - [Example](#example)
- [Greek Letters](#greek-letters)

## Usage

### Right Now

Most of the examples on this pages are interactive via [Klipse](https://github.com/viebel/klipse).

The UMD version of `algebra.ts` is loaded within this page, therefore you can
also follow along with the examples by executing the suggested keyboard shortcut
for your browser and operating system. This will open the JavaScript Console in
your browser.

| Operating System | Browser | Keyboard Shortcut |
| ---------------- | ------- | ----------------- |
| OS X             | Chrome  | Cmd + Option + J  |
| OS X             | Firefox | Cmd + Option + K  |
| Windows          | Chrome  | Ctrl + Shift + J  |
| Windows          | Firefox | Ctrl + Shift + K  |

As pointed out in the [Quick Start section](#quick-start), the UMD version
requires the prefix `algebra` to prevent collisions with other JavaScript code.

### In your website

To use `algebra.ts` directly in your website, you can download the ES Module
(`algebra-x.y.z.esm.min.js`) or the UMD (`algebra-x.y.z.umd.min.js`) version
from the [GitHub releases](https://github.com/remigius42/algebra.ts/releases).

To integrate it into your website, for the ES Module you could use

```html
<script type="module">
  import { Expression /* , ... */ } from "algebra-x.y.z.esm.min.js"

  console.log(String(new Expression("x").add(42)))
</script>
```

for the UMD version

```html
<script src="algebra-x.y.z.umd.min.js"></script>
<script>
  console.log(String(new algebra.Expression("x").add(42)))
</script>
```

Since [ES Modules don't pollute the global
scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#other_differences_between_modules_and_standard_scripts),
you might want to use ES Module version if possible.

### In Node

```sh
npm install algebra.ts
```

```js
import {
  parse,
  toTex /* , ... */
} from "algebra.ts/dist/algebra.ts-x.y.z.esm.js"
```

### In TypeScript

You can import the necessary classes directly from `src`:

```ts
import { Equation, Expression /* , ... */ } from "algebra.ts"
```

## Getting Started

The main objects available are `Fraction`, `Expression`, `Equation` and
`Inequation`.

### Fractions

Add, subtract, multiply, and divide fractions by either integers or other
fractions. Fractions can be reduced manually via `.reduce()` and are
automatically reduced by default when used in a mathematical operation.

```eval-js
let frac = new algebra.Fraction(2, 4)
console.log(String(frac.reduce())) // 1/2

frac = frac.add(new algebra.Fraction(3, 4))
console.log(String(frac)) // 5/4

frac = frac.subtract(2)
console.log(String(frac)) // -3/4

frac = frac.multiply(new algebra.Fraction(4, 3))
console.log(String(frac)) // -1

frac = frac.divide(5)
String(frac) // -1/5
```

### Expressions

Initialize expressions with a variable name.

```js
let x = new algebra.Expression("x")
```

#### Add / Subtract

Add or subtract integers, fractions, variables, or other expressions to or from expressions.

```eval-js
let x = new algebra.Expression("x")
x = x.add(3)
console.log(String(x)) // x + 3

x = x.subtract(new algebra.Fraction(1, 3))
console.log(String(x)) // x + 8/3

x = x.add("y")
console.log(String(x)) // x + y + 8/3

const otherExp = new algebra.Expression("x").add(6)
x = x.add(otherExp)
String(x) // 2x + y + 26/3
```

When adding / subtracting an expression to / from another expression, any like-terms will be combined.
Keep in mind the distributive property when subtracting expressions.

```eval-js
const expr1 = new algebra.Expression("a").add("b").add("c")
const expr2 = new algebra.Expression("c").subtract("b")
const expr3 = expr1.subtract(expr2)

String(expr1) + " - (" + String(expr2) + ") = " + String(expr3) // a + b + c - (c - b) = a + 2b
```

#### Multiply

Multiply expressions by integers, fractions, variables, or other expressions.

```eval-js
let expr1 = new algebra.Expression("x")
expr1 = expr1.add(2)
expr1 = expr1.multiply(4)

let expr2 = new algebra.Expression("x")
expr2 = expr2.multiply("y")
expr2 = expr2.multiply(new algebra.Fraction(1, 3))
expr2 = expr2.add(4)
const expr3 = expr1.multiply(expr2)

"(" + String(expr1) + ")(" + String(expr2) + ") = " + String(expr3) // (4x + 8)(1/3xy + 4) = 4/3x^2y + 8/3xy + 16x + 32
```

#### Divide

Divide expressions by either integers or fractions.

```eval-js
const x = new algebra.Expression("x").divide(2).divide(new algebra.Fraction(1, 5))
String(x) // 5/2x
```

#### Summation

Sum expressions over a particular variable and range with `Expression.summation(variable, lower, upper)`.

$$\sum\limits_{x=3}^6 (x + y + 3) = 4y + 30$$

```eval-js
let exp = new algebra.Expression("x")
exp = exp.add("y")
exp = exp.add(3)
console.log(String(exp)) // x + y + 3

const sum = exp.summation("x", 3, 6)
String(sum) // 4y + 30
```

#### Raise

Raise expressions to integer powers.

```eval-js
const exp = new algebra.Expression("x").add(2)
const exp3 = exp.pow(3)

"(" + String(exp) + ")^3 = " + String(exp3) // (x + 2)^3 = x^3 + 6x^2 + 12x + 8
```

#### Evaluate

Evaluate expressions by substituting in fractions, integers, or other expressions for variables. Evaluating an expression for only some of its variables returns an expression object. Evaluating an expression for all of its variables returns a fraction object.

##### Integers and Fractions

```eval-js
let expr = new algebra.Expression("x")
expr = expr.multiply(2)
expr = expr.multiply("x")
expr = expr.add("y")
expr = expr.add(new algebra.Fraction(1, 3))
console.log(String(expr)) // 2x^2 + y + 1/3

const answer1 = expr.eval({ x: 2 })
const answer2 = expr.eval({ x: 2, y: new algebra.Fraction(3, 4) })
console.log(String(answer1)) // y + 25/3
String(answer2) // 109/12
```

##### Other Expressions

```eval-js
const expr = new algebra.Expression("x").add(2)
console.log(String(expr)) // x + 2

const sub = new algebra.Expression("y").add(4)
const answer = expr.eval({ x: sub })
String(answer) // y + 6
```

#### Simplification

All expression operations accept a `simplify` argument that will yield an unsimplified expression when set to `false`.
You can then get a simplified expression with `Expression.simplify`.

```eval-js
let exp = new algebra.Expression("x").add(2)
console.log(String(exp)) // x + 2

exp = exp.multiply(5, false)
console.log(String(exp)) // 5x + 5 * 2

exp = exp.simplify()
console.log(String(exp)) // 5x + 10

exp = exp.add(5, false)
console.log(String(exp)) // 5x + 10 + 5

exp = exp.divide(5, false)
console.log(String(exp)) // 5/5x + 10/5 + 5/5

exp = exp.simplify()
console.log(String(exp)) // x + 3

exp = exp.pow(2, false)
console.log(String(exp)) // xx + 3x + 3x + 3 * 3

exp = exp.simplify()
String(exp) // x^2 + 6x + 9
```

### Equations

#### Build an Equation

Build an equation by setting an expression equal to another expression or to an integer or fraction.

```eval-js
const z = new algebra.Expression("z")

const eq1 = new algebra.Equation(z.subtract(4).divide(9), z.add(6))
console.log(String(eq1)) // 1/9z - 4/9 = z + 6

const eq2 = new algebra.Equation(z.add(4).multiply(9), 6)
console.log(String(eq2)) // 9z + 36 = 6

const eq3 = new algebra.Equation(z.divide(2).multiply(7), new algebra.Fraction(1, 4))
String(eq3) // 7/2z = 1/4
```

#### Solve Linear Equations

##### One Variable

If a linear equation only has one variable, solving for that variable will return a fraction object.

```eval-js
const x1 = algebra.parse("1/5 * x + 2/15")
const x2 = algebra.parse("1/7 * x + 4")

const eq = new algebra.Equation(x1, x2)
console.log(String(eq)) // 1/5x + 2/15 = 1/7x + 4

const answer = eq.solveFor("x")
"x = " + String(answer) // x = 203/3
```

##### Multiple Variables

If a linear equation has more than one variable, solving for a variable will return an expression.

```eval-js
const expr1 = algebra.parse("1/4 * x + 5/4")
const expr2 = algebra.parse("3 * y - 12/5")

const eq = new algebra.Equation(expr1, expr2)
console.log(String(eq)) // 1/4x + 5/4 = 3y - 12/5

const xAnswer = eq.solveFor("x")
const yAnswer = eq.solveFor("y")

console.log("x = " + String(xAnswer)) // x = 12y - 73/5
"y = " + String(yAnswer) // y = 1/12x + 73/60
```

#### Solve Quadratic Equations

An equation is quadratic if it can be arranged into the form

$$ax^2 + bx + c = 0$$

where $a \neq 0$.

A quadratic equation has at least one real root if its discriminant, $b^2 - 4ac$, is greater than or equal to 0.
Solving a quadratic equation with a discriminant that is greater than or equal to 0 returns an array of its real roots as either Fraction objects or numbers,
depending on if the roots are rational or irrational, respectively. Solving a quadratic equation with a discriminant that is less than 0 will return an empty array.

```eval-js
const n1 = algebra.parse("x + 5")
const n2 = algebra.parse("x - 3/4")

const quad = new algebra.Equation(n1.multiply(n2), 0)
console.log(String(quad)) // x^2 + 17/4x - 15/4 = 0

const answers = quad.solveFor("x")
"x = " + String(answers) // x = -5,3/4
```

#### Solve Cubic Equations

An equation is cubic if it can be arranged into the form

$$ax^3 + bx^2 + cx + d = 0$$

where $a \neq 0$.

All cubic equations have at least one real root. Solving a cubic equation returns an array of its real roots as either Fraction objects or numbers.

```eval-js
const n1 = algebra.parse("x + 2")
const n2 = algebra.parse("x + 3")
const n3 = algebra.parse("x + 4")

const cubic = new algebra.Equation(n1.multiply(n2).multiply(n3), 0)
console.log(String(cubic)) // x^3 + 9x^2 + 26x + 24 = 0

const answers = cubic.solveFor("x")
"x = " + String(answers) // x = -4,-3,-2
```

#### Solve Anything Else

Equations will only be solved if there is an [algebraic solution](https://en.wikipedia.org/wiki/Algebraic_solution) or if the variable being solved for can be isolated through arithmetic operations. Attempting to solve an equation that does not fit these criteria returns `undefined`.

```eval-js
let expr = new algebra.Expression("x")
expr = expr.multiply("x")
expr = expr.add("x")
expr = expr.add("y")

const eq = new algebra.Equation(expr, 3)
console.log(String(eq)) // x^2 + x + y = 3

const xAnswer = eq.solveFor("x")
const yAnswer = eq.solveFor("y")
console.log("x = " + xAnswer) // x = undefined
"y = " + String(yAnswer) // y = -x^2 - x + 3
```

### Parser

Use `algebra.parse` to parse expressions and equations from strings.

#### Parse Expressions

You must use the `*` operator between coefficients and variables.

```eval-js
const exp = new algebra.parse("2 * x^2 + 4 * x + 4")
String(exp) // 2x^2 + 4x + 4
```

You also must use the `*` operator between cross products; otherwise, they'll be interpreted as a single variable.

```eval-js
const exp = algebra.parse("x * y + 4")
String(exp) // xy + 4
```

#### Parse Equations

```eval-js
const eq = algebra.parse("x^2 + 4 * x + 4 = 0")
console.log(String(eq)) // x^2 + 4x + 4 = 0

const ans = eq.solveFor("x")
"x = " + String(ans) // x = -2
```

## LaTeX

Make things pretty with LaTeX. The `algebra` object has a `.toTex()` method for rendering LaTeX. Combining this with
[KaTeX](https://github.com/Khan/KaTeX), for example, is easy.

### Example

```html
<div id="myEquation"></div>
<div id="mySolution"></div>
```

```eval-js
const a = new algebra.Expression("x").pow(2)
const b = new algebra.Expression("x").multiply(new algebra.Fraction(5, 4))
const c = new algebra.Fraction(-21, 4)
const expr = a.add(b).add(c)

const quad = new algebra.Equation(expr, 0)
katex.render(algebra.toTex(quad), myEquation)

const answers = quad.solveFor("x")
katex.render("x = " + algebra.toTex(answers), mySolution)
```

<div id="myEquation" style="margin-bottom: 0.5em"></div>
<div id="mySolution"></div>

<script type="module">
import { Equation, Expression, Fraction, toTex } from "./javascripts/algebra-0.2.8.esm.js"

const a = new Expression("x").pow(2);
const b = new Expression("x").multiply(new Fraction(5, 4));
const c = new Fraction(-21, 4);

const expr = a.add(b).add(c);

const quad = new Equation(expr, 0);
katex.render(toTex(quad), myEquation);

const answers = quad.solveFor("x");
katex.render("x = " + toTex(answers), mySolution);
</script>

## Greek Letters

Also supports Greek letters, obviously!

```html
<div>
  <div id="expr1"></div>
  <div id="expr2"></div>
</div>

<script type="module">
  import {
    Expression,
    Fraction,
    toTex
  } from "./javascripts/algebra-0.2.8.esm.js"

  const lambda = new Expression("lambda").add(3).divide(4)
  const Phi = new Expression("Phi").subtract(new Fraction(1, 5)).add(lambda)

  katex.render(lambda.toTex(lambda), expr1)
  katex.render(Phi.toTex(Phi), expr2)
</script>
```

<div>
    <div id="expr1" style="margin-bottom: 0.5em"></div>
    <div id="expr2"></div>
</div>

<script type="module">
import { Expression, Fraction } from "./javascripts/algebra-0.2.8.esm.js"

const lambda = new Expression("lambda").add(3).divide(4);
const Phi = new Expression("Phi").subtract(new Fraction(1, 5)).add(lambda);

katex.render(lambda.toTex(), expr1);
katex.render(Phi.toTex(), expr2);
</script>

This example deliberately uses the ES Module version to contrast it with the UMD
version examples.

Check out the [list of Greek letters available](https://www.sharelatex.com/learn/List_of_Greek_letters_and_math_symbols#Greek_letters).
