//Action creators
// @ts-ignore
import { createPromiseAction } from "@adobe/redux-saga-promise"
import { Action } from "redux"

import {
  Filters,
  FollowRequestNotification,
  Profile,
  Search,
  StudentProfile,
  University,
  UniversityProfile,
} from "../../types"
import * as Actions from "../actions"
//Types
import * as ActionTypes from "./actionTypes"

export const followStudent = (
  payload: Profile | StudentProfile,
): Actions.PromiseAction<Profile | StudentProfile> =>
  createPromiseAction(ActionTypes.FollowStudent.Trigger)(payload)
export const followStudentSucceeded = (
  payload: Profile | StudentProfile,
): Actions.PayloadAction<Profile | StudentProfile> => ({
  type: ActionTypes.FollowStudent.Succeeded,
  payload,
})

export const unfollowStudent = (
  payload: Profile | StudentProfile,
): Actions.PromiseAction<Profile | StudentProfile> =>
  createPromiseAction(ActionTypes.UnfollowStudent.Trigger)(payload)
export const unfollowStudentSucceeded = (
  payload: Profile | StudentProfile,
): Actions.PayloadAction<Profile | StudentProfile> => ({
  type: ActionTypes.UnfollowStudent.Succeeded,
  payload,
})

export const followUniversity = (
  payload: University | UniversityProfile,
): Actions.PromiseAction<University | UniversityProfile> =>
  createPromiseAction(ActionTypes.FollowUniversity.Trigger)(payload)
export const followUniversitySucceeded = (
  payload: University | UniversityProfile,
): Actions.PayloadAction<University | UniversityProfile> => ({
  type: ActionTypes.FollowUniversity.Succeeded,
  payload,
})

export const unfollowUniversity = (
  payload: University | UniversityProfile,
): Actions.PromiseAction<University | UniversityProfile> =>
  createPromiseAction(ActionTypes.UnfollowUniversity.Trigger)(payload)
export const unfollowUniversitySucceeded = (
  payload: University | UniversityProfile | Search.UniversityResult,
): Actions.PayloadAction<
  University | UniversityProfile | Search.UniversityResult
> => ({
  type: ActionTypes.UnfollowUniversity.Succeeded,
  payload,
})

export const acceptFollowRequest = (
  payload: FollowRequestNotification,
): Actions.PayloadAction<FollowRequestNotification> => ({
  type: ActionTypes.AcceptFollowRequest.Trigger,
  payload,
})
export const acceptFollowRequestSucceeded = (
  payload: FollowRequestNotification,
): Actions.PayloadAction<FollowRequestNotification> => ({
  type: ActionTypes.AcceptFollowRequest.Succeeded,
  payload,
})

export const declineFollowRequest = (
  payload: FollowRequestNotification,
): Actions.PayloadAction<FollowRequestNotification> => ({
  type: ActionTypes.DeclineFollowRequest.Trigger,
  payload,
})
export const declineFollowRequestSucceeded = (
  payload: FollowRequestNotification,
): Actions.PayloadAction<FollowRequestNotification> => ({
  type: ActionTypes.DeclineFollowRequest.Succeeded,
  payload,
})

export const acceptAllFollowRequests = (): Action => ({
  type: ActionTypes.AcceptAllFollowRequests.Trigger,
})
export const acceptAllFollowRequestsSucceeded = (): Action => ({
  type: ActionTypes.AcceptAllFollowRequests.Succeeded,
})

export const addDreamUniversity = (
  payload: UniversityProfile,
): Actions.PromiseAction<UniversityProfile> =>
  createPromiseAction(ActionTypes.AddDreamUniversity.Trigger)(payload)
export const addDreamUniversitySucceeded = (
  payload: UniversityProfile,
): Actions.PayloadAction<UniversityProfile> => ({
  type: ActionTypes.AddDreamUniversity.Succeeded,
  payload,
})

export const removeDreamUniversity = (
  payload: UniversityProfile,
): Actions.PromiseAction<UniversityProfile> =>
  createPromiseAction(ActionTypes.RemoveDreamUniversity.Trigger)(payload)
export const removeDreamUniversitySucceeded = (
  payload: UniversityProfile,
): Actions.PayloadAction<UniversityProfile> => ({
  type: ActionTypes.RemoveDreamUniversity.Succeeded,
  payload,
})

export const getYourSchools = (
  payload?: Filters.University,
): Actions.PromiseAction<Filters.University | undefined> =>
  createPromiseAction(ActionTypes.GetYourSchools.Trigger)(payload)
export const getYourSchoolsSucceeded = (
  payload: UniversityProfile[],
): Actions.PayloadAction<UniversityProfile[]> => ({
  type: ActionTypes.GetYourSchools.Succeeded,
  payload,
})

export const getRecommendedUniversities = (): Action => ({
  type: ActionTypes.GetRecommendedUniversities.Trigger,
})
export const getRecommendedUniversitiesSucceeded = (
  payload: UniversityProfile[],
): Actions.PayloadAction<UniversityProfile[]> => ({
  type: ActionTypes.GetRecommendedUniversities.Succeeded,
  payload,
})
export const getRecommendedUniversitiesFailed = (
  isSurveyCompleted: boolean,
): Actions.PayloadAction<boolean> => ({
  type: ActionTypes.GetRecommendedUniversities.Failed,
  payload: isSurveyCompleted,
})

export const getFollowedStudents = (
  payload?: Filters.Student,
): Actions.PromiseAction<Filters.Student> =>
  createPromiseAction(ActionTypes.GetFollowedStudents.Trigger)(payload)
export const getFollowedStudentsSucceeded = (
  payload: StudentProfile[],
): Actions.PayloadAction<StudentProfile[]> => ({
  type: ActionTypes.GetFollowedStudents.Succeeded,
  payload,
})
