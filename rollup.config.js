import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/viewpoint.esm.js",
      format: "esm", // ES Module
      sourcemap: true
    },
    {
      file: "dist/viewpoint.cjs.js",
      format: "cjs", // CommonJS for Node
      sourcemap: true
    },
    {
      file: "dist/viewpoint.umd.js",
      format: "umd", // Browser global
      name: "ViewPoint",
      sourcemap: true
    }
  ],
  plugins: [resolve(), commonjs(), terser()]
};