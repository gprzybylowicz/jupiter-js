var Test = require("jupiter").Test;
//var Emitter = require("jupiter").Emitter;
//var LifeBehaviour = require("jupiter").LifeBehaviour;
//var PositionBehaviour = require("jupiter").PositionBehaviour;

describe("TestTest", function() {

	it("write - no behaviours", function() {
		var parser = new Test();
		//var emitter = new Emitter();
		//var config = parser.write(emitter);

		//assert.isArray(config.behaviours);
		//assert.deepEqual(config.behaviours, []);
	});
	//
	//it("write - with behaviours", function() {
	//	var parser = new ConfigParser();
	//	var emitter = new Emitter();
	//	emitter.behaviours.add(new LifeBehaviour());
	//	emitter.behaviours.add(new PositionBehaviour());
	//	var config = parser.write(emitter);
	//
	//	var target = [{}, {}];
	//	new LifeBehaviour().getConfigParser().write(target[1]);
	//	new PositionBehaviour().getConfigParser().write(target[0]);
	//
	//	assert.deepEqual(config.behaviours, target);
	//});
	//
	//it("read - no behaviours", function() {
	//	var parser = new ConfigParser();
	//	var config = {behaviours: []};
	//	var emitter = parser.read(config);
	//
	//	assert.instanceOf(emitter, Emitter);
	//	assert.deepEqual(emitter.behaviours.getAll(), []);
	//});
	//
	//it("read - with behaviours", function() {
	//	var parser = new ConfigParser();
	//	var behaviours = [{}, {}];
	//	new LifeBehaviour().getConfigParser().write(behaviours[0]);
	//	new PositionBehaviour().getConfigParser().write(behaviours[1]);
	//	var emitter = parser.read({behaviours: behaviours});
	//
	//
	//	assert.equal(emitter.behaviours.getAll().length, 2);
	//});
});
