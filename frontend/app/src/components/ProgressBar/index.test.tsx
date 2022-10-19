//Testing
import { render } from "@testing-library/react"
import faker from "faker"
import * as React from "react"

//Components
import ProgressBar from "./"

describe(`ProgressBar component`, () => {
  faker.seed(1000)

  describe(`should render and match the snapshot`, () => {
    describe(`range`, () => {
      it(`with middle value`, () => {
        const { container } = render(
          <ProgressBar
            title={faker.lorem.words(2)}
            value={[800, 900, 1000]}
            max={1000}
          />,
        )

        expect(container.firstChild).toMatchSnapshot()
      })

      it(`without middle value`, () => {
        const { container } = render(
          <ProgressBar
            title={faker.lorem.words(2)}
            value={[800, null, 1000]}
            max={1000}
          />,
        )

        expect(container.firstChild).toMatchSnapshot()
      })
    })

    it(`value`, () => {
      const { container } = render(
        <ProgressBar title={faker.lorem.words(2)} value={800} max={1000} />,
      )

      expect(container.firstChild).toMatchSnapshot()
    })

    describe(`percentage`, () => {
      it(`more than or equals 1%`, () => {
        const { container } = render(
          <ProgressBar
            title={faker.lorem.words(2)}
            value={800}
            max={1000}
            percentage
          />,
        )

        expect(container.firstChild).toMatchSnapshot()
      })

      it(`less than 1%`, () => {
        const { container } = render(
          <ProgressBar
            title={faker.lorem.words(2)}
            value={0.009}
            max={100}
            percentage
          />,
        )

        expect(container.firstChild).toMatchSnapshot()
      })
    })
  })
})
