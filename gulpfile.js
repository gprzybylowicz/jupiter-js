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
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var header = require('gulp-header');
var fs = require('fs');
var path = require('path');
var headerText = fs.readFileSync(path.join(__dirname, 'header.txt'), 'utf8');
var licenseText = fs.readFileSync(path.join(__dirname, 'LICENSE'), 'utf8');

var options = minimist(process.argv.slice(2));

function getBuildType() {
	var rendererType = options.renderer || "default";

	var types = {
		default: {src: "./src/engine/index.js", bin: "./bin", name: "jupiter.js"},
		pixi: {src: "./src/renderer/pixi/index.js", bin: "./bin/pixi", name: "jupiter_pixi.js"}
	};

	return types[rendererType];
}

console.log("BUILD TYPE DATA", getBuildType());

gulp.task("clean", function() {
	var build = getBuildType();
	del([build.bin + "/*.js", build.bin + "/*.map"]);
});

gulp.task('jshint', function() {
	return gulp.src(['./src/**/*.js'])
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

gulp.task("browserify:standalone", ["jshint"], function() {
	var build = getBuildType();

	var b = browserify({
		entries: build.src,
		debug: true,
		standalone: "jupiter"
	});

	return b.bundle()
		.pipe(source(build.src))
		.pipe(rename(build.name))
		.pipe(buffer())
		.pipe(header(headerText, {
				licenseText: licenseText,
				date: new Date().toISOString()
			}
		))
		.pipe(sourcemaps.init({loadMaps: true})).on("error", gutil.log)
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(build.bin))
});

gulp.task("browserify:test", ["jshint"], function() {
	var test = options.test || "*";
	var files = glob.sync("./test/src/**/" + test + ".js");
	//var files = files.concat(glob.sync("./src/*.js"));
	var b = browserify({
		entries: files.concat(["./test/src/index.js"]),
		insertGlobals: true
	});

	return b.require("./src/engine/index.js", {expose: "jupiter"})
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

gulp.task("build", function(done) {
	runSequence("clean", "browserify:standalone", done);
});

gulp.task("test", ["mocha"]);

gulp.task("test-watch", function() {
	gulp.start("test");
	watch(["./src/**/*.js", "./test/src/**/*.js"], function() {
		gulp.start("test");
	});
});
