import { Config, ConfigOptions } from "karma";
import { KarmaTypescriptConfig } from "karma-typescript/src/api/configuration";

const env = process.env.NODE_ENV || "development";

console.log(`*** Running karma in ${env} mode`);

function isDev(): boolean {
  return env === "development";
}

const reporters = isDev()
  ? ["jasmine-diff", "mocha", "kjhtml", "karma-typescript"]
  : ["jasmine-diff", "mocha", "karma-typescript"];

const browsers = isDev()
  ? ["Chrome"]
  : ["PhantomJS"];

module.exports = function (config: Config) {
  config.set({
    reporters,
    browsers,
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      "base.spec.ts",
      "src/**/*.*(ts|html)",
    ],
    preprocessors: {
      "**/*.ts": ["karma-typescript"],
    },
    browserNoActivityTimeout: 100000,
    karmaTypescriptConfig: {
      coverageOptions: {
        instrumentation: false,
      },
      tsconfig: "./tsconfig.spec.json",
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/,
        transforms: [
          require("karma-typescript-angular2-transform"),
        ],
      },
      compilerDelay: 500,
    } as KarmaTypescriptConfig,
    client: {
      clearContext: false,
    },
  } as ConfigOptions);
};
