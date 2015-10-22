var Emitter = require("jupiter").Emitter;

describe("EmitterTest", function() {

	it("ability to set duration", function() {

		//todo: fix this test
		var emitter = new Emitter();

		emitter.duration.maxTime = 2;
		assert.equal(emitter.duration.maxTime, 2, "duration equals 2");

		emitter.duration.maxTime = 10;
		assert.equal(emitter.duration.maxTime, 10, "duration equals 10");
	});

	it("shouldn't never end when duration equals -1", function() {
		//todo: fix this test

		var emitter = new Emitter();
		emitter.duration.maxTime = -1;
		assert.notOk(emitter.duration.isTimeElapsed());
	});

});
