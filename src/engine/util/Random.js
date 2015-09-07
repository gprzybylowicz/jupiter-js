var MersenneTwister = require("MersenneTwister");

Random.marsenneTwister = new MersenneTwister();
function Random() {
}

Random.get = function() {
	return Random.uniform(0.0, 1.0);
};

Random.uniform = function(min, max) {
	return Random.marsenneTwister.genrand_real1() * (max - min) + min; // jshint ignore:line
};

module.exports = Random;
