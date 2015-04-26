var jupiter = {
	Particle: require("./Particle.js"),
	ParticlePool: require("./ParticlePool.js"),
	Emitter: require("./Emitter.js")
};

require("./polyfill");
Object.assign(jupiter, require("./util"));
Object.assign(jupiter, require("./behaviour"));

module.exports = jupiter;