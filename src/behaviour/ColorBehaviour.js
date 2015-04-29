var Behaviour = require("./Behaviour.js");
var Color = require("../util").Color;
var ColorConfigParser = require("../config").ColorConfigParser;

ColorBehaviour.DEFAULT_PRIORITY = 0;

function ColorBehaviour() {
	Behaviour.call(this);

	this.priority = ColorBehaviour.DEFAULT_PRIORITY;

	this.colorStart = new Color();
	this.colorEnd = new Color();
	this.colorStartVariance = new Color();
	this.colorEndVariance = new Color();
}

ColorBehaviour.prototype = Object.create(Behaviour.prototype);
ColorBehaviour.prototype.constructor = ColorBehaviour;

ColorBehaviour.prototype.init = function(particle) {
	//todo optimalization??

	particle.colorStart.copyFrom(this.colorStart);
	particle.colorStart.r += this.varianceFrom(this.colorStartVariance.r);
	particle.colorStart.g += this.varianceFrom(this.colorStartVariance.g);
	particle.colorStart.b += this.varianceFrom(this.colorStartVariance.b);
	particle.colorStart.alpha += this.varianceFrom(this.colorStartVariance.alpha);

	particle.colorEnd.copyFrom(this.colorEnd);
	particle.colorEnd.r += this.varianceFrom(this.colorEndVariance.r);
	particle.colorEnd.g += this.varianceFrom(this.colorEndVariance.g);
	particle.colorEnd.b += this.varianceFrom(this.colorEndVariance.b);
	particle.colorEnd.alpha += this.varianceFrom(this.colorEndVariance.alpha);

	particle.color.copyFrom(particle.colorStart);
};

ColorBehaviour.prototype.apply = function(particle, deltaTime) {
	particle.color.copyFrom(particle.colorStart);

	particle.color.r += (particle.colorEnd.r - particle.colorStart.r) * particle.lifeProgress;
	particle.color.g += (particle.colorEnd.g - particle.colorStart.g) * particle.lifeProgress;
	particle.color.b += (particle.colorEnd.b - particle.colorStart.b) * particle.lifeProgress;
	particle.color.alpha += (particle.colorEnd.alpha - particle.colorStart.alpha) * particle.lifeProgress;

};

ColorBehaviour.prototype.getConfigParser = function() {
    return new ColorConfigParser(this);
};

module.exports = ColorBehaviour;

