import _ from "../utils/lodash"

export default class UserManagement {
  static addMember(userManagement, member) {
    const email = _.get(member, 'email')
    const infoPath = ['membersByEmail', email]

    if (_.has(userManagement, infoPath)) {
      throw 'Member already exists'
    }

    const nextUserManagement = _.set(
      userManagement,
      infoPath,
      member)
    return nextUserManagement
  }
}