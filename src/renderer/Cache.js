function Cache() {
	this.data = {};
}

Cache.prototype.add = function(name, config) {
	this.data[name] = config;
};

Cache.prototype.get = function(name) {
	if (!this.has(name)) {
		throw new Error("\"" + name + "\" config doesn't exist in cache");
	}

	return this.data[name];
};

Cache.prototype.has = function(name) {
	return !!this.data[name];
};

module.exports = Cache;