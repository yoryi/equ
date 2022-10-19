// @ts-ignore
import { createPromiseAction } from "@adobe/redux-saga-promise"

import { HelpPayload } from "../../types"
//Types
import * as Actions from "../actions"
import * as ActionTypes from "./actionTypes"

export const sendHelpMessage = (
  payload: HelpPayload,
): Actions.PromiseAction<HelpPayload> =>
  createPromiseAction(ActionTypes.SendHelpMessage.Trigger)(payload)
