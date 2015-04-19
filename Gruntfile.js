var ip = require("ip");
var remapify = require("remapify");

var config = {};
config.port = 8888;
config.host = ip.address();
config.path = "http://" + ip.address() + ":" + config.port;

module.exports = function(grunt) {

	grunt.initConfig({
		connect: {
			server: {
				options: {
					hostname: config.host,
					port: config.port,
					livereload: 35729
				}
			}
		},
		watch: {
			jupiter: {
				files: ["src/**/*.js", "test/src/**/*.js"],
				tasks: ["build", "test"],
				options: {
					livereload: true
				}
			}
		},
		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				},
				preBundleCB: function(b) {
					b.plugin(remapify, [
						{cwd: "./src/model", src: "**/*.js", expose: "model"},
						{cwd: "./src/util/", src: "**/*.js", expose: "util"}
					]);
				}
			},
			core: {
				files: {
					"bin/jupiter_core.js": ["src/**/*.js"]
				}
			},
			test: {
				files: {
					"test/runner/tests.js": ["bin/jupiter_core.js", "test/src/**/*.js"]
				}
			}
		},
		exorcise: {
			core: {
				options: {
					root: "../"
				},
				files: {
					"bin/jupiter_core.js.map": ["bin/jupiter_core.js"]
				}
			}
		},
		jshint: {
			all: ["!Gruntfile.js", "src/**/*.js", "test/src/**/*.js", "!test/runner/**/*"],
			options: {
				jshintrc: ".jshintrc"
			}
		},
		clean: {
			core: ["bin/**/*"]
		},
		mocha: {
			test: {
				options: {
					run: true,
					log: true,
					logErrors: true,
					urls: [config.path + "/test/runner/"]
				}

			}
		},
	});

	grunt.registerTask("default", [
		"connect",
		"watch"
	]);

	grunt.registerTask("build", [
		"jshint",
		"clean",
		"browserify:core",
		"exorcise"
	]);

	grunt.registerTask("test", [
		"jshint",
		"browserify:core",
		"browserify:test",
		"mocha"
	]);

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-exorcise");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-mocha");
};