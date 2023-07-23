import _ from "../utils/lodash"
import Library from "../modules/library"

const libraryData = {
  "catalog": {
    "booksByIsbn": {
      "978-1779501127": {
        "isbn": "978-1779501127",
        "title": "Watchmen",
        "publicationYear": 1987,
        "authorIds": ["alan-moore", "dave-gibbons"],
        "bookItems": [
          {
            "id": "book-item-1",
            "libId": "nyc-central-lib",
            "isLent": true
          },
          {
            "id": "book-item-2",
            "libId": "nyc-central-lib",
            "isLent": false
          }
        ]
      }
    },
    "authorsById": {
      "alan-moore": {
        "name": "Alan Moore",
        "bookIsbns": ["978-1779501127"]
      },
      "dave-gibbons": {
        "name": "Dave Gibbons",
        "bookIsbns": ["978-1779501127"]
      },
    }
  }
}

const bookInfo = {
  "isbn": "978-1779501127",
  "title": "Watchmen",
  "authorNames": ["Alan Moore", "Dave Gibbons"]
}

describe("Library", () => {
  describe("searchBooksByTitleJSON", () => {
    it("returns book info when given book title", () => {
      const actual = JSON.parse(Library.searchBooksByTitleJSON(libraryData, "Watchmen"))
      const expected = [bookInfo]
      expect(actual).toEqual(expected)
    })

    it("returns empty array when given not exist title", () => {
      const actual = JSON.parse(Library.searchBooksByTitleJSON(libraryData, "Batman"))
      const expected = []
      expect(actual).toEqual(expected)
    })
  })
})