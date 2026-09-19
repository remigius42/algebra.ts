# algebra.ts

Copyright 2024 binary poetry gmbh

[![Licensed under MIT License](https://img.shields.io/github/license/remigius42/algebra.ts)](./LICENSE)
[![Build status](https://github.com/remigius42/algebra.ts/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/remigius42/algebra.ts/actions/workflows/node.js.yml)
![Current version](https://img.shields.io/github/package-json/v/remigius42/algebra.ts)
[![Coverage Status](https://coveralls.io/repos/remigius42/algebra.ts/badge.svg?branch=main)](https://coveralls.io/r/remigius42/algebra.ts?branch=main)

`algebra.ts` lets you build, display and solve algebraic equations in TypeScript
and JavaScript.

## Scope

`algebra.ts` covers the algebra you would otherwise do by hand: exact fraction
arithmetic, expressions in one or more variables, linear, quadratic and cubic
equations, and linear inequations. Answers stay exact, so solving `2x - 3 = 4`
gives you `7/2` rather than `3.5`, and everything can be rendered as LaTeX. The
library has no runtime dependencies and the minified ES Module is about 58 KB,
which makes it a good fit for the browser and for embedding in teaching
material.

It is deliberately not a computer algebra system. There is no calculus, no
matrices, no trigonometric simplification, no LaTeX input and no command line
interface.

## Quick Start

This section gives a brief example on how to use the library. The library is
assumed to be in the same directory as the HTML page containing the snippet.
Alternatively you could load the library via a content delivery network (CDN),
for example
<https://cdn.jsdelivr.net/npm/algebra.ts@0.5.0/dist/algebra.umd.js>.

Please refer to the [full
documentation](https://remigius42.github.io/algebra.ts/) for further information
and live examples.

### Using ES Modules

```html
<script type="module">
  import { Expression, Equation } from "./algebra.esm.min.js"

  let expr = new Expression("x")
  expr = expr.subtract(3)
  expr = expr.add("x")
  console.log(String(expr)) // 2x - 3

  const eq = new Equation(expr, 4)
  console.log(String(eq)) // 2x - 3 = 4

  const x = eq.solveFor("x")
  console.log("x = " + String(x)) // x = 7/2
</script>
```

### Using the UMD version

```html
<script src="algebra.umd.min.js"></script>

<script>
  let expr = new algebra.Expression("x")
  expr = expr.subtract(3)
  expr = expr.add("x")
  console.log(String(expr)) // 2x - 3

  const eq = new algebra.Equation(expr, 4)
  console.log(String(eq)) // 2x - 3 = 4

  const x = eq.solveFor("x")
  console.log("x = " + String(x)) // x = 7/2
</script>
```

## Alternatives

If you need something outside the [scope](#scope) above, have a look at the
[Cortex Compute Engine](https://github.com/cortex-js/compute-engine), which
covers far more ground and also ships a command line interface:

```sh
npx @cortex-js/compute-engine -e 'Solve(2x - 3 = 4, x)'
```

## History

`algebra.ts` is a fork of
[algebra.js](https://github.com/nicolewhite/algebra.js) created by [Nicole
White](https://github.com/nicolewhite/) and you can find the original copyright
and license file in [LICENSE_algebra-js](./LICENSE_algebra-js).

## Contributing

Thanks for your interest in contributing! There are many ways to contribute to
this project. Get started by having a look at
[CONTRIBUTING.md](./CONTRIBUTING.md).

## Funding

This project is powered by coffee, therefore I would appreciate if you could

<a href="https://www.buymeacoffee.com/remigius" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="60" width="217" alt="Buy Me A Coffee" /></a>

thank you!
