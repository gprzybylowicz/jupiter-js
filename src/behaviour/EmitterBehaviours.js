function EmitterBehaviours() {
	this.behaviours = [];
}

EmitterBehaviours.prototype.getAll = function() {
	return this.behaviours;
};

EmitterBehaviours.prototype.add = function(behaviour) {
	for (var i = 0; i < this.behaviours.length; ++i) {
		if (this.behaviours[i] === behaviour) {
			throw new Error("Emitter duplicate");
		}
	}
	this.behaviours.push(behaviour);

	this.behaviours.sort(function(a, b) {
		return b.priority - a.priority;
	});

};

EmitterBehaviours.prototype.init = function(particle) {
	for (var i = 0; i < this.behaviours.length; ++i) {
		this.behaviours[i].init(particle);
	}
};

EmitterBehaviours.prototype.apply = function(particle, deltaTime) {
	for (var i = 0; i < this.behaviours.length; ++i) {
		this.behaviours[i].apply(particle, deltaTime);
	}
};

module.exports = EmitterBehaviours;