import banner from "@guchho/banner";

const sharedOutputOptions = {
  entry: "ViewPoint.js",
  target: "esnext",
  bundle: true,
  sourcemap: true,
  treeShaking: true,
  exports: "none"
}

export default [
  {
    build: {
      ...sharedOutputOptions,
      outfile: "dist/viewpoint.esm.js",
      format: "esm",
      minify: false
    },
    plugins: [
      banner({
        style: "long",
        packageJson: "./package.json",
      })
    ]
  },
  {
    build: {
      ...sharedOutputOptions,
      outfile: "dist/viewpoint.cjs.cjs",
      format: "cjs",
      minify: false
    },
    plugins: [
      banner({
        style: "long",
        packageJson: "./package.json",
      })
    ]
  },
  {
    build: {
      ...sharedOutputOptions,
      outfile: "dist/viewpoint.js",
      name: "viewpoint",
      format: "umd",
      minify: false
    },
    plugins: [
      banner({
        style: "long",
        packageJson: "./package.json",
      })
    ]
  },
  {
    build: {
      ...sharedOutputOptions,
      outfile: "dist/viewpoint.min.js",
      name: "viewpoint",
      format: "umd",
      minify: true
    },
    plugins: [
      banner({
        style: "short",
        packageJson: "./package.json",
      })
    ]
  }
];
