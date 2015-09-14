var Behaviour = require("./Behaviour.js");
var Color = require("../util").Color;

ColorBehaviour.DEFAULT_PRIORITY = 0;

function ColorBehaviour() {
	Behaviour.call(this);

	this.priority = ColorBehaviour.DEFAULT_PRIORITY;

	this.start = new Color();
	this.end = new Color();
	this.startVariance = new Color(0, 0, 0, 0);
	this.endVariance = new Color(0, 0, 0, 0);
}

ColorBehaviour.prototype = Object.create(Behaviour.prototype);
ColorBehaviour.prototype.constructor = ColorBehaviour;

ColorBehaviour.prototype.init = function(particle) {
	//todo optimalization??

	particle.colorStart.copyFrom(this.start);
	particle.colorStart.r += this.varianceFrom(this.startVariance.r);
	particle.colorStart.g += this.varianceFrom(this.startVariance.g);
	particle.colorStart.b += this.varianceFrom(this.startVariance.b);
	particle.colorStart.alpha += this.varianceFrom(this.startVariance.alpha);

	particle.colorEnd.copyFrom(this.end);
	particle.colorEnd.r += this.varianceFrom(this.endVariance.r);
	particle.colorEnd.g += this.varianceFrom(this.endVariance.g);
	particle.colorEnd.b += this.varianceFrom(this.endVariance.b);
	particle.colorEnd.alpha += this.varianceFrom(this.endVariance.alpha);

	particle.color.copyFrom(particle.colorStart);
};

ColorBehaviour.prototype.apply = function(particle, deltaTime) {
	particle.color.copyFrom(particle.colorStart);

	particle.color.r += (particle.colorEnd.r - particle.colorStart.r) * particle.lifeProgress;
	particle.color.g += (particle.colorEnd.g - particle.colorStart.g) * particle.lifeProgress;
	particle.color.b += (particle.colorEnd.b - particle.colorStart.b) * particle.lifeProgress;
	particle.color.alpha += (particle.colorEnd.alpha - particle.colorStart.alpha) * particle.lifeProgress;

};

ColorBehaviour.prototype.getName = function() {
	return "ColorBehaviour";
};

module.exports = ColorBehaviour;

