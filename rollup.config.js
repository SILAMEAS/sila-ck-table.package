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
        exports: "named", // important for named exports
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],

    // Mark peer dependencies and important libs external so Rollup doesn't bundle them
    external: (id) =>
      [
        "react",
        "react-dom",
        "@emotion/react",
        "@emotion/cache",
        "@emotion/styled",
        // MUI packages regex - exclude all @mui/*
      ].some((dep) => id === dep || id.startsWith(dep + "/")),

    plugins: [
      peerDepsExternal(), // auto excludes peerDependencies from bundle
      resolve(),
      commonjs({
        include: /node_modules/,
        requireReturnsDefault: "auto", // fix CJS interop
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        // REMOVE noEmit, let rollup emit JS
        // noEmit: true, <-- remove this
        sourceMap: true,
        declaration: false, // declarations handled by rollup-plugin-dts separately
      }),
      postcss({
        extensions: [".css"],
        inject: false, // do not inject CSS into JS bundle, adjust if needed
        extract: false, // set to true if you want to output a separate CSS file
      }),
      terser(),
    ],
  },

  // Types declaration bundle
  {
    input: "src/index.ts",
    output: [{ file: packageJson.types, format: "es" }],
    plugins: [dts.default()],
  },
];
