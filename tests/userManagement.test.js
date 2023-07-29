import Immutable from "../utils/immutable"
import UserManagement from "../modules/userManagement"

describe("UserManagement", () => {
  describe("addMember", () => {
    describe("when userManagement data is empty", () => {
      const member = Immutable.fromJS({
        email: "jessie@gmail.com",
        password: "my-secret"
      })

      const userManagementStateBefore = Immutable.fromJS({})

      const expectedUserManagementStateAfter = Immutable.fromJS({
        membersByEmail: {
          "jessie@gmail.com": {
              email: "jessie@gmail.com",
              password: "my-secret"
          }
        }
      })

      it("adds a member to the user management state", () => {
        const actual = UserManagement.addMember(userManagementStateBefore, member)
        const expected = expectedUserManagementStateAfter
        expect(Immutable.isEqual(actual, expected)).toBe(true)
      })
    })
    describe("when userManagement data is not empty", () => {
      const jessie = Immutable.fromJS({
        email: "jessie@gmail.com",
        password: "my-secret"
      })

      const franck = Immutable.fromJS({
        email: "franck@gmail.com",
        password: "my-top-secret"
      })

      const userManagementStateBefore = Immutable.fromJS({
        membersByEmail: {
          "franck@gmail.com": {
            email: "franck@gmail.com",
            password: "my-top-secret"
          }
        }
      })

      const expectedUserManagementStateAfter = Immutable.fromJS({
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
      })

      it("adds a member to the user management state", () => {
        const actual = UserManagement.addMember(userManagementStateBefore, jessie)
        const expected = expectedUserManagementStateAfter
        expect(Immutable.isEqual(actual, expected)).toBe(true)
      })

      it("throws an error when member already exists", () => {
        expect(() => {
          UserManagement.addMember(userManagementStateBefore, franck)
        }).toThrow('Member already exists')
      })
    })
  })
})
