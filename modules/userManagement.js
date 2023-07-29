import Immutable from "../utils/immutable"

export default class UserManagement {
  static addMember(userManagement, member) {
    const email = Immutable.get(member, 'email')
    const infoPath = ['membersByEmail', email]

    if (Immutable.hasIn(userManagement, infoPath)) {
      throw 'Member already exists'
    }

    return Immutable.setIn(
      userManagement,
      infoPath,
      member)
  }
}