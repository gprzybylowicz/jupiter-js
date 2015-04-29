var jupiter = {
	Particle: require("./Particle.js"),
	ParticlePool: require("./ParticlePool.js")
};

require("./polyfill");

Object.assign(jupiter, require("./util"));
Object.assign(jupiter, require("./behaviour"));
Object.assign(jupiter, require("./emitter"));
Object.assign(jupiter, require("./controller"));

jupiter.config = {};
Object.assign(jupiter.config, require("./config"));

module.exports = jupiter;