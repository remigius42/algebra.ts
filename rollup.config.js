import { babel } from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import typescript from "@rollup/plugin-typescript"
import pkg from "./package.json" assert { type: "json" }

const formats = ["esm", "umd"]
const compact = [false, true]

export default compact.flatMap(compact =>
  formats.map(format => ({
    input: "algebra.ts",
    output: {
      file: `build/algebra-${pkg.version}.${format}${compact ? ".min" : ""}.js`,
      name: "algebra",
      format
    },
    plugins: [
      typescript({ noEmitOnError: true }),
      commonjs(),
      nodeResolve(),
      babel({
        babelHelpers: "bundled",
        exclude: [/core-js/],
        extensions: [".ts"]
      }),
      compact ? terser() : undefined
    ]
  }))
)
