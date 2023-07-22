class Library {
  // static getBookLendings(libraryData, userId, memberId) {
  //   if (
  //     UserManagement.isLibrarian(libraryData.userManagement, userId) ||
  //     UserManagement.isSuperMember(libraryData.userManagement, userId)
  //   ) {
  //     return Catalog.getBookLendings(libraryData.catalog, memberId)
  //   }
  // }

  // static addBookItem(libraryData, userId, bookItemInfo) {
  //   if (
  //     UserManagement.isLibrarian(libraryData.userManagement, userId) ||
  //     UserManagement.isVIPMember(libraryData.userManagement, userId)
  //   ) {
  //     return Catalog.addBookItem(libraryData.catalog, bookItemInfo)
  //   } else {
  //     throw "Not allowed to add a book item"
  //   }
  // }

  static searchBooksByTitleJSON(libraryData, query) {
    const catalogData = _.get(libraryData, "catalog")
    const results = Catalog.searchBooksByTitle(catalogData, query)

    const resultsJSON = JSON.stringify(results)
    return resultsJSON
  }

  static addMember(libraryData, member) {
    const currentUserManagement = _.get(libraryData, "userManagement")
    const nextUserManagement = UserManagement.addMember(
      currentUserManagement,
      member
    )

    const nextLibraryData = _.set(
      libraryData,
      "userManagement",
      nextUserManagement
    )
    return nextLibraryData
  }
}