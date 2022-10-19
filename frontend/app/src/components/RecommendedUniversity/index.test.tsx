//Testing
import { act, fireEvent,render } from "@testing-library/react"
import faker from "faker"
import * as React from "react"
//Translations
import { I18nextProvider } from "react-i18next"
//Navigation
import { MemoryRouter } from "react-router"

import i18n from "../../services/i18n"
//Types
import { UniversityProfile } from "../../store/types"
//Components
import RecommendedUniversity from "./"

describe(`RecommendedUniversity component`, () => {
  faker.seed(1000)

  const wrapper: React.FC = ({ children }) => (
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </MemoryRouter>
  )

  let university: UniversityProfile
  beforeEach(() => {
    university = {
      id: faker.random.number(10000),
      name: `${faker.lorem.word()} University`,
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      avatar: faker.image.imageUrl(),
      score: faker.random.number({ min: 75, max: 100 }),
      email: faker.internet.email(),
      website: faker.internet.url(),
    }
  })

  describe(`should render and match the snapshot`, () => {
    it(`university`, () => {
      const { container } = render(
        <RecommendedUniversity university={university} />,
        { wrapper },
      )

      expect(container.firstChild).toMatchSnapshot()
    })

    it(`loading`, () => {
      const { container } = render(<RecommendedUniversity loading />, {
        wrapper,
      })

      expect(container.firstChild).toMatchSnapshot()
    })
  })

  it(`should handle following the university`, () => {
    const onClick = jest.fn()

    const { getByText } = render(
      <RecommendedUniversity university={university} onClick={onClick} />,
      { wrapper },
    )

    act(() => {
      fireEvent.click(getByText(i18n.t(`common:follow`)))
    })

    expect(onClick).toHaveBeenCalled()
  })
})
