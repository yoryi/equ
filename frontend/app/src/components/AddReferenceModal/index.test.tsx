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

import i18n from "../../services/i18n"
import * as actions from "../../store/actions"
//Types
import { Activity, ActivityType,ReferenceType } from "../../store/types"
//Components
import AddReferenceModal from "./"

describe(`AddReferenceModal component`, () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const toastSpy = jest
    .spyOn(toast, `error`)
    .mockImplementation((() => {}) as any)

  const mockStore = configureStore([promiseMiddleware])
  const store = mockStore()

  const wrapper: React.FC = ({ children }) => (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>{children}</Provider>
    </I18nextProvider>
  )

  afterEach(() => {
    store.clearActions()
    toastSpy.mockReset()
  })

  it(`should render and match the snapshot`, () => {
    const { container } = render(
      <AddReferenceModal
        onClose={jest.fn()}
        referenceType={ReferenceType.Academic}
        visible
      />,
      {
        wrapper,
      },
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  describe(`should submit the form`, () => {
    let email: string
    beforeEach(() => {
      email = faker.internet.email()
    })

    describe(`academic reference`, () => {
      it(`success`, async () => {
        const action = actions.sendReferenceLink({
          type: ReferenceType.Academic,
          email,
        })
        const onClose = jest.fn()

        const { getByLabelText } = render(
          <AddReferenceModal
            onClose={onClose}
            referenceType={ReferenceType.Academic}
            visible
          />,
          { wrapper },
        )

        act(() => {
          fireEvent.change(
            getByLabelText(
              i18n.t(
                `screens:profile.student.transcriptScreen.enterEmailAddressBelow`,
              ),
            ),
            {
              target: { value: email },
            },
          )
        })

        await act(async () => {
          fireEvent.click(getByLabelText(`submit`))
        })

        await act(async () => {
          store
            .getActions()
            .find(({ type }) => type === action.type)
            ?.meta.promise.resolve()
        })

        expect(
          store.getActions().find(({ type }) => type === action.type).payload,
        ).toEqual(action.payload)
        expect(onClose).toHaveBeenCalled()
      })

      describe(`failure`, () => {
        it(`validation error`, async () => {
          const action = actions.sendReferenceLink({
            type: ReferenceType.Academic,
            email,
          })
          const onClose = jest.fn()
          const errors = {
            email: faker.lorem.sentence(),
          }

          const { getByLabelText, queryByText } = render(
            <AddReferenceModal
              onClose={onClose}
              referenceType={ReferenceType.Academic}
              visible
            />,
            { wrapper },
          )

          act(() => {
            fireEvent.change(
              getByLabelText(
                i18n.t(
                  `screens:profile.student.transcriptScreen.enterEmailAddressBelow`,
                ),
              ),
              {
                target: { value: email },
              },
            )
          })

          await act(async () => {
            fireEvent.click(getByLabelText(`submit`))
          })

          await act(async () => {
            store
              .getActions()
              .find(({ type }) => type === action.type)
              ?.meta.promise.reject({ errors })
          })

          expect(
            store.getActions().find(({ type }) => type === action.type).payload,
          ).toEqual(action.payload)
          expect(queryByText(errors.email)).not.toBeNull()
          expect(onClose).not.toHaveBeenCalled()
        })

        it(`message error`, async () => {
          const action = actions.sendReferenceLink({
            type: ReferenceType.Academic,
            email,
          })
          const onClose = jest.fn()
          const message = faker.lorem.sentence()

          const { getByLabelText } = render(
            <AddReferenceModal
              onClose={onClose}
              referenceType={ReferenceType.Academic}
              visible
            />,
            { wrapper },
          )

          act(() => {
            fireEvent.change(
              getByLabelText(
                i18n.t(
                  `screens:profile.student.transcriptScreen.enterEmailAddressBelow`,
                ),
              ),
              {
                target: { value: email },
              },
            )
          })

          await act(async () => {
            fireEvent.click(getByLabelText(`submit`))
          })

          await act(async () => {
            store
              .getActions()
              .find(({ type }) => type === action.type)
              ?.meta.promise.reject({ message })
          })

          expect(
            store.getActions().find(({ type }) => type === action.type).payload,
          ).toEqual(action.payload)
          expect(toastSpy).toHaveBeenCalledWith(message)
          expect(onClose).not.toHaveBeenCalled()
        })
      })
    })

    describe(`activity reference`, () => {
      let activity: Activity
      beforeEach(() => {
        activity = {
          id: faker.random.number(10000),
          title: faker.lorem.words(2),
          startDate: null,
          endDate: null,
          company: faker.company.companyName(),
          description: faker.lorem.sentences(2),
          type: _.sample([
            ActivityType.EMPLOYMENT,
            ActivityType.INTERNSHIP,
          ]) as ActivityType,
          referenceLink: null,
        }
      })

      it(`success`, async () => {
        const action = actions.sendReferenceLink({
          type: ReferenceType.Activity,
          email,
          activity,
        })
        const onClose = jest.fn()

        const { getByLabelText, getByText } = render(
          <AddReferenceModal
            onClose={onClose}
            referenceType={ReferenceType.Activity}
            activity={activity}
            visible
          />,
          { wrapper },
        )

        act(() => {
          fireEvent.change(
            getByLabelText(
              i18n.t(
                `screens:profile.student.transcriptScreen.enterEmailAddressBelow`,
              ),
            ),
            {
              target: { value: email },
            },
          )
        })

        await act(async () => {
          fireEvent.click(getByLabelText(`submit`))
        })

        await act(async () => {
          store
            .getActions()
            .find(({ type }) => type === action.type)
            ?.meta.promise.resolve()
        })

        expect(
          store.getActions().find(({ type }) => type === action.type).payload,
        ).toEqual(action.payload)
        expect(onClose).toHaveBeenCalled()

        await act(async () => {
          fireEvent.click(getByText(i18n.t(`common:continue`)))
        })

        // TODO Fix failing expect
        // expect(queryAllByRole('dialog').length).toEqual(1);
      })

      describe(`failure`, () => {
        it(`validation error`, async () => {
          const action = actions.sendReferenceLink({
            type: ReferenceType.Activity,
            email,
            activity,
          })
          const onClose = jest.fn()
          const errors = {
            email: faker.lorem.sentence(),
          }

          const { getByLabelText, queryByText } = render(
            <AddReferenceModal
              onClose={onClose}
              referenceType={ReferenceType.Activity}
              activity={activity}
              visible
            />,
            { wrapper },
          )

          act(() => {
            fireEvent.change(
              getByLabelText(
                i18n.t(
                  `screens:profile.student.transcriptScreen.enterEmailAddressBelow`,
                ),
              ),
              {
                target: { value: email },
              },
            )
          })

          await act(async () => {
            fireEvent.click(getByLabelText(`submit`))
          })

          await act(async () => {
            store
              .getActions()
              .find(({ type }) => type === action.type)
              ?.meta.promise.reject({ errors })
          })

          expect(
            store.getActions().find(({ type }) => type === action.type).payload,
          ).toEqual(action.payload)
          expect(queryByText(errors.email)).not.toBeNull()
          expect(onClose).not.toHaveBeenCalled()
        })

        it(`message error`, async () => {
          const action = actions.sendReferenceLink({
            type: ReferenceType.Activity,
            email,
            activity,
          })
          const onClose = jest.fn()
          const message = faker.lorem.sentence()

          const { getByLabelText } = render(
            <AddReferenceModal
              onClose={onClose}
              referenceType={ReferenceType.Activity}
              activity={activity}
              visible
            />,
            { wrapper },
          )

          act(() => {
            fireEvent.change(
              getByLabelText(
                i18n.t(
                  `screens:profile.student.transcriptScreen.enterEmailAddressBelow`,
                ),
              ),
              {
                target: { value: email },
              },
            )
          })

          await act(async () => {
            fireEvent.click(getByLabelText(`submit`))
          })

          await act(async () => {
            store
              .getActions()
              .find(({ type }) => type === action.type)
              ?.meta.promise.reject({ message })
          })

          expect(
            store.getActions().find(({ type }) => type === action.type).payload,
          ).toEqual(action.payload)
          expect(toastSpy).toHaveBeenCalledWith(message)
          expect(onClose).not.toHaveBeenCalled()
        })
      })
    })
  })
})
