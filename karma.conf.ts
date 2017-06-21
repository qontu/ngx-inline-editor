module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      "base.spec.ts",
      "src/**/*.*(ts|html)",
    ],
    preprocessors: {
      "**/*.ts": ["karma-typescript"],
    },
    customLaunchers: {
      Chrome_with_debugging: {
        base: "Chrome",
        flags: ["--remote-debugging-port=9222"],
        debug: true,
      },
    },
    browserNoActivityTimeout: 100000,
    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.spec.json",
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/,
        transforms: [
          require("karma-typescript-angular2-transform"),
        ],
      },
      // compilerOptions: {
      //  target: "es6",
      //  outDir: "./tmp/src",
      //  lib: ["es6", "dom", "es2017.object"],
      // },
    },
    reporters: ["progress", "karma-typescript"],
    browsers: ["Chrome"],
  });
};
