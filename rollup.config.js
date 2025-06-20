import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

const externalDeps = [
  ...Object.keys(packageJson.peerDependencies || {}),
  "@emotion/react",
  "@emotion/cache",
  "@emotion/styled",
];

const external = (id) => {
  return (
    externalDeps.some((dep) => id === dep || id.startsWith(dep + "/")) ||
    id.startsWith("@mui/")
  );
};

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    external,
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs({
        include: /node_modules/,
        requireReturnsDefault: "auto",
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: true,
        declaration: false,
      }),
      postcss({
        extensions: [".css"],
        inject: false,
        extract: false,
      }),
      terser(),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: packageJson.types, format: "es" }],
    plugins: [dts.default()],
  },
];
