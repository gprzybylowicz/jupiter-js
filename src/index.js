var jupiter = {
	Particle: require("./Particle.js"),
	ParticlePool: require("./ParticlePool.js")
};

require("./polyfill");

Object.assign(jupiter, require("./parser"));
Object.assign(jupiter, require("./controller"));
Object.assign(jupiter, require("./behaviour"));
Object.assign(jupiter, require("./util"));
Object.assign(jupiter, require("./emitter"));

module.exports = jupiter;