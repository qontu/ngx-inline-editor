import { task, src, dest, watch } from "gulp";
import * as rename from "gulp-rename";
import * as changed from "gulp-changed";
import * as runSequence from "run-sequence";
import * as path from "path";
import * as del from "del";
import * as ts from "gulp-typescript";
import * as ngc from "gulp-ngc";
import * as merge from "merge2";
import * as cp from "child_process";

function exec(
    command: string,
    { args = [], output = false }: {
        args?: string[],
        output?: boolean,
    } = {},
): Promise<{ stdout: string, stderr: string }> {
    return new Promise((resolve, reject) => {
        const cmdExecuted = cp.exec(`${command} ${args.join(" ")}`, (error, stdout, stderr) => {
            if (error instanceof Error) {
                reject(error);
            } else {
                resolve({ stdout, stderr });
            }
        });

        if (output) {
            cmdExecuted.stdout.pipe(process.stdout);
            cmdExecuted.stderr.pipe(process.stderr);
        }
    });
}


const rollup = require("gulp-rollup");
const inlineNg2Template = require("gulp-inline-ng2-template");

const ROLLUP_GLOBALS = {
    "@angular/core": "_angular_core",
    "@angular/common": "_angular_common",
    "@angular/forms": "_angular_forms",
};
const ROLLUP_EXTERNAL = Object.keys(ROLLUP_GLOBALS);

const rootFolder = path.join(__dirname);
const srcFolder = path.join(rootFolder, "src");
const tmpFolder = path.join(rootFolder, ".tmp");
const tmpBundlesFolder = path.join(tmpFolder, ".bundles");
const buildFolder = path.join(rootFolder, "build");
const distFolder = path.join(rootFolder, "dist");
const docsFolder = path.join(rootFolder, "docs");
const docsBuildedFolder = path.join(docsFolder, "dist");

const {
    name: libName,
    main: bandleNameUMD,
    module: bundleNameES5,
    es2015: bundleNameES2015,
 } = require("./package.json") as { [key: string]: string };

/**
 * 0. Prepare dist to debug. This copies all files from /src to /dist
 *    and rename inline-editor.module.ts to index.ts, so typescript import works.
 */
task("debug", () => merge(
    src(
        [
            `!${srcFolder}/inline-editor.module.ts`,
            `!${srcFolder}/tsconfig.json`,
            `${srcFolder}/**/*`,
        ])
        .pipe(changed(distFolder))
        .pipe(dest(distFolder)),

    src([`${srcFolder}/inline-editor.module.ts`])
        .pipe(changed(distFolder, { transformPath: () => `${distFolder}/index.ts` } as any))
        .pipe(rename("index.ts"))
        .pipe(dest(distFolder)),
));

/**
 * 1. Clean /dist
 */
/**
 * 1.1 Delete /dist folder
 */
task("clean:dist", () => deleteFolders([distFolder]));
/**
 * 1.2 Delete /dist/* files
 */
task("clean:dist:files", () => deleteFolders([`${distFolder}/*`]));

/**
 * 2. Clone the /src folder into /.tmp and Inline template (.html) and style (.css) files
 *    into the component .ts files. We do this on the /.tmp folder to avoid editing
 *    the original /src files. If an npm link inside /src has been made,
 *    then it's likely that a node_modules folder exists. Ignore this folder
 *    when copying to /.tmp.
 */
task("copy:source", () => src([`${srcFolder}/**/*`])
    .pipe(inlineNg2Template({
        base: srcFolder,
        target: "es5",
        useRelativePaths: true,
        removeLineBreaks: true,
    }))
    .pipe(dest(tmpFolder)),
);


/**
 * 3. Run the Angular compiler, ngc, on the /.tmp folder. This will output all
 *    compiled modules to the /build folder.
 */
task("ngc", () => ngc(`${tmpFolder}/tsconfig.json`));


/**
 * 4. Run rollup inside the /build folder to generate ours Flat ES modules and place the
 *    generated files into the /.tmp/bundles folder.
 *
 * rollup:es2015 -> Create bundle using ES2015 javascript.
 * rollup:es5 -> Using bundle generated from rollup:es2015, transpile to ES5 using tsc.
 * rollup:umd -> Using es5 transpiled code from rollup:es5, re-rollup to bundle as an UMD module.
 */
task("rollup", () => runSequence("rollup:es2015", "rollup:es5", "rollup:umd"));

/**
 * We cached the bundles to use on watch mode.
 */
const rollupES2015Caches = {};

task("rollup:es2015", () => src(`${buildFolder}/**/*.js`)
    .pipe(rollup({
        entry: `${buildFolder}/inline-editor.module.js`,
        external: ROLLUP_EXTERNAL,
        format: "es",
        separateCaches: rollupES2015Caches,
    }))
    .on("bundle", (bundle, name) => {
        rollupES2015Caches[name] = bundle;
    })
    .pipe(rename(bundleNameES2015))
    .pipe(dest(tmpBundlesFolder)),
);

