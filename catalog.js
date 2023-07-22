class Catalog {
  // static getBookLendings(catalogData, memberId) {
  //   throw 'Not implemented'
  // }

  // static addBookItem(catalogData, bookItemInfo) {
  //   throw 'Not implemented'
  // }

  static authorNames(catalogData, book) {
    const authorIds = _.get(book, "authorIds")
    const names = _.map(authorIds, function (authorId) {
      return _.get(catalogData, ["authorsById", authorId, "name"])
    })
    return names
  }

  static bookInfo(catalogData, book) {
    const bookInfo = {
      "title": _.get(book, "title"),
      "isbn": _.get(book, "isbn"),
      "authorNames": Catalog.authorNames(catalogData, book)
    }

		// bookInfo のためのクラスを作成する必要はない
    return bookInfo
  }

  static searchBooksByTitle(catalogData, query) {
    const allBooks = _.get(catalogData, "booksByIsbn")

		// _.filter にマップを渡すと、_.filter はそのマップの値を調べる
    const matchingBooks = _.filter(allBooks, function(book) {
      return _.get(book, "title").includes(query)
    })
    const bookInfos = _.map(matchingBooks, function (book) {
      return Catalog.bookInfo(catalogData, book)
    })
    return bookInfos
  }
}