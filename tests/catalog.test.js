import _ from "lodash"
import Catalog from "../catalog"

const catalogData = {
  authorsById: {
    "alan-moore": {
      name: "Alan Moore",
    },
    "dave-gibbons": {
      name: "Dave Gibbons",
    },
  }
}

describe("Catalog", () => {
  describe("authorNames", () => {
    it("returns empty array when given empty array", () => {
      const actual = Catalog.authorNames(catalogData, [])
      const expected = []
      expect(actual).toEqual(expected)
    })

    it("returns author name when given author id", () => {
      const actual = Catalog.authorNames(catalogData, ["alan-moore"])
      const expected = ["Alan Moore"]
      expect(actual).toEqual(expected)
    })

    it("returns author names when given author ids", () => {
      const actual = Catalog.authorNames(catalogData, ["alan-moore", "dave-gibbons"])
      const expected = ["Alan Moore", "Dave Gibbons"]
      expect(actual).toEqual(expected)
    })

    it("returns undefined when given empty array", () => {
      const actual = Catalog.authorNames({}, [])
      const expected = []
      expect(actual).toEqual(expected)
    })

    it("returns undefined when given author id", () => {
      const actual = Catalog.authorNames({}, ["alan-moore"])
      const expected = [undefined]
      expect(actual).toEqual(expected)
    })

    it("returns undefined when given author ids", () => {
      const actual = Catalog.authorNames({}, ["alan-moore", "dave-gibbons"])
      const expected = [undefined, undefined]
      expect(actual).toEqual(expected)
    })

    it("returns undefined when given author id", () => {
      const actual = Catalog.authorNames(catalogData, ["albert-einstein"])
      const expected = [undefined]
      expect(actual).toEqual(expected)
    })

    it("returns undefined when given author ids", () => {
      const actual = Catalog.authorNames(catalogData, ["alan-moore", "albert-einstein"])
      const expected = ["Alan Moore", undefined]
      expect(actual).toEqual(expected)
    })
  })
})