import _ from "../utils/lodash"
import UserManagement from "../modules/userManagement"

describe("UserManagement", () => {
  describe("addMember", () => {
    describe("when userManagement data is empty", () => {
      const member = {
        email: "jessie@gmail.com",
        password: "my-secret"
      }

      const userManagementStateBefore = {}

      const expectedUserManagementStateAfter = {
        membersByEmail: {
          "jessie@gmail.com": {
              email: "jessie@gmail.com",
              password: "my-secret"
          }
        }
      }

      it("adds a member to the user management state", () => {
        const actual = UserManagement.addMember(userManagementStateBefore, member)
        const expected = expectedUserManagementStateAfter
        expect(_.isEqual(actual, expected)).toBe(true)
      })
    })
    describe("when userManagement data is not empty", () => {
      const jessie = {
        email: "jessie@gmail.com",
        password: "my-secret"
      }

      const franck = {
        email: "franck@gmail.com",
        password: "my-top-secret"
      }

      const userManagementStateBefore = {
        membersByEmail: {
          "franck@gmail.com": {
            email: "franck@gmail.com",
            password: "my-top-secret"
          }
        }
      }

      const expectedUserManagementStateAfter = {
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

      it("adds a member to the user management state", () => {
        const actual = UserManagement.addMember(userManagementStateBefore, jessie)
        const expected = expectedUserManagementStateAfter
        expect(_.isEqual(actual, expected)).toBe(true)
      })

      it("throws an error when member already exists", () => {
        expect(() => {
          UserManagement.addMember(userManagementStateBefore, franck)
        }).toThrow('Member already exists')
      })
    })
  })
})
