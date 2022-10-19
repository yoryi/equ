//Testing
import { render } from "@testing-library/react"
import faker from "faker"
import _ from "lodash"
import * as React from "react"
//Navigation
import { Link,MemoryRouter } from "react-router-dom"

//Components
import Breadcrumb from "./"

describe(`Breadcrumb component`, () => {
  faker.seed(1000)

  const wrapper: React.FC = ({ children }) => (
    <MemoryRouter>{children}</MemoryRouter>
  )

  it(`should render and match the snapshot`, () => {
    const { container } = render(
      <Breadcrumb>
        <Link to={`/${faker.lorem.word()}`}>{faker.lorem.word()}</Link>

        <span className={`active`}>{faker.lorem.word()}</span>
      </Breadcrumb>,
      { wrapper },
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
