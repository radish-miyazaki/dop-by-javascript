import Immutable from "../utils/immutable"
import Catalog from "./catalog"
import UserManagement from "./userManagement"

export default class Library {
  static searchBooksByTitleJSON(libraryData, query) {
    const catalogData = Immutable.get(libraryData, "catalog")
    const results = Catalog.searchBooksByTitle(catalogData, query)

    const resultsJSON = JSON.stringify(results)
    return resultsJSON
  }

  static addMember(libraryData, member) {
    const currentUserManagement = Immutable.get(libraryData, "userManagement")
    const nextUserManagement = UserManagement.addMember(
      currentUserManagement,
      member
    )

    const nextLibraryData = Immutable.set(
      libraryData,
      "userManagement",
      nextUserManagement
    )
    return nextLibraryData
  }
}