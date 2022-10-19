//Testing
import { render } from "@testing-library/react"
import faker from "faker"
import * as React from "react"

//Components
import Badge from "./"

describe(`Badge component`, () => {
  faker.seed(1000)

  describe(`it should render and match the snapshot`, () => {
    it(`green`, () => {
      const { container } = render(
        <Badge variant={`green`}>{faker.lorem.word()}</Badge>,
      )

      expect(container.firstChild).toMatchSnapshot()
    })

    it(`yellow`, () => {
      const { container } = render(
        <Badge variant={`yellow`}>{faker.lorem.word()}</Badge>,
      )

      expect(container.firstChild).toMatchSnapshot()
    })

    it(`red`, () => {
      const { container } = render(
        <Badge variant={`red`}>{faker.lorem.word()}</Badge>,
      )

      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
