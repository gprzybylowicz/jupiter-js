var Behaviour = require("./Behaviour.js");
var Color = require("../util").Color;

ColorBehaviour.DEFAULT_PRIORITY = 0;

function ColorBehaviour() {
	Behaviour.call(this);

	this.priority = ColorBehaviour.DEFAULT_PRIORITY;

	this.start = new Color();
	this.end = new Color();
	this.startVariance = new Color();
	this.endVariance = new Color();
}

ColorBehaviour.prototype = Object.create(Behaviour.prototype);
ColorBehaviour.prototype.constructor = ColorBehaviour;

ColorBehaviour.prototype.init = function(particle) {
	//todo optimalization??

	particle.start.copyFrom(this.start);
	particle.start.r += this.varianceFrom(this.startVariance.r);
	particle.start.g += this.varianceFrom(this.startVariance.g);
	particle.start.b += this.varianceFrom(this.startVariance.b);
	particle.start.alpha += this.varianceFrom(this.startVariance.alpha);

	particle.end.copyFrom(this.end);
	particle.end.r += this.varianceFrom(this.endVariance.r);
	particle.end.g += this.varianceFrom(this.endVariance.g);
	particle.end.b += this.varianceFrom(this.endVariance.b);
	particle.end.alpha += this.varianceFrom(this.endVariance.alpha);

	particle.color.copyFrom(particle.start);
};

ColorBehaviour.prototype.apply = function(particle, deltaTime) {
	particle.color.copyFrom(particle.start);

	particle.color.r += (particle.end.r - particle.start.r) * particle.lifeProgress;
	particle.color.g += (particle.end.g - particle.start.g) * particle.lifeProgress;
	particle.color.b += (particle.end.b - particle.start.b) * particle.lifeProgress;
	particle.color.alpha += (particle.end.alpha - particle.start.alpha) * particle.lifeProgress;

};

ColorBehaviour.prototype.getName = function() {
	return "ColorBehaviour";
};

module.exports = ColorBehaviour;

