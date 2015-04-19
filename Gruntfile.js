module.exports = function(grunt) {

	grunt.initConfig({
		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				}
			},
			core: {
				files: {
					"bin/jupiter_core.js": ["src/**/*.js"]
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
			all: ["Gruntfile.js", "src/**/*.js", "test/src/**/*.js", "!test/runner/**/*"],
			options: {
				jshintrc: ".jshintrc"
			}
		},
		clean: {
			core: ["bin/**/*"]
		}
	});

	grunt.registerTask("default", ["jshint", "clean", "browserify", "exorcise"]);

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-exorcise");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-clean");
};