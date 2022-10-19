//Types
import { Action } from "redux"

import * as Actions from "../../actions/actions"
import * as ActionTypes from "../../actions/media/actionTypes"
import * as Payloads from "../../actions/payloads"

export interface MediaReducer {
  mediaToken: string | null
}

export const initialState: MediaReducer = {
  mediaToken: null,
}

export default (
  state: MediaReducer = initialState,
  { type, ...action }: Actions.PayloadAction<any> | Action,
) => {
  switch (type) {
    case ActionTypes.RefreshMediaToken.Succeeded:
      const {
        mediaToken,
      } = (action as Actions.PayloadAction<Payloads.MediaTokenPayload>).payload
      return {
        ...state,
        mediaToken,
      }
    default:
      return state
  }
}
