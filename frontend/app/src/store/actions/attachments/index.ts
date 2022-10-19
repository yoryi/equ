// @ts-ignore
import { createPromiseAction } from "@adobe/redux-saga-promise"
//Types
import { Action } from "redux"

import * as Actions from "../actions"
//Action types
import * as ActionTypes from "./actionTypes"
import * as Payloads from "./payloads"

export const getAttachments = (): Action => ({
  type: ActionTypes.GetAttachments.Trigger,
})

export const getAttachmentsSucceeded = (
  payload: Payloads.AttachmentPayload,
): Actions.PayloadAction<Payloads.AttachmentPayload> => ({
  type: ActionTypes.GetAttachments.Succeeded,
  payload,
})

export const getAttachmentsFailed = (): Action => ({
  type: ActionTypes.GetAttachments.Failed,
})

export const updateAttachments = (
  payload: Payloads.UpdateAttachments,
): Actions.PromiseAction<Payloads.UpdateAttachments> =>
  createPromiseAction(ActionTypes.UpdateAttachments.Trigger)(payload)

export const updateAttachmentsSucceeded = (
  payload: Payloads.AttachmentPayload,
): Actions.PayloadAction<Payloads.AttachmentPayload> => ({
  type: ActionTypes.UpdateAttachments.Succeeded,
  payload,
})

export const deleteAttachment = (
  payload: Payloads.DeleteAttachment,
): Actions.PromiseAction<Payloads.DeleteAttachment> =>
  createPromiseAction(ActionTypes.DeleteAttachment.Trigger)(payload)

export const deleteAttachmentSucceeded = (
  payload: Payloads.DeleteAttachment,
) => ({
  type: ActionTypes.DeleteAttachment.Succeeded,
  payload,
})
