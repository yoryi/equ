// @ts-ignore
import { promiseMiddleware } from "@adobe/redux-saga-promise"
import configureStore from "redux-mock-store"

export const mockStore = configureStore([promiseMiddleware])
