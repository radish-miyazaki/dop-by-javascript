import Immutable from 'immutable'

Immutable.map = function(coll, f) {
	return coll.map(f)
}

Immutable.filter = function(coll, f) {
	if (Immutable.isMap(coll)) {
		return coll.valueSeq().filter(f)
	}
	return coll.filter(f)
}

Immutable.isEqual = Immutable.is

Immutable.parseJSON = function(json) {
  return Immutable.fromJS(JSON.parse(json))
}

Immutable.reduce = function(coll, reducer, initialReduction) {
	return coll.reduce(reducer, initialReduction)
}

Immutable.isEmpty = function(coll) {
	return coll.isEmpty
}

Immutable.keys = function(coll) {
	return coll.keySeq()
}

Immutable.isObject = function(coll) {
	return Immutable.Map.isMap(coll)
}

Immutable.isArray = Immutable.isIndexed

Immutable.union = function() {
	return Immutable.Set.union(arguments)
}

export default Immutable
