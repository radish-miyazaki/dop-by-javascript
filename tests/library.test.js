import Immutable from "../utils/immutable"
import Library from "../modules/library"

describe("Library", () => {
  const libraryData = Immutable.fromJS({
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
  })

  const bookInfo = Immutable.fromJS({
    "isbn": "978-1779501127",
    "title": "Watchmen",
    "authorNames": ["Alan Moore", "Dave Gibbons"]
  })

  describe("searchBooksByTitleJSON", () => {
    it("returns book info when given book title", () => {
      const actual = Immutable.parseJSON(Library.searchBooksByTitleJSON(libraryData, "Watchmen"))
      const expected = Immutable.fromJS([bookInfo])
      expect(Immutable.isEqual(actual, expected)).toBe(true)
    })

    it("returns empty array when given not exist title", () => {
      const actual = Immutable.parseJSON(Library.searchBooksByTitleJSON(libraryData, "Batman"))
      const expected = Immutable.fromJS([])
      expect(Immutable.isEqual(actual, expected)).toBe(true)
    })
  })

  describe("addMember", () => {
    const jessie = Immutable.fromJS({
      email: "jessie@gmail.com",
      password: "my-secret"
    })

    const libraryStateBefore = Immutable.fromJS({
      userManagement: {
        membersByEmail: {
          "franck@gmail.com": {
            email: "franck@gmail.com",
            password: "my-top-secret"
          }
        }
      }
    })

    const expectedLibraryStateAfter = Immutable.fromJS({
      userManagement: {
        membersByEmail: {
          "jessie@gmail.com": {
              email: "jessie@gmail.com",
              password: "my-secret"
          },
          "franck@gmail.com": {
            email: "franck@gmail.com",
            password: "my-top-secret"
          }
        }
      }
    })

    it("adds a member to the user management state", () => {
      const actual = Library.addMember(libraryStateBefore, jessie)
      expect(Immutable.isEqual(actual, expectedLibraryStateAfter)).toBe(true)
    })
  })
})