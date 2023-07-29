import Immutable from "../utils/immutable"

export default class Catalog {
  static authorNames(catalogData, authorIds) {
    return Immutable.map(authorIds, function (authorId) {
      return Immutable.getIn(catalogData, ["authorsById", authorId, "name"])
    })
  }

  static bookInfo(catalogData, book) {
    const bookInfo = Immutable.Map({
      "title": Immutable.get(book, "title"),
      "isbn": Immutable.get(book, "isbn"),
      "authorNames": Catalog.authorNames(catalogData,
        Immutable.get(book, "authorIds")
      )
    })

		// bookInfo のためのクラスを作成する必要はない
    return bookInfo
  }

  static searchBooksByTitle(catalogData, query) {
    const allBooks = Immutable.get(catalogData, "booksByIsbn")

		// _.filter にマップを渡すと、_.filter はそのマップの値を調べる
    const matchingBooks = Immutable.filter(allBooks, function(book) {
      return Immutable.get(book, "title").toLowerCase().includes(query.toLowerCase())
    })

    const bookInfos = Immutable.map(matchingBooks, function (book) {
      return Catalog.bookInfo(catalogData, book)
    })
    return bookInfos
  }
}