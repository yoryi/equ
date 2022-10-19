//Testing
import { render } from "@testing-library/react"
import faker from "faker"
import * as React from "react"
//Translations
import { I18nextProvider } from "react-i18next"
//Redux store
import { Provider } from "react-redux"
//Navigation
import { MemoryRouter } from "react-router"
import configureStore from "redux-mock-store"
//Types
import { MockStore } from "redux-mock-store"

import i18n from "../../services/i18n"
import {
  CompletionStatus,
  CompletionStep,
  Profile,
  ReduxState,
  Role,
  Survey as TSurvey,
} from "../../store/types"
//Components
import Survey from "./"

interface TestStore {
  profile: {
    profile: ReduxState["profile"]["profile"]
  }
}

describe(`Survey component`, () => {
  faker.seed(1000)

  const mockStore = configureStore<TestStore>()

  let store: MockStore<TestStore>, survey: TSurvey
  beforeEach(() => {
    store = mockStore({
      profile: {
        profile: {
          id: faker.random.number(10000),
          cover: null,
          avatar: null,
          privateAvatar: null,
          interests: null,
          firstName: null,
          lastName: null,
          name: null,
          email: null,
          role: Role.Student,
          school: null,
          graduation: null,
          mission: null,
          birthday: null,
          gender: null,
          race: null,
          ethnicity: null,
          hardship: null,
          signUpStep: null,
          completion: {
            [CompletionStep.CollegePreferenceSurvey]: CompletionStatus.Pending,
          },
          isFollowed: false,
          uiSettings: null,
        },
      },
    })

    survey = {
      id: faker.random.number(10000),
      title: faker.lorem.words(2),
      description: faker.lorem.sentence(),
    }
  })

  const wrapper: React.FC = ({ children }) => (
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    </I18nextProvider>
  )

  describe(`should render and match the snapshot`, () => {
    describe(`loaded`, () => {
      it(`not completed`, () => {
        const { container } = render(<Survey survey={survey} />, {
          wrapper,
        })

        expect(container.firstChild).toMatchSnapshot()
      })

      it(`completed`, () => {
        store = mockStore({
          profile: {
            profile: {
              ...(store.getState().profile.profile as Profile),
              completion: {
                [CompletionStep.CollegePreferenceSurvey]:
                  CompletionStatus.Completed,
              },
            },
          },
        })

        const { container } = render(<Survey survey={survey} />, {
          wrapper,
        })

        expect(container.firstChild).toMatchSnapshot()
      })
    })

    it(`loading`, () => {
      const { container } = render(<Survey loading />, {
        wrapper,
      })

      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