/**
 * We create a TS Project to use incremental compilation feature of gulp-typescript when
 * we use the watch mode.
 */
const tsProject = ts.createProject({
    target: "es5",
    module: "es2015",
    lib: [
        "es2016",
    ],
    allowJs: true,
    typescript: require("typescript"),
});

task("rollup:es5", () => {
    const tsResult = src(`${tmpBundlesFolder}/${bundleNameES2015}`)
        .pipe(tsProject());

    return merge([
        tsResult.js.pipe(rename(bundleNameES5)).pipe(dest(tmpBundlesFolder)),
        // There are not .d.ts files, it can be removed or used
        tsResult.dts.pipe(dest(tmpBundlesFolder)),
    ]);
});

/**
 * We cached the bundles to use on watch mode.
 */
const rollupUMDCaches = {};

task("rollup:umd", () => src(`${tmpBundlesFolder}/${bundleNameES5}`)
    .pipe(rollup({
        entry: `${tmpBundlesFolder}/${bundleNameES5}`,
        globals: ROLLUP_GLOBALS,
        external: ROLLUP_EXTERNAL,
        format: "umd",
        moduleName: libName,
        separateCaches: rollupUMDCaches,
        onwarn(message) {
            if (message.code === "THIS_IS_UNDEFINED") {
                return;
            }

            console.warn(message);
        },
    }))
    .on("bundle", (bundle, name) => {
        rollupUMDCaches[name] = bundle;
    })
    .pipe(rename(bandleNameUMD))
    .pipe(dest(tmpBundlesFolder)),
);


/**
 * 5. Copy all the files from /build to /dist, except .js files. We ignore all .js from /build
 *    because with don't need individual modules anymore, just the modules generated
 *    on step 4.
 *    Copy themes from .tmp/themes to /dist
 */
task("copy:build", () => runSequence("copy:buildTS", "copy:buildCSS"));

task("copy:buildTS", () => src(
    [
        `${buildFolder}/**/*`,
        `!${buildFolder}/**/*.js`,
    ])
    .pipe(dest(distFolder)),
);

task("copy:buildCSS", () => src(
    [
        `${srcFolder}/themes/**/*`,
    ])
    .pipe(dest(`${distFolder}/themes`)),
);

/**
 * 6. Copy bundle files from /.tmp/bundles to /dist. There must be only three javascript files.
 * The files generated on step 4.
 */
task("copy:bundles", () => src(`${tmpBundlesFolder}/*.js`).pipe(dest(distFolder)));


/**
 * 7. Copy package.json and README.md from /src to /dist
 */
task("copy:manifest", () => src([
    `${rootFolder}/package.json`,
    `${rootFolder}/README.md`,
]).pipe(dest(distFolder)));

/**
 * 8. Delete /.tmp folder
 */
task("clean:tmp", () => deleteFolders([tmpFolder]));

/**
 * 9. Delete /build folder
 */
task("clean:build", () => deleteFolders([buildFolder]));

task("compile", () => runSequence(
    "copy:source",
    "ngc",
    "rollup",
    "clean:dist:files",
    "copy:buildTS",
    "copy:buildCSS",
    "copy:bundles",
    "copy:manifest",
    "clean:build",
    "clean:tmp",
    (err?: any) => {
        if (err) {
            console.log("ERROR:", err.message);
            deleteFolders([distFolder, tmpFolder, buildFolder]);
        } else {
            console.log("Compilation finished succesfully");
        }
    }),
);


task("compile:debug", () => runSequence(
    "clean:dist:files",
    "copy:manifest",
    "debug",
    (err?: any) => {
        if (err) {
            console.log("ERROR:", err.message);
            deleteFolders([distFolder]);
        } else {
            console.log("Compilation finished succesfully");
        }
    }),
);

task("clean:docs", () => deleteFolders([docsBuildedFolder]));

task("build:docs", ["clean:docs"], done => {
    exec(`cd ${docsFolder} && hugo -d ${docsBuildedFolder}`)
        .then(({ stdout, stderr }) => {
            console.log(stdout);
            console.error(stderr);

            done();
        })
        .catch(done);
});

/**
 * Watch for any change in the /src folder and compile files
 */
task("watch", ["compile"], () => watch(`${srcFolder}/**/*`, ["compile"]));
task("watch:debug", ["compile:debug"], () => watch(`${srcFolder}/**/*`, ["debug"]));

task("clean", ["clean:dist", "clean:tmp", "clean:build"]);

task("build", ["clean", "compile"]);
task("build:watch", ["build", "watch"]);
task("default", ["build:watch"]);

/**
 * Deletes the specified folder
 */
function deleteFolders(folders: string | string[]) {
    return del(folders);
}
