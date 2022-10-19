// @ts-ignore
import { promiseMiddleware } from "@adobe/redux-saga-promise"
//Testing
import { act, fireEvent,render } from "@testing-library/react"
import faker from "faker"
import * as React from "react"
//Services
import toast from "react-hot-toast"
//Translations
import { I18nextProvider } from "react-i18next"
//Redux store
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"

import i18n from "../../services/i18n"
import * as actions from "../../store/actions"
//Types
import { Activity, ActivityType, Journey } from "../../store/types"
//Components
import EditJourneyDescriptionModal from "./"

describe(`EditJourneyDescriptionModal component`, () => {
  const toastSpy = jest.spyOn(toast, `error`)

  const mockStore = configureStore([promiseMiddleware])
  const store = mockStore()

  const wrapper: React.FC = ({ children }) => (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>{children}</Provider>
    </I18nextProvider>
  )

  let activity: Activity, journey: Journey
  beforeEach(() => {
    journey = {
      id: faker.random.number(10000),
      description: faker.lorem.sentences(1),
      media: {
        id: faker.random.number(10000),
        path: faker.image.imageUrl(),
      },
    }
    activity = {
      id: faker.random.number(10000),
      title: faker.lorem.words(2),
      startDate: null,
      endDate: null,
      description: faker.lorem.sentences(1),
      type: ActivityType.ACADEMIC_ART,
      journeys: [journey],
      referenceLink: null,
    }
  })

  afterEach(() => {
    store.clearActions()
    toastSpy.mockClear()
  })

  describe(`should render properly`, () => {
    describe(`visibility`, () => {
      it(`visible`, () => {
        const { queryByRole } = render(
          <EditJourneyDescriptionModal
            visible={true}
            onClose={jest.fn()}
            activity={activity}
            journey={journey}
          />,
          { wrapper },
        )

        expect(
          queryByRole(`dialog`, {
            name: `edit-journey-description-modal`,
          }),
        ).not.toBeNull()
      })

      it(`hidden`, () => {
        const { queryByRole } = render(
          <EditJourneyDescriptionModal
            visible={false}
            onClose={jest.fn()}
            activity={activity}
            journey={journey}
          />,
          { wrapper },
        )

        expect(
          queryByRole(`dialog`, {
            name: `edit-journey-description-modal`,
          }),
        ).toBeNull()
      })
    })

    describe(`description`, () => {
      it(`present`, () => {
        const { getByPlaceholderText } = render(
          <EditJourneyDescriptionModal
            visible={true}
            onClose={jest.fn()}
            activity={activity}
            journey={journey}
          />,
          { wrapper },
        )

        expect(
          (getByPlaceholderText(
            i18n.t(`common:enterJourneyDescription`),
          ) as HTMLTextAreaElement).value,
        ).toEqual(journey.description)
      })

      it(`empty`, () => {
        journey.description = undefined

        const { getByPlaceholderText } = render(
          <EditJourneyDescriptionModal
            visible={true}
            onClose={jest.fn()}
            activity={activity}
            journey={journey}
          />,
          { wrapper },
        )

        expect(
          (getByPlaceholderText(
            i18n.t(`common:enterJourneyDescription`),
          ) as HTMLTextAreaElement).value.length,
        ).toEqual(0)
      })
    })
  })

  describe(`should handle user interaction`, () => {
    it(`close button click`, () => {
      const onClose = jest.fn()

      const { getByRole } = render(
        <EditJourneyDescriptionModal
          visible={true}
          onClose={onClose}
          activity={activity}
          journey={journey}
        />,
        { wrapper },
      )

      act(() => {
        fireEvent.click(getByRole(`button`, { name: `close` }))
      })

      expect(onClose).toHaveBeenCalled()
    })

    it(`close success modal button click`, async () => {
      const onClose = jest.fn()
      const action = actions.addJourneyDescription({
        activityId: activity.id,
        journeyId: journey.id,
        description: faker.lorem.sentences(1),
        activityType: activity.type,
      })

      const {
        getByPlaceholderText,
        getByRole,
      } = render(
        <EditJourneyDescriptionModal
          visible={true}
          onClose={onClose}
          activity={activity}
          journey={journey}
        />,
        { wrapper },
      )

      await act(async () => {
        fireEvent.change(
          getByPlaceholderText(
            i18n.t(`common:enterJourneyDescription`),
          ),
          { target: { value: action.payload.description } },
        )
      })

      await act(async () => {
        fireEvent.click(getByRole(`button`, { name: `submit` }))
      })

      await act(async () => {
        store
          .getActions()
          .find(({ type }) => type === action.type)
          ?.meta.promise.resolve()
      })

      act(() => {
        fireEvent.click(getByRole(`button`, { name: `continue`, hidden: true }))
      })

      expect(onClose).toHaveBeenCalled()
    })
  })

  describe(`should fill out the form`, () => {
    describe(`activity type`, () => {
      describe(`spirit`, () => {
        beforeEach(() => {
          activity.type = ActivityType.SPIRIT
        })

        describe(`success`, () => {
          it(`changed description`, async () => {
            const onClose = jest.fn()
            const description = faker.lorem.sentences(1)

            const action = actions.addDescriptionSpiritJourney({
              activityId: activity.id,
              journeyId: journey.id,
              description,
              activityType: activity.type,
            })

            const {
              getByPlaceholderText,
              getByRole,
              queryByRole,
            } = render(
              <EditJourneyDescriptionModal
                visible={true}
                onClose={onClose}
                activity={activity}
                journey={journey}
              />,
              { wrapper },
            )

            await act(async () => {
              fireEvent.change(
                getByPlaceholderText(
                  i18n.t(`common:enterJourneyDescription`),
                ),
                { target: { value: description } },
              )
            })

            await act(async () => {
              fireEvent.click(getByRole(`button`, { name: `submit` }))
            })

            await act(async () => {
              store
                .getActions()
                .find(({ type }) => type === action.type)
                ?.meta.promise.resolve()
            })

            expect(
              store.getActions().find(({ type }) => type === action.type)
                ?.payload,
            ).toEqual(action.payload)
            expect(
              queryByRole(`dialog`, { name: `success-modal` }),
            ).not.toBeNull()
          })

          it(`same description`, async () => {
            const onClose = jest.fn()

            const action = actions.addDescriptionSpiritJourney({
              activityId: activity.id,
              journeyId: journey.id,
              description: journey.description!,
              activityType: activity.type,
            })

            const { getByRole } = render(
              <EditJourneyDescriptionModal
                visible={true}
                onClose={onClose}
                activity={activity}
                journey={journey}
              />,
              { wrapper },
            )

            await act(async () => {
              fireEvent.click(getByRole(`button`, { name: `submit` }))
            })

            await act(async () => {
              store
                .getActions()
                .find(({ type }) => type === action.type)
                ?.meta.promise.resolve()
            })

            expect(
              store.getActions().find(({ type }) => type === action.type)
                ?.payload,
            ).toEqual(action.payload)
            expect(onClose).toHaveBeenCalled()
          })
        })
      })

      describe(`other`, () => {
        describe(`success`, () => {
          it(`changed description`, async () => {
            const onClose = jest.fn()
            const description = faker.lorem.sentences(1)

            const action = actions.addJourneyDescription({
              activityId: activity.id,
              journeyId: journey.id,
              description,
              activityType: activity.type,
            })

            const {
              getByPlaceholderText,
              getByRole,
              queryByRole,
            } = render(
              <EditJourneyDescriptionModal
                visible={true}
                onClose={onClose}
                activity={activity}
                journey={journey}
              />,
              { wrapper },
            )

            await act(async () => {
              fireEvent.change(
                getByPlaceholderText(
                  i18n.t(`common:enterJourneyDescription`),
                ),
                { target: { value: description } },
              )
            })

            await act(async () => {
              fireEvent.click(getByRole(`button`, { name: `submit` }))
            })

            await act(async () => {
              store
                .getActions()
                .find(({ type }) => type === action.type)
                ?.meta.promise.resolve()
            })

            expect(
              store.getActions().find(({ type }) => type === action.type)
                ?.payload,
            ).toEqual(action.payload)
            expect(
              queryByRole(`dialog`, { name: `success-modal` }),
            ).not.toBeNull()
          })

          it(`same description`, async () => {
            const onClose = jest.fn()

            const action = actions.addJourneyDescription({
              activityId: activity.id,
              journeyId: journey.id,
              description: journey.description!,
              activityType: activity.type,
            })

            const { getByRole } = render(
              <EditJourneyDescriptionModal
                visible={true}
                onClose={onClose}
                activity={activity}
                journey={journey}
              />,
              { wrapper },
            )

            await act(async () => {
              fireEvent.click(getByRole(`button`, { name: `submit` }))
            })

            await act(async () => {
              store
                .getActions()
                .find(({ type }) => type === action.type)
                ?.meta.promise.resolve()
            })

            expect(
              store.getActions().find(({ type }) => type === action.type)
                ?.payload,
            ).toEqual(action.payload)
            expect(onClose).toHaveBeenCalled()
          })
        })
      })
    })

    describe(`failure`, () => {
      it(`validation error`, async () => {
        const description = faker.lorem.sentences(10)

        const action = actions.addJourneyDescription({
          activityId: activity.id,
          journeyId: journey.id,
          description,
          activityType: activity.type,
        })

        const {
          getByPlaceholderText,
          getByRole,
          queryByText,
        } = render(
          <EditJourneyDescriptionModal
            visible={true}
            onClose={jest.fn()}
            activity={activity}
            journey={journey}
          />,
          { wrapper },
        )

        await act(async () => {
          fireEvent.change(
            getByPlaceholderText(
              i18n.t(`common:enterJourneyDescription`),
            ),
            { target: { value: description } },
          )
        })

        await act(async () => {
          fireEvent.click(getByRole(`button`, { name: `submit` }))
        })

        expect(
          queryByText(
            i18n.t(`errors:maximumNumberOfCharacters`, { count: 140 }),
          ),
        ).not.toBeNull()
        expect(
          store.getActions().find(({ type }) => type === action.type),
        ).toBeUndefined()
      })

      it(`toast notification`, async () => {
        const message = faker.lorem.sentence()
        const description = faker.lorem.sentences(1)

        const action = actions.addJourneyDescription({
          activityId: activity.id,
          journeyId: journey.id,
          description,
          activityType: activity.type,
        })

        const {
          getByPlaceholderText,
          getByRole,
        } = render(
          <EditJourneyDescriptionModal
            visible={true}
            onClose={jest.fn()}
            activity={activity}
            journey={journey}
          />,
          { wrapper },
        )

        await act(async () => {
          fireEvent.change(
            getByPlaceholderText(
              i18n.t(`common:enterJourneyDescription`),
            ),
            { target: { value: description } },
          )
        })

        await act(async () => {
          fireEvent.click(getByRole(`button`, { name: `submit` }))
        })

        await act(async () => {
          store
            .getActions()
            .find(({ type }) => type === action.type)
            ?.meta.promise.reject({ message })
        })

        expect(
          store.getActions().find(({ type }) => type === action.type)?.payload,
        ).toEqual(action.payload)
        expect(toastSpy).toHaveBeenCalledWith(message)
      })

      it(`other error`, async () => {
        const onClose = jest.fn()
        const description = faker.lorem.sentences(1)

        const action = actions.addJourneyDescription({
          activityId: activity.id,
          journeyId: journey.id,
          description,
          activityType: activity.type,
        })

        const {
          getByPlaceholderText,
          getByRole,
        } = render(
          <EditJourneyDescriptionModal
            visible={true}
            onClose={onClose}
            activity={activity}
            journey={journey}
          />,
          { wrapper },
        )

        await act(async () => {
          fireEvent.change(
            getByPlaceholderText(
              i18n.t(`common:enterJourneyDescription`),
            ),
            { target: { value: description } },
          )
        })

        await act(async () => {
          fireEvent.click(getByRole(`button`, { name: `submit` }))
        })

        await act(async () => {
          store
            .getActions()
            .find(({ type }) => type === action.type)
            ?.meta.promise.reject({ message: null })
        })

        expect(
          store.getActions().find(({ type }) => type === action.type)?.payload,
        ).toEqual(action.payload)
        expect(onClose).not.toHaveBeenCalled()
        expect(toastSpy).not.toHaveBeenCalled()
      })
    })
  })
})
