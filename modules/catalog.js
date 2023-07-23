import _ from "../utils/lodash"

export default class Catalog {
  static authorNames(catalogData, authorIds) {
    const names = _.map(authorIds, function (authorId) {
      return _.get(catalogData, ["authorsById", authorId, "name"])
    })
    return names
  }

  static bookInfo(catalogData, book) {
    const bookInfo = {
      "title": _.get(book, "title"),
      "isbn": _.get(book, "isbn"),
      "authorNames": Catalog.authorNames(catalogData,
        _.get(book, "authorIds")
      )
    }

		// bookInfo のためのクラスを作成する必要はない
    return bookInfo
  }

  static searchBooksByTitle(catalogData, query) {
    const allBooks = _.get(catalogData, "booksByIsbn")

		// _.filter にマップを渡すと、_.filter はそのマップの値を調べる
    const matchingBooks = _.filter(allBooks, function(book) {
      return _.get(book, "title").toLowerCase().includes(query.toLowerCase())
    })

    const bookInfos = _.map(matchingBooks, function (book) {
      return Catalog.bookInfo(catalogData, book)
    })
    return bookInfos
  }
}