var Duration = require("jupiter").Duration;

describe("DurationTest", function() {

	it("default max time is - 1", function() {
		var durationGuard = new Duration();
		assert.equal(durationGuard.maxTime, -1);
	});

	it("maxTime to set to custom value", function() {
		var durationGuard = new Duration();

		durationGuard.maxTime = 23;
		assert.equal(durationGuard.maxTime, 23, "duration equals 23");

		durationGuard.maxTime = 0.5;
		assert.equal(durationGuard.maxTime, 0.5, "duration equals 0.5");
	});

	it("isTimeElapsed false when default value", function() {
		var durationGuard = new Duration();
		assert.notOk(durationGuard.isTimeElapsed(), "false when new maxTime never has been changed");

		durationGuard.duration = 20;
		durationGuard.reset();
		assert.notOk(durationGuard.isTimeElapsed(), "false after reset");
	});

	it("isTimeElapsed true only when elapsed time larger or equal then maxTime", function() {
		var durationGuard = new Duration();

		durationGuard.maxTime = 3;
		durationGuard.update(0.5);
		assert.notOk(durationGuard.isTimeElapsed(), "false after 0.5 sec elapsed");

		durationGuard.update(1.0);
		assert.notOk(durationGuard.isTimeElapsed(), "false after 1.5 sec elapsed");

		durationGuard.update(1.5);
		assert.ok(durationGuard.isTimeElapsed(), "true when 3.0 sec elapsed");

		durationGuard.update(20);
		assert.ok(durationGuard.isTimeElapsed(), "true when more than 3.0 sec elapsed");
	});

	it("reset to elapse Time", function() {
		var durationGuard = new Duration();

		durationGuard.maxTime = 1;
		durationGuard.update(10);
		assert.ok(durationGuard.isTimeElapsed(), "true before reset");

		durationGuard.reset();
		assert.notOk(durationGuard.isTimeElapsed(), "false after reset");
	});

});
