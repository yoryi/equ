// @ts-ignore
import { promiseMiddleware } from "@adobe/redux-saga-promise"
import { applyMiddleware, combineReducers,createStore } from "redux"
//Tools
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import { all } from "redux-saga/effects"

import admin from "./reducers/admin/reducer"
//Reducers
import auth from "./reducers/auth/reducer"
import follow from "./reducers/follow"
import media from "./reducers/media/reducer"
import notifications from "./reducers/notifications"
import profile from "./reducers/profile/reducer"
import searchAndFilters from "./reducers/searchAndFilters/reducer"
import settings from "./reducers/settings/reducer"
import shared from "./reducers/shared/reducer"
import student from "./reducers/student"
import surveys from "./reducers/surveys/reducer"
import university from "./reducers/university"
import { adminSaga } from "./sagas/admin/saga"
import { attachmentsSaga } from "./sagas/attachments/saga"
//Sagas
import { authSaga } from "./sagas/auth/saga"
import { followSaga } from "./sagas/follow"
import { helpSaga } from "./sagas/help"
import { journeySaga } from "./sagas/journeys/saga"
import { mediaSaga } from "./sagas/media/saga"
import { notificationsSaga } from "./sagas/notifications"
import { profileSaga } from "./sagas/profile/saga"
import { searchAndFiltersSaga } from "./sagas/searchAndFilters/saga"
import { settingsSaga } from "./sagas/settings/saga"
import { sharedSaga } from "./sagas/shared/saga"
import { studentSaga } from "./sagas/student"
import { surveysSaga } from "./sagas/surveys/saga"
import { universitySaga } from "./sagas/university"

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  combineReducers({
    auth,
    media,
    notifications,
    profile,
    shared,
    settings,
    student,
    surveys,
    university,
    follow,
    searchAndFilters,
    admin,
  }),
  composeWithDevTools(applyMiddleware(promiseMiddleware, sagaMiddleware)),
)

function* saga() {
  yield all([
    ...authSaga,
    ...helpSaga,
    ...notificationsSaga,
    ...profileSaga,
    ...sharedSaga,
    ...settingsSaga,
    ...studentSaga,
    ...surveysSaga,
    ...journeySaga,
    ...attachmentsSaga,
    ...mediaSaga,
    ...universitySaga,
    ...followSaga,
    ...searchAndFiltersSaga,
    ...adminSaga,
  ])
}

sagaMiddleware.run(saga)
