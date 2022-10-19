//Actions
//Types
import { Action } from "redux"

import * as actions from "../../actions"
import * as ActionTypes from "../../actions/actionTypes"
import { Notifications, NotificationType } from "../../types"

export interface NotificationsReducer {
  notifications: Notifications | null
  canLoadMore: boolean
}

export const initialState: NotificationsReducer = {
  notifications: null,
  canLoadMore: true,
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GetNotifications.Succeeded: {
      const { notifications, loadMore, canLoadMore } = (action as ReturnType<
        typeof actions.getNotificationsSucceeded
      >).payload
      return {
        ...state,
        notifications: loadMore
          ? [...(state.notifications ?? []), ...notifications]
          : notifications,
        canLoadMore,
      }
    }
    case ActionTypes.AcceptFollowRequest.Succeeded:
    case ActionTypes.DeclineFollowRequest.Succeeded: {
      if (!state.notifications) {
        return state
      }

      const notification = (action as ReturnType<
        typeof actions.acceptFollowRequestSucceeded
      >).payload
      return {
        ...state,
        notifications: state.notifications.filter(
          ({ id }) => id !== notification.id,
        ),
      }
    }
    case ActionTypes.AcceptAllFollowRequests.Succeeded: {
      if (!state.notifications) {
        return state
      }

      return {
        ...state,
        notifications: state.notifications.filter(
          ({ actionType }) => actionType != NotificationType.FollowRequest,
        ),
      }
    }
    case ActionTypes.MarkNotificationsAsRead.Succeeded: {
      const payload = (action as ReturnType<
        typeof actions.markNotificationsAsReadSucceeded
      >).payload
      return {
        ...state,
        notifications:
          state.notifications?.map((notification) => {
            if (payload.find(({ id }) => id === notification.id)) {
              notification.readAt = JSON.stringify(new Date())
            }
            return notification
          }) ?? [],
      }
    }
    case ActionTypes.DeleteNotification.Succeeded: {
      const payload = (action as ReturnType<
        typeof actions.deleteNotificationSucceeded
      >).payload
      return {
        ...state,
        notifications:
          state.notifications?.filter(({ id }) => id !== payload.id) ?? [],
      }
    }
    default: {
      return state
    }
  }
}
