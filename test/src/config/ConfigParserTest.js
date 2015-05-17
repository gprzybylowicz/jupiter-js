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
		var config = {behaviours: [], emitController: {_maxLife: 1, _maxParticles: 1}};
		var emitter = parser.read(config);

		assert.instanceOf(emitter, Emitter);
		assert.deepEqual(emitter.behaviours.getAll(), []);
	});

	it("read - with behaviours", function() {
		var parser = new ConfigParser();
		var config = {behaviours: [], emitController: {_maxLife: 1, _maxParticles: 1}};

		config.behaviours.push(new LifeBehaviour().getConfigParser().write());
		config.behaviours.push(new PositionBehaviour().getConfigParser().write());
		config.behaviours.push(new ColorBehaviour().getConfigParser().write());
		var emitter = parser.read(config);

		assert.equal(emitter.behaviours.getAll().length, 3);
		assert.instanceOf(emitter.behaviours.getAll()[0], LifeBehaviour);
		assert.instanceOf(emitter.behaviours.getAll()[1], PositionBehaviour);
		assert.instanceOf(emitter.behaviours.getAll()[2], ColorBehaviour);
	});

	it("write - emit controller", function() {
		var parser = new ConfigParser();
		var emitter = new Emitter();
		emitter.emitController.maxParticles = 20;
		emitter.emitController.maxLife = 2.2;
		var config = parser.write(emitter);

		assert.equal(config.emitController._maxParticles, 20);
		assert.equal(config.emitController._maxLife, 2.2);
	});

	it("read - emit controller", function() {
		var parser = new ConfigParser();
		var config = {behaviours: [], emitController: {_maxLife: 2.25, _maxParticles: 159}};
		var emitter = parser.read(config);

		assert.equal(emitter.emitController._maxParticles, 159);
		assert.equal(emitter.emitController._maxLife, 2.25);
	});
});
