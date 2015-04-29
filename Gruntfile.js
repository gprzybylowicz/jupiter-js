var ip = require("ip");

var config = {};
config.port = 8888;
config.host = ip.address();
config.path = "http://" + ip.address() + ":" + config.port;

module.exports = function(grunt) {

	grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
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
					files: ["src/**/*.js"],
					tasks: ["build"],
					options: {
						livereload: true
					}
				},
				test: {
					files: ["test/src/**/*.js"],
					tasks: ["test"],
					options: {
						livereload: true
					}
				}
			},
			browserify: {
				standalone: {
					src: ["src/index.js"],
					dest: "./bin/jupiter.standalone.js",
					options: {
						browserifyOptions: {
							debug: true,
							standalone: "jupiter"
						}
					}
				},
				require: {
					src: ["src/index.js"],
					dest: "./bin/jupiter.require.js",
					options: {
						preBundleCB: function(b) {
							b.require("./src/index.js", {expose: 'jupiter'});
						}
					}
				},
				test: {
					src: ["test/src/**/*.js"],
					dest: "./test/runner/index.test.js",
					options: {
						external: ["jupiter"]
					}
				}

			},
			exorcise: {
				core: {
					options: {
						root: "../"
					}
					,
					files: {
						"bin/jupiter.standalone.js.map": ["bin/jupiter.standalone.js"]
					}
				}
			}
			,
			jshint: {
				all: ["!Gruntfile.js", "src/**/*.js", "test/src/**/*.js", "!test/runner/**/*"],
				options: {
					jshintrc: ".jshintrc"
				}
			}
			,
			clean: {
				core: ["bin/**/*"]
			}
			,
			mocha: {
				test: {
					options: {
						run: true,
						log: true,
						logErrors: true,
						require:"./bin/jupiter.require.js",
						clearRequireCache: true,
						urls: [config.path + "/test/runner/"]
					}

				}
			}
		}
	)
	;

	grunt.registerTask("default", [
		"connect",
		"watch"
	]);

	grunt.registerTask("build", [
		"jshint",
		"clean",
		"browserify:standalone",
		"browserify:require",
		"exorcise"
	]);

	grunt.registerTask("test", [
		"jshint",
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
}
;