function diffObjects(data1, data2) {
  const emptyObject = _.isArray(data1) ? [] : {};
  if (data1 === data2) return emptyObject;

  // _.union は 2つの配列からなら一意の配列を作成する
  const keys = _.union(_.keys(data1), _.keys(data2));

  return _.reduce(
    keys,
    function (acc, k) {
      const res = diff(_.get(data1, k), _.get(data2, k));
      if ((_.isObject(res) && _.isEmpty(res)) || res === "no-diff") return acc;

      return _.set(acc, [k], res);
    },
    emptyObject
  );
}

export default function diff(data1, data2) {
  if (_.isObject(data1) && _.isObject(data2)) {
    return diffObjects(data1, data2);
  }

  if (data1 !== data2) {
    return data2;
  }

  // 'no-diff' は2つの値が同じであるこを示す
  return "no-diff";
}

export default function informationPaths(obj, path = []) {
  return _.reduce(obj, function (acc, v, k) {
    if (_.isObject(v)) {
      return _.concat(acc,
        informationPaths(v, _.concat(path, k))
      )
    }

    return _.concat(acc, [_.concat(path, k)])
  } , [])
}

export default function havePathInCommon(diff1, diff2) {
  return !_.isEmpty(
		_.intersection(informationPaths(diff1), informationPaths(diff2))
	)
}
