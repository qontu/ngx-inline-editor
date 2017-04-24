import { task, src, dest, watch } from "gulp";
import * as runSequence from "run-sequence";
import * as path from "path";
import * as del from "del";
import { main as ngc } from "@angular/compiler-cli/src/main";

const rollup = require("gulp-rollup");
const inlineNg2Template = require("gulp-inline-ng2-template");

const rootFolder = path.join(__dirname);
const srcFolder = path.join(rootFolder, "src");
const tmpFolder = path.join(rootFolder, ".tmp");
const buildFolder = path.join(rootFolder, "build");
const distFolder = path.join(rootFolder, "dist");

/**
 * 1. Delete /dist folder
 */
task("clean:dist", function () {
    return deleteFolders([distFolder]);
});

/**
 * 2. Clone the /src folder into /.tmp and Inline template (.html) and style (.css) files
 *    into the the component .ts files. We do this on the /.tmp folder to avoid editing
 *    the original /src files. If an npm link inside /src has been made,
 *    then it's likely that a node_modules folder exists. Ignore this folder
 *    when copying to /.tmp.
 */
task("copy:source", function () {
    return src([`${srcFolder}/**/*`, `!${srcFolder}/node_modules`])
        .pipe(inlineNg2Template({
            base: srcFolder,
            target: "es5",
            useRelativePaths: true,
            removeLineBreaks: true,
        }))
        .pipe(dest(tmpFolder));
});


/**
 * 3. Run the Angular compiler, ngc, on the /.tmp folder. This will output all
 *    compiled modules to the /build folder.
 */
task("ngc", function () {
    return ngc({
        project: `${tmpFolder}/tsconfig.json`,
    })
        .then((exitCode) => {
            if (exitCode === 1) {
                // This error is caught in the 'compile' task by the runSequence method callback
                // so that when ngc fails to compile, the whole compile process stops running
                throw new Error("ngc compilation failed");
            }
        });
});

/**
 * 4. Run rollup inside the /build folder to generate our Flat ES module and place the
 *    generated file into the /dist folder
 */
task("rollup", function () {
    return src(`${buildFolder}/**/*.js`)
        // transform the files here.
        .pipe(rollup({
            // any option supported by Rollup can be set here.
            entry: `${buildFolder}/index.js`,
            external: [
                "@angular/core",
                "@angular/common",
                "@angular/forms",
            ],
            format: "es",
        }))
        .pipe(dest(distFolder));
});

/**
 * 5. Copy all the files from /build to /dist, except .js files. We ignore all .js from /build
 *    because with don't need individual modules anymore, just the Flat ES module generated
 *    on step 5.
 */
task("copy:build", function () {
    return src([`${buildFolder}/**/*`, `!${buildFolder}/**/*.js`])
        .pipe(dest(distFolder));
});

/**
 * 6. Copy package.json from /src to /dist
 */
task("copy:manifest", function () {
    return src([`${rootFolder}/package.json`])
        .pipe(dest(distFolder));
});

/**
 * 7. Delete /.tmp folder
 */
task("clean:tmp", function () {
    return deleteFolders([tmpFolder]);
});

/**
 * 8. Delete /build folder
 */
task("clean:build", function () {
    return deleteFolders([buildFolder]);
});

task("compile", function () {
    runSequence(
        "clean:dist",
        "copy:source",
        "ngc",
        "rollup",
        "copy:build",
        "copy:manifest",
        "clean:build",
        "clean:tmp",
        function (err?: any) {
            if (err) {
                console.log("ERROR:", err.message);
                deleteFolders([distFolder, tmpFolder, buildFolder]);
            } else {
                console.log("Compilation finished succesfully");
            }
        });
});

/**
 * Watch for any change in the /src folder and compile files
 */
task("watch", function () {
    watch(`${srcFolder}/**/*`, ["compile"]);
});

task("clean", ["clean:dist", "clean:tmp", "clean:build"]);

task("build", ["clean", "compile"]);
task("build:watch", ["build", "watch"]);
task("default", ["build:watch"]);

/**
 * Deletes the specified folder
 */
function deleteFolders(folders: any) {
    return del(folders);
}
