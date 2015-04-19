var List = require("util/List");

describe("ListTest", function() {

	function Mock(number) {
		this.number = number;
		this.next = null;
		this.prev = null;
	}

	var list = null;

	beforeEach(function() {
		list = new List();
	});

	it("should be empty", function() {
		assert.ok(list.isEmpty());
	});

	it("should be empty after remove all elements", function() {
		var item = list.add(new Mock());
		var item2 = list.add(new Mock());

		list.remove(item);
		list.remove(item2);

		assert.ok(list.isEmpty());
	});

	it("should NOT be empty", function() {
		list.add(new Mock());
		assert.ok(!list.isEmpty());
	});

	it("iterate over list", function() {
		var last = 4;
		for (var i = 0; i < last; ++i) {
			list.add(new Mock(i));
		}

		list.forEach(function(item) {
			assert.equal(item.number, --last);
		});
	});

	it("remove item in loop", function() {
		var last = 10;
		for (var i = 0; i < last; ++i) {
			list.add(new Mock(i));
		}

		var toRemove = [2, 5, 7, 8];

		list.forEach(function(item) {
			if (toRemove.indexOf(item.number) >= 0)
				list.remove(item);

			assert.equal(item.number, --last);
		});
	});

	it("should have correct length after add", function() {
		for (var i = 0; i < 10; ++i) {
			list.add(new Mock(i));
		}

		assert.equal(list.length, 10);
	});

	it("should have correct length after add and remove", function() {
		for (var i = 0; i < 10; ++i) {
			list.add(new Mock(i));
		}

		list.forEach(function(item) {
			if (item.number < 5) {
				list.remove(item);
			}
		});

		for (i = 0; i < 10; ++i) {
			list.add(new Mock(i));
		}

		assert.equal(list.length, 15);
	});
});
