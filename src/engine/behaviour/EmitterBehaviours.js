function EmitterBehaviours() {
	this.behaviours = [];
}

EmitterBehaviours.prototype.getAll = function() {
	return this.behaviours;
};

EmitterBehaviours.prototype.isEmpty = function() {
	return this.getAll().length === 0;
};

EmitterBehaviours.prototype.clear = function() {
	this.behaviours = [];
};

EmitterBehaviours.prototype.add = function(behaviour) {
	if (this.getByName(behaviour.getName()) !== null) {
		throw new Error("Emitter duplicate");

	}

	this.behaviours.push(behaviour);
	this.behaviours.sort(function(a, b) {
		return b.priority - a.priority;
	});

	return behaviour;
};

EmitterBehaviours.prototype.getByName = function(name) {
	for (var i = 0; i < this.behaviours.length; ++i) {
		if (this.behaviours[i].getName() === name) {
			return this.behaviours[i];
		}
	}

	return null;
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