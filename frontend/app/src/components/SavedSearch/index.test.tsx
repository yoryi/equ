//@ts-ignore
import { promiseMiddleware } from "@adobe/redux-saga-promise"
//Testing
import { act,fireEvent, render } from "@testing-library/react"
import faker from "faker"
import * as React from "react"
//Translations
import { I18nextProvider } from "react-i18next"
//Redux store
import { Provider } from "react-redux"
//Navigation
import { MemoryRouter } from "react-router"
import configureStore from "redux-mock-store"

import i18n from "../../services/i18n"
import * as actions from "../../store/actions"
//Types
import { Search } from "../../store/types"
//Components
import SavedSearch from "./"

describe(`SavedSearch component`, () => {
  faker.seed(1000)

  const mockStore = configureStore([promiseMiddleware])
  const store = mockStore()

  let search: Search.SavedSearch
  beforeEach(() => {
    search = {
      id: faker.random.number(10000),
      name: faker.lorem.words(2),
      matching: faker.random.number({ min: 100, max: 1000 }),
      query: faker.lorem.words(2),
    }
  })

  afterEach(() => {
    store.clearActions()
  })

  const wrapper: React.FC = ({ children }) => (
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>{children}</Provider>
      </I18nextProvider>
    </MemoryRouter>
  )

  describe(`should render and match the snapshot`, () => {
    it(`non removable`, () => {
      const { container } = render(<SavedSearch search={search} />, {
        wrapper,
      })

      expect(container.firstChild).toMatchSnapshot()
    })

    it(`removable`, () => {
      const { container } = render(<SavedSearch search={search} removable />, {
        wrapper,
      })

      expect(container.firstChild).toMatchSnapshot()
    })

    it(`no matching count`, () => {
      search = {
        ...search,
        matching: null,
      }

      const { container } = render(<SavedSearch search={search} removable />, {
        wrapper,
      })

      expect(container.firstChild).toMatchSnapshot()
    })
  })

  it(`should execute query`, () => {
    const { getByRole } = render(<SavedSearch search={search} />, {
      wrapper,
    })

    act(() => {
      fireEvent.click(getByRole(`search`))
    })

    expect(store.getActions()).toContainEqual(
      actions.setSavedSearch(search.query),
    )
  })

  describe(`should attempt to delete saved search`, () => {
    it(`success`, () => {
      const action = actions.deleteSavedSearch(search)

      const { getByRole } = render(<SavedSearch search={search} removable />, {
        wrapper,
      })

      act(() => {
        fireEvent.click(getByRole(`delete`))

        store
          .getActions()
          .find(({ type }) => type === action.type)
          ?.meta.promise.resolve()
      })

      expect(
        store.getActions().find(({ type }) => type === action.type).payload,
      ).toEqual(action.payload)
    })
  })
})
