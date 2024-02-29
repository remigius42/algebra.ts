import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"
import pkg from "./package.json" assert { type: "json" }

const formats = ["esm", "umd"]
const compact = [false, true]

export default compact.flatMap(compact =>
  formats.map(format => ({
    input: "algebra.js",
    output: {
      file: `build/algebra-${pkg.version}.${format}${compact ? ".min" : ""}.js`,
      name: "algebra",
      format
    },
    plugins: [commonjs(), compact ? terser() : undefined]
  }))
)
