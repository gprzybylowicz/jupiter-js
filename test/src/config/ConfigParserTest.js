var ConfigParser = require("jupiter").ConfigParser;
var Emitter = require("jupiter").Emitter;
var LifeBehaviour = require("jupiter").LifeBehaviour;
var PositionBehaviour = require("jupiter").PositionBehaviour;
var ColorBehaviour = require("jupiter").ColorBehaviour;

describe("ConfigParserTest", function() {

	it("write - no behaviours", function() {
		var parser = new ConfigParser();
		var emitter = new Emitter();
		var config = parser.write(emitter);

		assert.isArray(config.behaviours);
		assert.deepEqual(config.behaviours, []);
	});

	it("write - with behaviours", function() {
		var parser = new ConfigParser();
		var emitter = new Emitter();
		emitter.behaviours.add(new LifeBehaviour());
		emitter.behaviours.add(new PositionBehaviour());
		var config = parser.write(emitter);

		var target = [{}, {}];
		new LifeBehaviour().getConfigParser().write(target[1]);
		new PositionBehaviour().getConfigParser().write(target[0]);

		assert.deepEqual(config.behaviours, target);
	});

	it("read - no behaviours", function() {
		var parser = new ConfigParser();
		var config = {behaviours: []};
		var emitter = parser.read(config);

		assert.instanceOf(emitter, Emitter);
		assert.deepEqual(emitter.behaviours.getAll(), []);
	});

	it("read - with behaviours", function() {
		var parser = new ConfigParser();
		var config = {behaviours: []};
		config.behaviours.push(new LifeBehaviour().getConfigParser().write());
		config.behaviours.push(new PositionBehaviour().getConfigParser().write());
		config.behaviours.push(new ColorBehaviour().getConfigParser().write());
		var emitter = parser.read(config);

		assert.equal(emitter.behaviours.getAll().length, 3);
		assert.instanceOf(emitter.behaviours.getAll()[0], LifeBehaviour);
		assert.instanceOf(emitter.behaviours.getAll()[1], PositionBehaviour);
		assert.instanceOf(emitter.behaviours.getAll()[2], ColorBehaviour);
	});
});
