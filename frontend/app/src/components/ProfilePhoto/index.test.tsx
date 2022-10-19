//Testing
import { render } from "@testing-library/react"
import faker from "faker"
import * as React from "react"
//Redux store
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"

//Types
import {
  FollowRequestNotification,
  FollowRequestStatus,
  NotificationType,
  ReduxState,
  Reference,
  ReferenceType,
  Role,
  StudentProfile,
  UniversityProfile,
} from "../../store/types"
//Components
import ProfilePhoto from "./"

type TestStore = Pick<ReduxState, "media">

describe(`ProfilePhoto component`, () => {
  faker.seed(1000)

  const mockStore = configureStore<TestStore>()
  const store = mockStore({
    media: {
      mediaToken: faker.random.alphaNumeric(32),
    },
  })

  const wrapper: React.FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )

  describe(`should render and match the snapshot`, () => {
    let student: StudentProfile
    beforeEach(() => {
      student = {
        id: faker.random.number(10000),
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        schoolName: `${faker.lorem.word()} School`,
        schoolCity: faker.address.city(),
        schoolState: faker.address.stateAbbr(),
        graduation: faker.date.future(1, new Date(1612853271000)).getFullYear(),
        avatar: {
          path: faker.image.imageUrl(),
        },
        interests: [1],
        score: faker.random.number({ min: 75, max: 100 }),
      }
    })

    describe(`student`, () => {
      it(`profile photo set`, () => {
        const { container } = render(<ProfilePhoto student={student} />, {
          wrapper,
        })

        expect(container.firstChild).toMatchSnapshot()
      })

      it(`profile photo not set`, () => {
        student = {
          ...student,
          avatar: {
            path: undefined,
          },
        }

        const { container } = render(<ProfilePhoto student={student} />, {
          wrapper,
        })

        expect(container.firstChild).toMatchSnapshot()
      })
    })

    describe(`university`, () => {
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

      it(`profile photo set`, () => {
        const { container } = render(<ProfilePhoto university={university} />, {
          wrapper,
        })

        expect(container.firstChild).toMatchSnapshot()
      })

      it(`profile photo not set`, () => {
        university = {
          ...university,
          avatar: null,
        }

        const { container } = render(<ProfilePhoto university={university} />, {
          wrapper,
        })

        expect(container.firstChild).toMatchSnapshot()
      })
    })

    describe(`notification`, () => {
      let notification: FollowRequestNotification
      beforeEach(() => {
        notification = {
          id: faker.random.number(10000),
          status: FollowRequestStatus.Pending,
          createdAt: faker.date.past(1, new Date(1612853271000)).toJSON(),
          readAt: null,
          recipient: {
            id: faker.random.number(10000),
            email: faker.internet.email(),
            role: Role.University,
            extraData: null,
          },
          actionType: NotificationType.FollowRequest,
          sender: {
            id: faker.random.number(10000),
            role: Role.Student,
            extraData: {
              studentId: faker.random.number(10000),
              name: faker.name.findName(),
              avatar: faker.image.imageUrl(),
              privateAvatar: faker.random.number({
                min: 1,
                max: 16,
              }),
              interests: [1],
            },
          },
        }
      })

      it(`profile photo is set`, () => {
        const { container } = render(
          <ProfilePhoto notification={notification} />,
          { wrapper },
        )

        expect(container.firstChild).toMatchSnapshot()
      })

      it(`profile photo is not set`, () => {
        notification = {
          ...notification,
          sender: {
            id: faker.random.number(10000),
            role: Role.Student,
            extraData: {
              studentId: faker.random.number(10000),
              name: faker.name.findName(),
              avatar: undefined,
              privateAvatar: faker.random.number({
                min: 1,
                max: 16,
              }),
              interests: [1],
            },
          },
        }

        const { container } = render(
          <ProfilePhoto notification={notification} />,
          { wrapper },
        )

        expect(container.firstChild).toMatchSnapshot()
      })
    })

    describe(`reference`, () => {
      let reference: Reference
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
          isVisible: false,
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

      it(`media is set`, () => {
        const { container } = render(<ProfilePhoto reference={reference} />, {
          wrapper,
        })

        expect(container.firstChild).toMatchSnapshot()
      })

      it(`media is not set`, () => {
        reference = {
          ...reference,
          media: null,
        }

        const { container } = render(<ProfilePhoto reference={reference} />, {
          wrapper,
        })

        expect(container.firstChild).toMatchSnapshot()
      })
    })

    it(`loading`, () => {
      const { container } = render(<ProfilePhoto loading />, { wrapper })

      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
