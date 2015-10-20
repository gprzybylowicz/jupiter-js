var Point = require("./util").Point;
var Color = require("./util").Color;

Particle._UID = Particle._UID || {value: 0};

function Particle() {
	this.next = null;
	this.prev = null;

	this.uid = Particle._UID.value++;

	//this.maxLifeTime = 0;
	//this.lifeTime = 0;
	//this.lifeProgress = 0;
	//this.position = new Point();

	this.movement = new Point();
	this.acceleration = new Point();
	this.velocity = new Point();

	//this.angle = 0;
	//this.radiansPerSecond = 0;
	//this.radius = 0;
	//this.radiusStart = 0;
	//this.radiusEnd = 0;

	this.size = new Point();
	this.sizeStart = new Point();
	this.sizeEnd = new Point();

	this.color = new Color();
	this.colorStart = new Color();
	this.colorEnd = new Color();

	this.reset();
}

Particle.prototype.reset = function() {
	this.maxLifeTime = 0;
	this.lifeTime = 0;
	this.lifeProgress = 0;
	this.x = 0;
	this.y = 0;

	this.movement.set(0, 0);
	this.acceleration.set(0, 0);
	this.velocity.set(0, 0);

	this.angle = 0;
	this.radiansPerSecond = 0;
	this.radius = 0;
	this.radiusStart = 0;
	this.radiusEnd = 0;

	this.directionCos = 1;
	this.directionSin = 0;

	this.size.set(1, 1);
	this.sizeStart.set(0, 0);
	this.sizeEnd.set(0, 0);

	this.color.set(255, 255, 255, 1);
	this.colorStart.set(0, 0, 0, 1);
	this.colorEnd.set(0, 0, 0, 1);
};

Particle.prototype.isDead = function() {
	return this.lifeTime >= this.maxLifeTime;
};

module.exports = Particle;
