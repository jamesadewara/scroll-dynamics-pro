import { readFileSync } from "fs";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

const packageJson = JSON.parse(readFileSync("./package.json"));

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
      banner: "'use client';",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
      banner: "'use client';",
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    terser(),
  ],
  external: ["react", "react-dom"],
};
