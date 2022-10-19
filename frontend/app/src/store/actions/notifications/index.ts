//Action types
//Actions
//@ts-ignore
import { createPromiseAction } from "@adobe/redux-saga-promise"
//Types
import { Action } from "redux"

import {
  GetNotificationsPayload,
  GetNotificationsRequest,
  Notification,
} from "../../types"
import { PayloadAction, PromiseAction } from "../actions"
import * as ActionTypes from "./actionTypes"

export const startNotificationsTask = (): Action => ({
  type: ActionTypes.StartNotificationsTask.Trigger,
})

export const getNotifications = (
  payload: GetNotificationsRequest,
): PromiseAction<GetNotificationsRequest> =>
  createPromiseAction(ActionTypes.GetNotifications.Trigger)(payload)
export const getNotificationsSucceeded = (
  payload: GetNotificationsPayload,
): PayloadAction<GetNotificationsPayload> => ({
  type: ActionTypes.GetNotifications.Succeeded,
  payload,
})

export const markNotificationsAsRead = (
  payload: Notification[],
): PayloadAction<Notification[]> => ({
  type: ActionTypes.MarkNotificationsAsRead.Trigger,
  payload,
})
export const markNotificationsAsReadSucceeded = (
  payload: Notification[],
): PayloadAction<Notification[]> => ({
  type: ActionTypes.MarkNotificationsAsRead.Succeeded,
  payload,
})
export const markNotificationsAsReadFailed = (): Action => ({
  type: ActionTypes.MarkNotificationsAsRead.Failed,
})

export const deleteNotification = (
  payload: Notification,
): PromiseAction<Notification> =>
  createPromiseAction(ActionTypes.DeleteNotification.Trigger)(payload)
export const deleteNotificationSucceeded = (
  payload: Notification,
): PayloadAction<Notification> => ({
  type: ActionTypes.DeleteNotification.Succeeded,
  payload,
})
export const deleteNotificationFailed = (): Action => ({
  type: ActionTypes.DeleteNotification.Failed,
})
