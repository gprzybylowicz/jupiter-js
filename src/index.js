var jupiter = {
	Particle: require("./Particle.js"),
	ParticlePool: require("./ParticlePool.js")
};

module.exports = jupiter;

require("./polyfill");
var controller = require("./controller");
var behaviour = require("./behaviour");
var util = require("./util");
var emitter = require("./emitter");
var parser = require("./parser");

Object.assign(jupiter, parser);
Object.assign(jupiter, controller);
Object.assign(jupiter, behaviour);
Object.assign(jupiter, util);
Object.assign(jupiter, emitter);