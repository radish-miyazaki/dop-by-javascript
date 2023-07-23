import _ from "../utils/lodash"
import Catalog from "../catalog"
import UserManagement from "../userManagement"

export default class Library {
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