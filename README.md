# algebra.js

Copyright 2023 binary poetry gmbh

[![Licensed under MIT License](https://img.shields.io/github/license/remigius42/algebra.ts)](./LICENSE)
[![Coverage Status](https://coveralls.io/repos/remigius42/algebra.ts/badge.svg?branch=main)](https://coveralls.io/r/remigius42/algebra.ts?branch=main)

`algebra.ts` lets you build, display and solve algebraic equations in TypeScript
and JavaScript.

It's a fork of [algebra.js](https://github.com/nicolewhite/algebra.js) created
by [Nicole White](https://github.com/nicolewhite/) and you can find the original
copyright and license file in [LICENSE_algebra-js](./LICENSE_algebra-js).

## Quick Start

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

Read the [full documentation](https://remigius42.github.io/algebra.ts/) at the
project website.

## Installation

### Stable Release in Node.js

```sh
npm install algebra.ts
```

### Stable Release in the Browser

Download either the ES Module
(`algebra-x.y.z.esm.min.js`) or the UMD (`algebra-x.y.z.umd.min.js`) version
from the [GitHub releases](https://github.com/remigius42/algebra.ts/releases).

### Latest Development Release

```sh
git clone https://github.com/remigius42/algebra.ts.git
cd algebra.ts
```

#### In Node

```js
import {
  parse,
  toTex /* , ... */
} from "algebra.ts/dist/algebra.ts-x.y.z.esm.js"
```

#### In the Browser

The following will build `algebra.ts` in the `dist` directory.

```sh
npm run build
```
