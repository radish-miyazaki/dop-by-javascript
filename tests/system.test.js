import _ from "../utils/lodash"
import System from "../systems/system"
import SystemState from "../systems/systemState"

describe("System", () => {
  describe("addBook", () => {
    const jessie = {
      email: "jessie@gmail.com",
      password: "my-secret"
    }

    const libraryStateBefore = {
      userManagement: {
        membersByEmail: {
          "franck@gmail.com": {
            email: "franck@gmail.com",
            password: "my-top-secret"
          }
        }
      }
    }

    const expectedLibraryStateAfter = {
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
    }

    it("adds a book to the library state", () => {
      const systemState = new SystemState()
      systemState.commit(null, libraryStateBefore)

      System.addMember(systemState, jessie)
      expect(_.isEqual(systemState.get(), expectedLibraryStateAfter)).toBe(true)
    })
  })
})