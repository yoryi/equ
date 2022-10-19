//Testing
import { render } from "@testing-library/react"
import faker from "faker"
import * as React from "react"
//Translations
import { I18nextProvider } from "react-i18next"
//Redux store
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"

import i18n from "../../services/i18n"
//Types
import { ReduxState, Reference, ReferenceType } from "../../store/types"
//Components
import UnacceptedReference from "./"

type TestStore = Pick<ReduxState, "media">

describe(`UnacceptedReference component`, () => {
  faker.seed(1000)

  const mockStore = configureStore<TestStore>()
  const store = mockStore({
    media: {
      mediaToken: faker.random.alphaNumeric(32),
    },
  })

  let reference: Reference
  beforeEach(() => {
    reference = {
      id: faker.random.number(10000),
      type: ReferenceType.Academic,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      media: null,
      organization: faker.company.companyName(),
      position: faker.lorem.word(),
      content: faker.lorem.sentences(3),
      isVisible: false,
      referenceLink: {
        id: faker.random.number(10000),
        type: ReferenceType.Academic,
        activity: null,
        token: faker.random.alphaNumeric(32),
        isActive: true,
        createdAt: null,
      },
    }
  })

  const wrapper: React.FC = ({ children }) => (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>{children}</Provider>
    </I18nextProvider>
  )

  describe(`should render and match the snapshot`, () => {
    it(`not loading`, () => {
      const { container } = render(
        <UnacceptedReference reference={reference} />,
        { wrapper },
      )

      expect(container.firstChild).toMatchSnapshot()
    })

    it(`loading`, () => {
      const { container } = render(<UnacceptedReference loading />, {
        wrapper,
      })

      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
