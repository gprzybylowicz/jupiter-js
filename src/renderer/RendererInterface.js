function RendererInterface() {

}

module.exports = RendererInterface;

Object.defineProperty(RendererInterface.prototype, "texture", {
	get: function() {
		throw new Error("texture getter has to be implemented");
	},
	set: function(value) {
		throw new Error("texture setter has to be implemented");
	}
});