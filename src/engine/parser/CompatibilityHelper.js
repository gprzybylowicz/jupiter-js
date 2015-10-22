function CompatibilityHelper() {

}

CompatibilityHelper.readDuration = function(config) {
	if (config.duration) {
		return config.duration;
	}

	if (config.emitController && config.emitController._durationGuard) {
		return config.emitController._durationGuard.maxTime;
	}

	return -1;
};

module.exports = CompatibilityHelper;