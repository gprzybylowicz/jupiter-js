var Behaviour = require("./Behaviour.js");
var BehaviourNames = require("./BehaviourNames.js");

var Point = require("../util").Point;

SizeBehaviour.DEFAULT_PRIORITY = 0;

function SizeBehaviour() {
	Behaviour.call(this);

	this.priority = SizeBehaviour.DEFAULT_PRIORITY;

	this.allowNegativeValues = false;

	this.sizeStart = new Point(1, 1);
	this.sizeEnd = new Point(1, 1);
	this.startVariance = 0;
	this.endVariance = 0;
}

SizeBehaviour.prototype = Object.create(Behaviour.prototype);
SizeBehaviour.prototype.constructor = SizeBehaviour;

SizeBehaviour.prototype.init = function(particle) {
	//todo optimalization??

	var variance = this.varianceFrom(this.startVariance);
	particle.sizeStart.x = this.sizeStart.x + variance;
	particle.sizeStart.y = this.sizeStart.y + variance;

	variance = this.varianceFrom(this.endVariance);
	particle.sizeEnd.x = this.sizeEnd.x + variance;
	particle.sizeEnd.y = this.sizeEnd.y + variance;

	if (!this.allowNegativeValues) {
		particle.sizeStart.x = Math.max(particle.sizeStart.x, 0);
		particle.sizeStart.y = Math.max(particle.sizeStart.y, 0);
		particle.sizeEnd.x = Math.max(particle.sizeEnd.x, 0);
		particle.sizeEnd.y = Math.max(particle.sizeEnd.y, 0);
	}

	particle.size.copyFrom(particle.sizeStart);
};

SizeBehaviour.prototype.apply = function(particle, deltaTime) {
	particle.size.copyFrom(particle.sizeStart);
	particle.size.x += (particle.sizeEnd.x - particle.sizeStart.x) * particle.lifeProgress;
	particle.size.y += (particle.sizeEnd.y - particle.sizeStart.y) * particle.lifeProgress;

	if(!this.allowNegativeValues){
		particle.size.x = Math.max(0, particle.size.x);
		particle.size.x = Math.max(0, particle.size.x);
	}
};

SizeBehaviour.prototype.getName = function() {
	return BehaviourNames.SIZE_BEHAVIOUR;
};

module.exports = SizeBehaviour;