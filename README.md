# algebra.js 

[![Coverage Status](https://coveralls.io/repos/remigius42/algebra.ts/badge.svg?branch=main)](https://coveralls.io/r/remigius42/algebra.ts?branch=main)

## Quick Start

```js
var expr = new Expression("x");
expr = expr.subtract(3);
expr = expr.add("x");

console.log(expr.toString());
```

```
2x - 3
```

```js
var eq = new Equation(expr, 4);

console.log(eq.toString());
```

```
2x - 3 = 4
```

```js
var x = eq.solveFor("x");

console.log("x = " + x.toString());
```

```
x = 7/2
```

[Read the full documentation at the project site](http://algebra.js.org).

## Install

### Stable Release

#### In Node

```
npm install algebra.js
```

#### In the Browser

Download [algebra.min.js](http://algebra.js.org/javascripts/algebra-0.2.6.min.js).

### Latest Development Release

```
git clone https://github.com/remigius42/algebra.ts.git
cd algebra.ts
```

#### In Node

```js
var algebra = require("./algebra");
```

#### In the Browser

The following will build `algebra.js` in the `build` directory.

```
make bundle
```

The following will build `algebra.min.js` in the `build` directory.

```
make minify
```
