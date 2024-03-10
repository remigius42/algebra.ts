# algebra.js

[![Coverage Status](https://coveralls.io/repos/remigius42/algebra.ts/badge.svg?branch=main)](https://coveralls.io/r/remigius42/algebra.ts?branch=main)

## Quick Start

```js
const expr = new Expression("x")
expr = expr.subtract(3)
expr = expr.add("x")
console.log(String(expr)) // 2x - 3

const eq = new Equation(expr, 4)
console.log(String(eq)) // 2x - 3 = 4

const x = eq.solveFor("x")
console.log("x = " + String(x)) // x = 7/2
```

[Read the full documentation at the project site](https://remigius42.github.io/algebra.ts/).

## Install

### Stable Release in Node.js

```sh
npm install algebra.js
```

### Stable Release in the Browser

Download [algebra.min.js](http://algebra.js.org/javascripts/algebra-0.2.6.min.js).

### Latest Development Release

```sh
git clone https://github.com/remigius42/algebra.ts.git
cd algebra.ts
```

#### In Node

```js
var algebra = require("./algebra")
```

#### In the Browser

The following will build `algebra.js` in the `build` directory.

```sh
npm run bundle
```

The following will build `algebra.min.js` in the `build` directory.

```sh
npm run minify
```
