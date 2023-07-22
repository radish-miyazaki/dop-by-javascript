class UserManagement {
  // static isLibrarian(userManagement, email) {
	// 	return _.has(_.get(userManagement, 'librariansByEmail'), email)
	// }

	// static isVIPMember(userManagement, email) {
	// 	return _.get(userManagement, ['membersByEmail', email, 'isVIP'])
	// }

	// static isSuperMember(userManagement, email) {
	// 	return _.get(userManagement, ['membersByEmail', email, 'isSuper'])
	// }

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