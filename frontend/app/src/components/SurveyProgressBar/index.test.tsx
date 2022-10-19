//Testing
import { render } from "@testing-library/react"
import faker from "faker"
import _ from "lodash"
import * as React from "react"
//Redux store
import { Provider } from "react-redux"
//Navigation
import { MemoryRouter } from "react-router"
import configureStore from "redux-mock-store"
//Types
import { MockStore } from "redux-mock-store"

import { AnswerType,ReduxState } from "../../store/types"
//Components
import SurveyProgressBar from "./"

type TestStore = Pick<ReduxState, "surveys">

describe(`SurveyProgressBar component`, () => {
  faker.seed(1000)

  const mockStore = configureStore<TestStore>()
  let store: MockStore<TestStore>
  beforeEach(() => {
    store = mockStore({
      surveys: {
        surveys: [],
        isSurveyLoading: false,
        survey: {
          id: faker.random.number(10000),
          title: faker.lorem.words(2),
          description: faker.lorem.sentence(),
          questions: [
            {
              id: 1,
              title: faker.lorem.sentence(),
              studentPreferenceType: faker.random.number(10),
              answerType: AnswerType.SingleChoice,
              answer: undefined,
              body: _.times(4, (i) => ({
                key: i,
                content: faker.lorem.words(2),
              })),
            },
          ],
        },
      },
    })
  })

  const wrapper: React.FC = ({ children }) => (
    <MemoryRouter initialEntries={[`1`]}>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  )

  describe(`should render and match the snapshot`, () => {
    it(`survey is loaded`, () => {
      const { container } = render(<SurveyProgressBar />, { wrapper })

      expect(container.firstChild).toMatchSnapshot()
    })

    it(`survey is not loaded`, () => {
      store = mockStore({
        surveys: {
          surveys: [],
          isSurveyLoading: false,
          survey: null,
        },
      })

      const { container } = render(<SurveyProgressBar />, { wrapper })

      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
