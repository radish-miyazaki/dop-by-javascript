import Immutable from "../utils/immutable"
import { diff, havePathInCommon } from "../utils/diff"

export default class SystemConsistency {
  static threeWayMerge(current, previous, next) {
    const previousToCurrent = diff(previous, current)
    const previousToNext = diff(previous, next)

    if (havePathInCommon(previousToCurrent, previousToNext)) {
      return Immutable.merge(current, previousToNext)
    }

    throw 'Conflicting concurrent mutations.'
  }

  static reconcile(current, previous, next) {
    if (current == previous) {
      // システム状態が計算フェーズ使われたものと同じである場合は、早送りマージ
      return next
    }

    return SystemConsistency.threeWayMerge(current, previous, next)
  }
}