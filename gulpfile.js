var del = require("del");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var glob = require("glob");
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var gulp = require("gulp");
var minimist = require('minimist');
var watchify = require('watchify');
var watch = require('gulp-watch');

var options = minimist(process.argv.slice(2));

gulp.task("clean", function() {
	del(["bin/*"]);
});

gulp.task("browserify:require", function() {
	var b = browserify({
		entries: "./src/index.js",
		debug: true
	});

	return b.bundle()
		.pipe(source("./src/index.js"))
		.pipe(rename("jupiter.require.js"))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true})).on("error", gutil.log)
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("./bin"))
});

gulp.task("browserify:test", function() {
	var test = options.test || "*";
	var files = glob.sync("./test/src/**/" + test + ".js");
	var b = browserify({
		entries: files.concat(["./test/src/index.js"]),
		insertGlobals: true
	});

	b = watchify(b);

	return b.require("./src/index.js", {expose: "jupiter"})
		.bundle()
		.pipe(source("./test/src/ParticleTest.js"))
		.pipe(rename("index.test.js"))
		.pipe(buffer())
		.pipe(gulp.dest("./test/bin/"));
});

gulp.task("mocha", ["browserify:test"], function() {
	return gulp.src(['./test/bin/index.test.js'], {read: false})
		.pipe(mocha({
			reporter: 'spec'
		}));
});

gulp.task("build", ["clean", "browserify:require"]);
gulp.task("test", ["mocha"]);

gulp.task("test:watch", function() {
	watch(["./src/**/*.js", "./test/src/**/*.js"], function() {
		gulp.start("test");
	});
});
