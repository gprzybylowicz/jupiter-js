function List() {
	this.first = null;
	this.length = 0;
}

List.prototype.isEmpty = function() {
	return this.first === null;
};

List.prototype.add = function(item) {
	item.prev = null;
	item.next = null;
	if (this.first) {
		this.first.prev = item;
	}

	item.next = this.first;
	this.first = item;
	this.length++;
	return item;
};

List.prototype.forEach = function(callback) {
	var current = this.first;
	var next = null;
	while (current) {
		next = current.next;
		callback(current);
		current = next;
	}
};

List.prototype.remove = function(item) {
	var previous = item.prev;
	var next = item.next;

	if (previous)
		previous.next = next;

	if (next)
		next.prev = previous;

	if (this.first === item)
		this.first = item.next;

	item.prev = null;
	item.next = null;
	this.length--;
};

module.exports = List;
