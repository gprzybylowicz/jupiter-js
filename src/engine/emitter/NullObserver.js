var nullFunction = function() {
};

function NullObserver() {

}

NullObserver.prototype.onCreate = nullFunction;
NullObserver.prototype.onUpdate = nullFunction;
NullObserver.prototype.onRemove = nullFunction;
NullObserver.prototype.onEmitComplete = nullFunction;

module.exports = NullObserver;
