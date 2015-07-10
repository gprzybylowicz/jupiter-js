var EmitterParser = require("jupiter").EmitterParser;
var Emitter = require("jupiter").Emitter;
var LifeBehaviour = require("jupiter").LifeBehaviour;
var PositionBehaviour = require("jupiter").PositionBehaviour;
var ColorBehaviour = require("jupiter").ColorBehaviour;

describe("EmitterParserTest", function() {

	it("read empty config", function() {
		var parser = new EmitterParser(new Emitter());
		var config = parser.write();

		assert.isArray(config.behaviours);
		assert.deepEqual(config.behaviours, []);
	});

	it("write - with behaviours", function() {
		var emitter = new Emitter();
		var parser = new EmitterParser(emitter);

		emitter.behaviours.add(new LifeBehaviour());
		emitter.behaviours.add(new PositionBehaviour());
		var config = parser.write(emitter);

		var target = [{}, {}];
		target[1] = new PositionBehaviour().getParser().write();
		target[0] = new LifeBehaviour().getParser().write();

		assert.deepEqual(config.behaviours, target);
	});

	it("read - return emitter", function() {
		var emitter = new Emitter();
		var parser = new EmitterParser(emitter);

		var config = {behaviours: [], emitController: {_maxLife: 1, _maxParticles: 1}};
		assert.ok(parser.read(config) === emitter);
	});

	it("read - no behaviours", function() {
		var emitter = new Emitter();
		var parser = new EmitterParser(emitter);
		parser.read({behaviours: [], emitController: {_maxLife: 1, _maxParticles: 1}});

		assert.deepEqual(emitter.behaviours.getAll(), []);
		assert.ok(emitter.behaviours.isEmpty());
	});

	it("read - with behaviours", function() {
		var parser = new EmitterParser(new Emitter());
		var config = {behaviours: [], emitController: {_maxLife: 1, _maxParticles: 1}};

		config.behaviours.push(new LifeBehaviour().getParser().write());
		config.behaviours.push(new PositionBehaviour().getParser().write());
		config.behaviours.push(new ColorBehaviour().getParser().write());
		var emitter = parser.read(config);

		assert.equal(emitter.behaviours.getAll().length, 3);
		assert.instanceOf(emitter.behaviours.getAll()[0], LifeBehaviour);
		assert.instanceOf(emitter.behaviours.getAll()[1], PositionBehaviour);
		assert.instanceOf(emitter.behaviours.getAll()[2], ColorBehaviour);
	});

	it("write - emit controller", function() {
		var emitter = new Emitter();
		var parser = new EmitterParser(emitter);
		emitter.emitController.maxParticles = 20;
		emitter.emitController.maxLife = 2.2;
		var config = parser.write();

		assert.equal(config.emitController._maxParticles, 20);
		assert.equal(config.emitController._maxLife, 2.2);
	});

	it("read - emit controller", function() {
		var parser = new EmitterParser(new Emitter());
		var config = {behaviours: [], emitController: {_maxLife: 2.25, _maxParticles: 159}};
		var emitter = parser.read(config);

		assert.equal(emitter.emitController._maxParticles, 159);
		assert.equal(emitter.emitController._maxLife, 2.25);
	});
});
