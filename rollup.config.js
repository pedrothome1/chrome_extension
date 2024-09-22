import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import babel from "@rollup/plugin-babel"
import replace from "@rollup/plugin-replace"
import copy from "rollup-plugin-copy"
import postcss from "rollup-plugin-postcss"

const plugins = [
  resolve({
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".mjs", ".node"],
  }),
  typescript(),
  commonjs(),
  postcss(),
  babel({
    babelrc: false,
    babelHelpers: "bundled",
    exclude: "node_modules/**",
    presets: ["@babel/preset-react"],
    extensions: [".js", ".jsx"],
    compact: false,
  }),
  replace({
    preventAssignment: true,
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  }),
]

export default [
  {
    input: "src/content/index.ts",
    output: {
      file: "dist/content.js",
      format: "iife",
    },
    plugins,
  },
  {
    input: "src/background/index.ts",
    output: {
      file: "dist/background.js",
      format: "iife",
    },
    plugins,
  },
  {
    input: "src/popup/main.tsx",
    output: {
      file: "dist/popup.js",
      format: "iife",
    },
    plugins: [
      ...plugins,
      copy({
        targets: [
          {src: "manifest.json", dest: "dist"},
          {src: "src/popup/popup.html", dest: "dist"},
          {src: "assets/*", dest: "dist/assets"},
        ],
      }),
    ],
  },
]
