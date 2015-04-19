var ParticlePool = require("util/ParticlePool");

describe("ParticlePoolTest", function() {

	var spy = null;
	var pool = null;

	beforeEach(function() {
		pool = new ParticlePool();
		spy = sinon.spy(pool, "create");
	});

	afterEach(function() {
		spy.restore();
	});

	it("should create one instance of Particle", function() {
		pool.pop();
		assert.ok(spy.calledOnce);
	});

	it("should create two instances of Particle", function() {
		pool.pop();
		pool.pop();
		assert.ok(spy.calledTwice);
	});

	it("should have one instance of Particle after pop/push/pop", function() {
		var particle = pool.pop();
		pool.push(particle);
		pool.pop();
		assert.ok(spy.calledOnce);
	});

	it("should have two instance of Particle after sequence of pop/push", function() {

		var particle1, particle2;
		for (var i = 0; i < 10; i++) {
			particle1 = pool.pop();
			particle2 = pool.pop();

			pool.push(particle1);
			pool.push(particle2);
		}
		assert.ok(spy.calledTwice);
	});

	it("should return the same instance of particle", function() {
		var particle = pool.pop();
		var previous = particle;
		pool.push(particle);

		for (var i = 0; i < 10; i++) {
			particle = pool.pop();
			assert.deepEqual(previous, particle);

			previous = particle;
			pool.push(particle);
		}
	});

});
