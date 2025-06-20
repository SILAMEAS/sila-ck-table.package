import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    external: [
      "react",
      "react-dom",
      "@emotion/react",
      "@emotion/cache",
      "@emotion/styled",
      /@mui\/*/,
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs({
        include: /node_modules/,
        requireReturnsDefault: "auto", // <-- Important fix here
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        allowImportingTsExtensions: true,
        noEmit: true,
      }),
      terser(),
      postcss(),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: packageJson.types }],
    external: [/\.css$/],
    plugins: [dts.default()],
  },
];
