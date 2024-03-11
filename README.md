# algebra.ts

Copyright 2023 binary poetry gmbh

[![Licensed under MIT License](https://img.shields.io/github/license/remigius42/algebra.ts)](./LICENSE)
[![Build status](https://github.com/remigius42/algebra.ts/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/remigius42/algebra.ts/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/remigius42/algebra.ts/badge.svg?branch=main)](https://coveralls.io/r/remigius42/algebra.ts?branch=main)

`algebra.ts` lets you build, display and solve algebraic equations in TypeScript
and JavaScript.

It's a fork of [algebra.js](https://github.com/nicolewhite/algebra.js) created
by [Nicole White](https://github.com/nicolewhite/) and you can find the original
copyright and license file in [LICENSE_algebra-js](./LICENSE_algebra-js).

## Quick Start

This section gives a brief example on how to use the library. The library is
assumed to be in the same directory as the HTML page containing the snippet.

Please refer to the [full
documentation](https://remigius42.github.io/algebra.ts/) for further information
and live examples.

### Using ES Modules

```html
<script type="module">
  import { Expression, Equation } from "algebra-x.y.z.esm.min.js"

  const expr = new Expression("x")
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
<script src="algebra-x.y.z.umd.min.js"></script>

<script>
  const expr = new algebra.Expression("x")
  expr = expr.subtract(3)
  expr = expr.add("x")
  console.log(String(expr)) // 2x - 3

  const eq = new algebra.Equation(expr, 4)
  console.log(String(eq)) // 2x - 3 = 4

  const x = eq.solveFor("x")
  console.log("x = " + String(x)) // x = 7/2
</script>
```

## Contributing

Thanks for your interest in contributing! There are many ways to contribute to
this project. Get started by having a look at
[CONTRIBUTING.md](./CONTRIBUTING.md).

## Funding

This project is powered by coffee, therefore I would appreciate if you could

<a href="https://www.buymeacoffee.com/remigius" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

thank you!
