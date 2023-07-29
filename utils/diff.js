import Immutable from "./immutable";

function diffObjects(data1, data2) {
  const emptyObject = Immutable.isArray(data1) ? Immutable.fromJS([]) : Immutable.fromJS({})
  if (data1 === data2) return emptyObject;

  // _.union は 2つの配列からなら一意の配列を作成する
  const keys = Immutable.union(Immutable.keys(data1), Immutable.keys(data2));

  return Immutable.reduce(
    keys,
    function (acc, k) {
      const res = diff(Immutable.get(data1, k), Immutable.get(data2, k));
      if ((Immutable.isObject(res) && Immutable.isEmpty(res)) || res === "no-diff") return acc;

      return Immutable.set(acc, [k], res);
    },
    emptyObject
  );
}

function diff(data1, data2) {
  if (Immutable.isObject(data1) && Immutable.isObject(data2)) {
    return diffObjects(data1, data2);
  }

  if (data1 !== data2) {
    return data2;
  }

  // 'no-diff' は2つの値が同じであるこを示す
  return "no-diff";
}

function informationPaths(obj, path = []) {
  return Immutable.reduce(obj, function (acc, v, k) {
    if (Immutable.isObject(v)) {
      return Immutable.concat(acc,
        informationPaths(v, Immutable.concat(path, k))
      )
    }

    return Immutable.concat(acc, [Immutable.concat(path, k)])
  } , [])
}

function havePathInCommon(diff1, diff2) {
  return !Immutable.isEmpty(
		informationPaths(diff1).intersect(informationPaths(diff2))
	)
}

export { diff, havePathInCommon }
