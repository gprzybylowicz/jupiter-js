var Particle = require("Particle");

describe("ParticleTest", function() {

	it("UID generation", function() {
		assert.equal(new Particle().uid, Particle._UID.value - 1);
		assert.equal(new Particle().uid, Particle._UID.value - 1);
		assert.equal(new Particle().uid, Particle._UID.value - 1);
	});

	it("UID is unique", function() {
		uids = {};
		for(var i = 0; i < 1000; ++i){
			var particle = new Particle();

			assert.ok(!uids[particle.uid]);
			uids[particle.uid] = true;
		}
	});

	it("isDead", function() {
		var dead = new Particle();
		dead.life = 0;
		var alive = new Particle();
		alive.currentLifeTime = 55;
		alive.maxLifeTime = 9999;

		assert.ok(dead.isDead());
		assert.ok(!alive.isDead());
	});
});
