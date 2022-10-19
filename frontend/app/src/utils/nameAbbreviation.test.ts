//Utils
import { nameAbbreviation } from "./nameAbbreviation"

describe(`name abbreviation`, () => {
  describe(`do not exlude articles`, () => {
    it(`should return student name abbreviation`, () => {
      expect(nameAbbreviation(`John Doe`)).toEqual(`JD`)
    })
  })

  describe(`exclude articles`, () => {
    it(`should return university name abbreviation`, () => {
      expect(nameAbbreviation(`Test College`, true)).toEqual(`TC`)
    })

    it(`should limit abbreviation to three characters`, () => {
      expect(nameAbbreviation(`Very Long Test College Name`, true)).toEqual(
        `VLT`,
      )
    })

    it(`should remove exluded articles when creating an abbreviation`, () => {
      expect(nameAbbreviation(`The Art Institute of Seattle`, true)).toEqual(
        `AIS`,
      )
    })
  })
})
