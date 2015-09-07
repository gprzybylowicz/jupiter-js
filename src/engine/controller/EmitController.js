function EmitContoller() {
}

EmitContoller.prototype.howMany = function(deltaTime) {
	throw new Error("Abstract method");
};

module.exports = EmitContoller;