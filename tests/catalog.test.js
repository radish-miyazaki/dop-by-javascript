import _ from "../utils/lodash"
import Catalog from "../modules/catalog"

const catalogData = {
  booksByIsbn: {
    "978-1779501127": {
      isbn: "978-1779501127",
      title: "Watchmen",
      publicationYear: 1987,
      authorIds: ["alan-moore", "dave-gibbons"],
      bookItems: [
        {
          id: "book-item-1",
          libId: "nyc-central-lib",
          isLent: true
        },
        {
          id: "book-item-2",
          libId: "nyc-central-lib",
          isLent: false
        }
      ]
    }
  },
  authorsById: {
    "alan-moore": {
      name: "Alan Moore",
    },
    "dave-gibbons": {
      name: "Dave Gibbons",
    },
  }
}

const bookData = {
  isbn: '978-1779501127',
  title: 'Watchmen',
  publicationYear: 1987,
  authorIds: ['alan-moore', 'dave-gibbons'],
}

const bookInfo = {
  title: "Watchmen",
  isbn: "978-1779501127",
  authorNames: ["Alan Moore", "Dave Gibbons"]
}

describe("Catalog", () => {
  describe("authorNames", () => {
    describe("when catalogData is exist", () => {
      it("returns empty array when given empty array", () => {
        const actual = Catalog.authorNames(catalogData, [])
        const expected = []
        expect(_.isEqual(actual, expected)).toBe(true)
      })

      it("returns author name when given valid author id", () => {
        const actual = Catalog.authorNames(catalogData, ["alan-moore"])
        const expected = ["Alan Moore"]
        expect(_.isEqual(actual, expected)).toBe(true)
      })

      it("returns author names when given valid author ids", () => {
        const actual = Catalog.authorNames(catalogData, ["alan-moore", "dave-gibbons"])
        const expected = ["Alan Moore", "Dave Gibbons"]
        expect(_.isEqual(actual, expected)).toBe(true)
      })

      it("returns undefined when given invalid author id", () => {
        const actual = Catalog.authorNames(catalogData, ["albert-einstein"])
        const expected = [undefined]
        expect(_.isEqual(actual, expected)).toBe(true)
      })

      it("returns undefined when given valid and invalid author ids", () => {
        const actual = Catalog.authorNames(catalogData, ["alan-moore", "albert-einstein"])
        const expected = ["Alan Moore", undefined]
        expect(_.isEqual(actual, expected)).toBe(true)
      })
    })

    describe("when catalogData is empty", () => {
      it("returns undefined when given empty array", () => {
        const actual = Catalog.authorNames({}, [])
        const expected = []
        expect(_.isEqual(actual, expected)).toBe(true)
      })

      it("returns undefined when given author id", () => {
        const actual = Catalog.authorNames({}, ["alan-moore"])
        const expected = [undefined]
        expect(_.isEqual(actual, expected)).toBe(true)
      })

      it("returns undefined when given author ids", () => {
        const actual = Catalog.authorNames({}, ["alan-moore", "dave-gibbons"])
        const expected = [undefined, undefined]
        expect(_.isEqual(actual, expected)).toBe(true)
      })
    })
  })

  describe("bookInfo", () => {
    it("returns book info", () => {
      const actual = Catalog.bookInfo(catalogData, bookData)
      const expected = bookInfo
      expect(actual).toEqual(expected)
    })
  })

  describe("searchBooksByTitle", () => {
    it("returns book info array when given valid title", () => {
      const actual = Catalog.searchBooksByTitle(catalogData, "Watchmen")
      const expected = [bookInfo]
      expect(_.isEqual(actual, expected)).toBe(true)
    })

    it("returns empty array when given invalid title", () => {
      const actual = Catalog.searchBooksByTitle(catalogData, "Batman")
      const expected = []
      expect(_.isEqual(actual, expected)).toBe(true)
    })

    it("retusn book info array when given valid lower case title", () => {
      const actual = Catalog.searchBooksByTitle(catalogData, "watchmen")
      const expected = [bookInfo]
      expect(_.isEqual(actual, expected)).toBe(true)
    })
  })
})