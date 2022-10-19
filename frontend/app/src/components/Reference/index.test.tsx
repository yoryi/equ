//Testing
import { render } from "@testing-library/react"
import faker from "faker"
import * as React from "react"
//Translations
import { I18nextProvider } from "react-i18next"
//Redux store
import { Provider } from "react-redux"
//Navigation
import { MemoryRouter, Route } from "react-router"
import configureStore from "redux-mock-store"

import i18n from "../../services/i18n"
//Types
import {
  ActivityType,
  ReduxState,
  Reference as TReference,
  ReferenceType,
} from "../../store/types"
//Components
import Reference from "./"

type TestStore = Pick<ReduxState, "media">

describe(`Reference component`, () => {
  faker.seed(1000)

  const mockStore = configureStore<TestStore>()
  const store = mockStore({
    media: {
      mediaToken: faker.random.alphaNumeric(32),
    },
  })

  let initialEntries: string[] | null = null
  let reference: TReference
  beforeEach(() => {
    reference = {
      id: faker.random.number(10000),
      type: ReferenceType.Academic,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      media: {
        id: faker.random.number(10000),
        path: faker.image.imageUrl(),
      },
      organization: faker.company.companyName(),
      position: faker.lorem.word(),
      content: faker.lorem.sentences(3),
      isVisible: true,
      referenceLink: {
        id: faker.random.number(10000),
        type: ReferenceType.Academic,
        activity: null,
        token: faker.random.alphaNumeric(32),
        isActive: false,
        createdAt: null,
      },
    }
  })

  afterEach(() => {
    initialEntries = null
  })

  const wrapper: React.FC = ({ children }) => (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries ?? [`/`]}>
          <Route path={[`/`, `/student/:id`]} exact>
            {children}
          </Route>
        </MemoryRouter>
      </Provider>
    </I18nextProvider>
  )

  describe(`should render and match the snapshot`, () => {
    describe(`media`, () => {
      it(`present`, () => {
        const { container } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(container.firstChild).toMatchSnapshot()
      })

      it(`not present`, () => {
        reference = {
          ...reference,
          media: null,
        }

        const { container } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(container.firstChild).toMatchSnapshot()
      })
    })

    it(`with activity`, () => {
      reference = {
        ...reference,
        type: ReferenceType.Activity,
        referenceLink: {
          ...reference.referenceLink,
          activity: {
            id: faker.random.number(10000),
            title: faker.lorem.words(2),
            startDate: null,
            endDate: null,
            company: faker.company.companyName(),
            description: faker.lorem.sentences(3),
            type: ActivityType.ACADEMIC_ART,
            referenceLink: null,
          },
        },
      }

      const { container } = render(<Reference reference={reference} />, {
        wrapper,
      })

      expect(container.firstChild).toMatchSnapshot()
    })
  })

  describe(`activity link`, () => {
    describe(`own profile`, () => {
      it(`SPORTS_SPIRIT`, () => {
        reference = {
          ...reference,
          type: ReferenceType.Activity,
          referenceLink: {
            ...reference.referenceLink,
            activity: {
              id: faker.random.number(10000),
              title: faker.lorem.words(2),
              startDate: null,
              endDate: null,
              company: faker.company.companyName(),
              description: faker.lorem.sentences(3),
              type: ActivityType.SPORTS_SPIRIT,
              referenceLink: null,
            },
          },
        }

        const { getByRole } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(getByRole(`activityLink`)).toHaveAttribute(
          `href`,
          `/extracurriculars#activity-${reference.referenceLink.activity?.id}`,
        )
      })

      it(`ACADEMIC_ART`, () => {
        reference = {
          ...reference,
          type: ReferenceType.Activity,
          referenceLink: {
            ...reference.referenceLink,
            activity: {
              id: faker.random.number(10000),
              title: faker.lorem.words(2),
              startDate: null,
              endDate: null,
              company: faker.company.companyName(),
              description: faker.lorem.sentences(3),
              type: ActivityType.ACADEMIC_ART,
              referenceLink: null,
            },
          },
        }

        const { getByRole } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(getByRole(`activityLink`)).toHaveAttribute(
          `href`,
          `/extracurriculars#activity-${reference.referenceLink.activity?.id}`,
        )
      })

      it(`HOBBIES`, () => {
        reference = {
          ...reference,
          type: ReferenceType.Activity,
          referenceLink: {
            ...reference.referenceLink,
            activity: {
              id: faker.random.number(10000),
              title: faker.lorem.words(2),
              startDate: null,
              endDate: null,
              company: faker.company.companyName(),
              description: faker.lorem.sentences(3),
              type: ActivityType.HOBBIES,
              referenceLink: null,
            },
          },
        }

        const { getByRole } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(getByRole(`activityLink`)).toHaveAttribute(
          `href`,
          `/extracurriculars#activity-${reference.referenceLink.activity?.id}`,
        )
      })

      it(`INTERNSHIP`, () => {
        reference = {
          ...reference,
          type: ReferenceType.Activity,
          referenceLink: {
            ...reference.referenceLink,
            activity: {
              id: faker.random.number(10000),
              title: faker.lorem.words(2),
              startDate: null,
              endDate: null,
              company: faker.company.companyName(),
              description: faker.lorem.sentences(3),
              type: ActivityType.INTERNSHIP,
              referenceLink: null,
            },
          },
        }

        const { getByRole } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(getByRole(`activityLink`)).toHaveAttribute(
          `href`,
          `/professional#activity-${reference.referenceLink.activity?.id}`,
        )
      })

      it(`EMPLOYMENT`, () => {
        reference = {
          ...reference,
          type: ReferenceType.Activity,
          referenceLink: {
            ...reference.referenceLink,
            activity: {
              id: faker.random.number(10000),
              title: faker.lorem.words(2),
              startDate: null,
              endDate: null,
              company: faker.company.companyName(),
              description: faker.lorem.sentences(3),
              type: ActivityType.EMPLOYMENT,
              referenceLink: null,
            },
          },
        }

        const { getByRole } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(getByRole(`activityLink`)).toHaveAttribute(
          `href`,
          `/professional#activity-${reference.referenceLink.activity?.id}`,
        )
      })

      it(`VOLUNTEER`, () => {
        reference = {
          ...reference,
          type: ReferenceType.Activity,
          referenceLink: {
            ...reference.referenceLink,
            activity: {
              id: faker.random.number(10000),
              title: faker.lorem.words(2),
              startDate: null,
              endDate: null,
              company: faker.company.companyName(),
              description: faker.lorem.sentences(3),
              type: ActivityType.VOLUNTEER,
              referenceLink: null,
            },
          },
        }

        const { getByRole } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(getByRole(`activityLink`)).toHaveAttribute(
          `href`,
          `/service#activity-${reference.referenceLink.activity?.id}`,
        )
      })

      it(`ACTIVISM`, () => {
        reference = {
          ...reference,
          type: ReferenceType.Activity,
          referenceLink: {
            ...reference.referenceLink,
            activity: {
              id: faker.random.number(10000),
              title: faker.lorem.words(2),
              startDate: null,
              endDate: null,
              company: faker.company.companyName(),
              description: faker.lorem.sentences(3),
              type: ActivityType.ACTIVISM,
              referenceLink: null,
            },
          },
        }

        const { getByRole } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(getByRole(`activityLink`)).toHaveAttribute(
          `href`,
          `/service#activity-${reference.referenceLink.activity?.id}`,
        )
      })
    })

    describe(`other student profile`, () => {
      let id: number
      beforeEach(() => {
        id = faker.random.number(10000)
        initialEntries = [`/student/${id}`]
      })

      it(`SPORTS_SPIRIT`, () => {
        reference = {
          ...reference,
          type: ReferenceType.Activity,
          referenceLink: {
            ...reference.referenceLink,
            activity: {
              id: faker.random.number(10000),
              title: faker.lorem.words(2),
              startDate: null,
              endDate: null,
              company: faker.company.companyName(),
              description: faker.lorem.sentences(3),
              type: ActivityType.SPORTS_SPIRIT,
              referenceLink: null,
            },
          },
        }

        const { getByRole } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(getByRole(`activityLink`)).toHaveAttribute(
          `href`,
          `/student/${id}/extracurriculars#activity-${reference.referenceLink.activity?.id}`,
        )
      })

      it(`ACADEMIC_ART`, () => {
        reference = {
          ...reference,
          type: ReferenceType.Activity,
          referenceLink: {
            ...reference.referenceLink,
            activity: {
              id: faker.random.number(10000),
              title: faker.lorem.words(2),
              startDate: null,
              endDate: null,
              company: faker.company.companyName(),
              description: faker.lorem.sentences(3),
              type: ActivityType.ACADEMIC_ART,
              referenceLink: null,
            },
          },
        }

        const { getByRole } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(getByRole(`activityLink`)).toHaveAttribute(
          `href`,
          `/student/${id}/extracurriculars#activity-${reference.referenceLink.activity?.id}`,
        )
      })

      it(`HOBBIES`, () => {
        reference = {
          ...reference,
          type: ReferenceType.Activity,
          referenceLink: {
            ...reference.referenceLink,
            activity: {
              id: faker.random.number(10000),
              title: faker.lorem.words(2),
              startDate: null,
              endDate: null,
              company: faker.company.companyName(),
              description: faker.lorem.sentences(3),
              type: ActivityType.HOBBIES,
              referenceLink: null,
            },
          },
        }

        const { getByRole } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(getByRole(`activityLink`)).toHaveAttribute(
          `href`,
          `/student/${id}/extracurriculars#activity-${reference.referenceLink.activity?.id}`,
        )
      })

      it(`INTERNSHIP`, () => {
        reference = {
          ...reference,
          type: ReferenceType.Activity,
          referenceLink: {
            ...reference.referenceLink,
            activity: {
              id: faker.random.number(10000),
              title: faker.lorem.words(2),
              startDate: null,
              endDate: null,
              company: faker.company.companyName(),
              description: faker.lorem.sentences(3),
              type: ActivityType.INTERNSHIP,
              referenceLink: null,
            },
          },
        }

        const { getByRole } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(getByRole(`activityLink`)).toHaveAttribute(
          `href`,
          `/student/${id}/professional#activity-${reference.referenceLink.activity?.id}`,
        )
      })

      it(`EMPLOYMENT`, () => {
        reference = {
          ...reference,
          type: ReferenceType.Activity,
          referenceLink: {
            ...reference.referenceLink,
            activity: {
              id: faker.random.number(10000),
              title: faker.lorem.words(2),
              startDate: null,
              endDate: null,
              company: faker.company.companyName(),
              description: faker.lorem.sentences(3),
              type: ActivityType.EMPLOYMENT,
              referenceLink: null,
            },
          },
        }

        const { getByRole } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(getByRole(`activityLink`)).toHaveAttribute(
          `href`,
          `/student/${id}/professional#activity-${reference.referenceLink.activity?.id}`,
        )
      })

      it(`VOLUNTEER`, () => {
        reference = {
          ...reference,
          type: ReferenceType.Activity,
          referenceLink: {
            ...reference.referenceLink,
            activity: {
              id: faker.random.number(10000),
              title: faker.lorem.words(2),
              startDate: null,
              endDate: null,
              company: faker.company.companyName(),
              description: faker.lorem.sentences(3),
              type: ActivityType.VOLUNTEER,
              referenceLink: null,
            },
          },
        }

        const { getByRole } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(getByRole(`activityLink`)).toHaveAttribute(
          `href`,
          `/student/${id}/service#activity-${reference.referenceLink.activity?.id}`,
        )
      })

      it(`ACTIVISM`, () => {
        reference = {
          ...reference,
          type: ReferenceType.Activity,
          referenceLink: {
            ...reference.referenceLink,
            activity: {
              id: faker.random.number(10000),
              title: faker.lorem.words(2),
              startDate: null,
              endDate: null,
              company: faker.company.companyName(),
              description: faker.lorem.sentences(3),
              type: ActivityType.ACTIVISM,
              referenceLink: null,
            },
          },
        }

        const { getByRole } = render(<Reference reference={reference} />, {
          wrapper,
        })

        expect(getByRole(`activityLink`)).toHaveAttribute(
          `href`,
          `/student/${id}/service#activity-${reference.referenceLink.activity?.id}`,
        )
      })
    })
  })
})
