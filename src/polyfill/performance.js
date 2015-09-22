// Date.now
if (!(Date.now && Date.prototype.getTime)) {
	Date.now = function now() {
		return new Date().getTime();
	};
}

// performance.now
if (!(global.performance && global.performance.now)) {
	var startTime = Date.now();
	if (!global.performance) {
		global.performance = {};
	}
	global.performance.now = function () {
		return Date.now() - startTime;
	};
}
