var Emitter = require("jupiter").Emitter;
var ConfigParser = require("jupiter").config.ConfigParser;
var LifeBehaviour = require("jupiter").LifeBehaviour;
var PositionBehaviour = require("jupiter").PositionBehaviour;

describe("ConfigParserTest", function() {
	it("write - no behaviours", function() {
		var parser = new ConfigParser();
		var emitter = new Emitter();
		var config = parser.write(emitter);

		assert.isArray(config.behaviours);
		assert.deepEqual(config.behaviours, []);
	});

	it("read", function() {

	});
});
