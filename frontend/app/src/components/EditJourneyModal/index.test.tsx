// @ts-ignore
import { promiseMiddleware } from "@adobe/redux-saga-promise"
//Testing
import { act, fireEvent,render } from "@testing-library/react"
import faker from "faker"
import _ from "lodash"
import * as React from "react"
//Services
import toast from "react-hot-toast"
//Translations
import { I18nextProvider } from "react-i18next"
//Redux store
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"

//Constants
import fileLimits from "../../const/fileLimits"
import i18n from "../../services/i18n"
import * as actions from "../../store/actions"
//Types
import { Activity, ActivityType, Journey } from "../../store/types"
//Components
import EditJourneyModal from "./"

describe(`EditJourneyModal component`, () => {
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
      description: faker.lorem.sentence(1),
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
          <EditJourneyModal
            visible={true}
            onClose={jest.fn()}
            activity={activity}
            journey={journey}
          />,
          { wrapper },
        )

        expect(
          queryByRole(`dialog`, { name: `edit-journey-modal` }),
        ).not.toBeNull()
      })

      it(`hidden`, () => {
        const { queryByRole } = render(
          <EditJourneyModal
            visible={false}
            onClose={jest.fn()}
            activity={activity}
            journey={journey}
          />,
          { wrapper },
        )

        expect(queryByRole(`dialog`, { name: `edit-journey-modal` })).toBeNull()
      })
    })

    describe(`description button`, () => {
      it(`add description`, () => {
        journey.description = undefined

        const { queryByRole } = render(
          <EditJourneyModal
            visible={true}
            onClose={jest.fn()}
            activity={activity}
            journey={journey}
          />,
          { wrapper },
        )

        expect(
          queryByRole(`button`, { name: `description` })?.textContent,
        ).toEqual(i18n.t(`common:addDescription`))
      })

      it(`edit description`, () => {
        const { queryByRole } = render(
          <EditJourneyModal
            visible={true}
            onClose={jest.fn()}
            activity={activity}
            journey={journey}
          />,
          { wrapper },
        )

        expect(
          queryByRole(`button`, { name: `description` })?.textContent,
        ).toEqual(i18n.t(`common:editDescription`))
      })
    })
  })

  describe(`should handle user interactions`, () => {
    describe(`make first photo`, () => {
      describe(`activity type`, () => {
        it(`spirit`, () => {
          activity.type = ActivityType.SPIRIT

          const action = actions.makeFirstPhotoSpiritJourney({
            activityId: activity.id,
            journeyId: journey.id,
            activityType: activity.type,
          })

          const { getByRole } = render(
            <EditJourneyModal
              visible={true}
              onClose={jest.fn()}
              activity={activity}
              journey={journey}
            />,
            { wrapper },
          )

          act(() => {
            fireEvent.click(getByRole(`button`, { name: `make-first-photo` }))
          })

          expect(
            store.getActions().find(({ type }) => type === action.type)
              ?.payload,
          ).toEqual(action.payload)
        })

        it(`other`, () => {
          const action = actions.makeFirstPhotoJourney({
            activityId: activity.id,
            journeyId: journey.id,
            activityType: activity.type,
          })

          const { getByRole } = render(
            <EditJourneyModal
              visible={true}
              onClose={jest.fn()}
              activity={activity}
              journey={journey}
            />,
            { wrapper },
          )

          act(() => {
            fireEvent.click(getByRole(`button`, { name: `make-first-photo` }))
          })

          expect(
            store.getActions().find(({ type }) => type === action.type)
              ?.payload,
          ).toEqual(action.payload)
        })
      })
    })

    describe(`edit description modal`, () => {
      it(`open`, () => {
        const { getByRole, queryByRole } = render(
          <EditJourneyModal
            visible={true}
            onClose={jest.fn()}
            activity={activity}
            journey={journey}
          />,
          { wrapper },
        )

        act(() => {
          fireEvent.click(getByRole(`button`, { name: `description` }))
        })

        expect(
          queryByRole(`dialog`, { name: `edit-journey-description-modal` }),
        ).not.toBeNull()
      })

      it(`close`, () => {
        const {
          getByRole,
          getAllByRole,
          queryByRole,
        } = render(
          <EditJourneyModal
            visible={true}
            onClose={jest.fn()}
            activity={activity}
            journey={journey}
          />,
          { wrapper },
        )

        act(() => {
          fireEvent.click(getByRole(`button`, { name: `description` }))
        })

        act(() => {
          fireEvent.click(getAllByRole(`button`, { name: `close` })[1])
        })

        expect(
          queryByRole(`dialog`, { name: `edit-journey-description-modal` }),
        ).toBeNull()
      })
    })

    describe(`remove photo`, () => {
      describe(`success`, () => {
        describe(`activity type`, () => {
          it(`spirit`, async () => {
            activity.type = ActivityType.SPIRIT

            const onClose = jest.fn()

            const action = actions.removePhotoOrVideoSpirit({
              activityId: activity.id,
              journeyId: journey.id,
              activityType: activity.type,
            })

            const { getByRole } = render(
              <EditJourneyModal
                visible={true}
                onClose={onClose}
                activity={activity}
                journey={journey}
              />,
              { wrapper },
            )

            act(() => {
              fireEvent.click(getByRole(`button`, { name: `remove-photo` }))
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

          it(`other`, async () => {
            const onClose = jest.fn()

            const action = actions.removePhotoOrVideo({
              activityId: activity.id,
              journeyId: journey.id,
              activityType: activity.type,
            })

            const { getByRole } = render(
              <EditJourneyModal
                visible={true}
                onClose={onClose}
                activity={activity}
                journey={journey}
              />,
              { wrapper },
            )

            act(() => {
              fireEvent.click(getByRole(`button`, { name: `remove-photo` }))
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

      describe(`failure`, () => {
        it(`with message`, async () => {
          const message = faker.lorem.sentence()
          const onClose = jest.fn()

          const action = actions.removePhotoOrVideo({
            activityId: activity.id,
            journeyId: journey.id,
            activityType: activity.type,
          })

          const { getByRole } = render(
            <EditJourneyModal
              visible={true}
              onClose={onClose}
              activity={activity}
              journey={journey}
            />,
            { wrapper },
          )

          act(() => {
            fireEvent.click(getByRole(`button`, { name: `remove-photo` }))
          })

          await act(async () => {
            store
              .getActions()
              .find(({ type }) => type === action.type)
              ?.meta.promise.reject({ message })
          })

          expect(toastSpy).toHaveBeenCalledWith(message)
          expect(onClose).not.toHaveBeenCalled()
        })

        it(`without message`, async () => {
          const onClose = jest.fn()

          const action = actions.removePhotoOrVideo({
            activityId: activity.id,
            journeyId: journey.id,
            activityType: activity.type,
          })

          const { getByRole } = render(
            <EditJourneyModal
              visible={true}
              onClose={onClose}
              activity={activity}
              journey={journey}
            />,
            { wrapper },
          )

          act(() => {
            fireEvent.click(getByRole(`button`, { name: `remove-photo` }))
          })

          await act(async () => {
            store
              .getActions()
              .find(({ type }) => type === action.type)
              ?.meta.promise.reject({ message: null })
          })

          expect(toastSpy).not.toHaveBeenCalled()
          expect(onClose).not.toHaveBeenCalled()
        })
      })
    })

    describe(`upload media`, () => {
      describe(`meets file weight limit`, () => {
        let file: File
        beforeEach(() => {
          const blob = new Blob(
            [_.times(fileLimits.journeyMedia, () => `a`).join(``)],
            { type: `image/png` },
          )
          file = new File([blob], `${faker.lorem.word()}.png`)
        })

        describe(`success`, () => {
          describe(`activity type`, () => {
            it(`spirit`, async () => {
              activity.type = ActivityType.SPIRIT

              const formData = new FormData()
              formData.append(`image`, file)
              formData.append(`description`, ``)
              formData.append(`order`, `0`)

              const action = actions.updateSpiritJourney({
                activityId: activity.id,
                formData,
                activityType: activity.type,
              })

              const { getByAltText } = render(
                <EditJourneyModal
                  visible={true}
                  onClose={jest.fn()}
                  activity={activity}
                  journey={journey}
                />,
                { wrapper },
              )

              await act(async () => {
                fireEvent.change(getByAltText(`upload-media`), {
                  target: { files: [file] },
                })
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
            })

            it(`other`, async () => {
              const formData = new FormData()
              formData.append(`image`, file)
              formData.append(`description`, ``)
              formData.append(`order`, `0`)

              const action = actions.updateJourney({
                activityId: activity.id,
                formData,
                activityType: activity.type,
              })

              const { getByAltText } = render(
                <EditJourneyModal
                  visible={true}
                  onClose={jest.fn()}
                  activity={activity}
                  journey={journey}
                />,
                { wrapper },
              )

              await act(async () => {
                fireEvent.change(getByAltText(`upload-media`), {
                  target: { files: [file] },
                })
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
            })
          })
        })

        describe(`failure`, () => {
          it(`with message`, async () => {
            const message = faker.lorem.sentence()

            const formData = new FormData()
            formData.append(`image`, file)
            formData.append(`description`, ``)
            formData.append(`order`, `0`)

            const action = actions.updateJourney({
              activityId: activity.id,
              formData,
              activityType: activity.type,
            })

            const { getByAltText } = render(
              <EditJourneyModal
                visible={true}
                onClose={jest.fn()}
                activity={activity}
                journey={journey}
              />,
              { wrapper },
            )

            await act(async () => {
              fireEvent.change(getByAltText(`upload-media`), {
                target: { files: [file] },
              })
            })

            await act(async () => {
              store
                .getActions()
                .find(({ type }) => type === action.type)
                ?.meta.promise.reject({ message })
            })

            expect(
              store.getActions().find(({ type }) => type === action.type)
                ?.payload,
            ).toEqual(action.payload)
            expect(toastSpy).toHaveBeenCalledWith(message)
          })

          it(`without message`, async () => {
            const formData = new FormData()
            formData.append(`image`, file)
            formData.append(`description`, ``)
            formData.append(`order`, `0`)

            const action = actions.updateJourney({
              activityId: activity.id,
              formData,
              activityType: activity.type,
            })

            const { getByAltText } = render(
              <EditJourneyModal
                visible={true}
                onClose={jest.fn()}
                activity={activity}
                journey={journey}
              />,
              { wrapper },
            )

            await act(async () => {
              fireEvent.change(getByAltText(`upload-media`), {
                target: { files: [file] },
              })
            })

            await act(async () => {
              store
                .getActions()
                .find(({ type }) => type === action.type)
                ?.meta.promise.reject({ message: null })
            })

            expect(
              store.getActions().find(({ type }) => type === action.type)
                ?.payload,
            ).toEqual(action.payload)
            expect(toastSpy).not.toHaveBeenCalled()
          })
        })
      })

      it(`exceeds file weight limit`, async () => {
        const blob = new Blob(
          [_.times(fileLimits.journeyMedia + 1, () => `a`).join(``)],
          { type: `image/png` },
        )
        const file = new File([blob], `${faker.lorem.word()}.png`)

        const { getByAltText } = render(
          <EditJourneyModal
            visible={true}
            onClose={jest.fn()}
            activity={activity}
            journey={journey}
          />,
          { wrapper },
        )

        await act(async () => {
          fireEvent.change(getByAltText(`upload-media`), {
            target: { files: [file] },
          })
        })

        expect(toastSpy).toHaveBeenCalledWith(
          i18n.t(`errors:fileIsTooBig`, {
            limit: fileLimits.journeyMedia,
          }),
        )
      })
    })

    describe(`delete journey`, () => {
      describe(`success`, () => {
        describe(`activity type`, () => {
          it(`spirit`, async () => {
            activity.type = ActivityType.SPIRIT

            const action = actions.deleteSpiritJourney(activity)

            const { getByRole } = render(
              <EditJourneyModal
                visible={true}
                onClose={jest.fn()}
                activity={activity}
                journey={journey}
              />,
              { wrapper },
            )

            act(() => {
              fireEvent.click(getByRole(`button`, { name: `delete-journey` }))
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
          })

          it(`other`, async () => {
            const action = actions.deleteJourney(activity)

            const { getByRole } = render(
              <EditJourneyModal
                visible={true}
                onClose={jest.fn()}
                activity={activity}
                journey={journey}
              />,
              { wrapper },
            )

            act(() => {
              fireEvent.click(getByRole(`button`, { name: `delete-journey` }))
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
          })
        })
      })

      describe(`failure`, () => {
        it(`with message`, async () => {
          const message = faker.lorem.sentence()

          const action = actions.deleteJourney(activity)

          const { getByRole } = render(
            <EditJourneyModal
              visible={true}
              onClose={jest.fn()}
              activity={activity}
              journey={journey}
            />,
            { wrapper },
          )

          act(() => {
            fireEvent.click(getByRole(`button`, { name: `delete-journey` }))
          })

          await act(async () => {
            store
              .getActions()
              .find(({ type }) => type === action.type)
              ?.meta.promise.reject({ message })
          })

          expect(
            store.getActions().find(({ type }) => type === action.type)
              ?.payload,
          ).toEqual(action.payload)
          expect(toastSpy).toHaveBeenCalledWith(message)
        })

        it(`without message`, async () => {
          const action = actions.deleteJourney(activity)

          const { getByRole } = render(
            <EditJourneyModal
              visible={true}
              onClose={jest.fn()}
              activity={activity}
              journey={journey}
            />,
            { wrapper },
          )

          act(() => {
            fireEvent.click(getByRole(`button`, { name: `delete-journey` }))
          })

          await act(async () => {
            store
              .getActions()
              .find(({ type }) => type === action.type)
              ?.meta.promise.reject({ message: null })
          })

          expect(
            store.getActions().find(({ type }) => type === action.type)
              ?.payload,
          ).toEqual(action.payload)
          expect(toastSpy).not.toHaveBeenCalled()
        })
      })
    })
  })
})
