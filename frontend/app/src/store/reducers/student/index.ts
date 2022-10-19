//Actions
//Types
import { Action } from "redux"

import * as actions from "../../actions"
import * as Actions from "../../actions/actions"
import * as ActionTypes from "../../actions/actionTypes"
import * as Payloads from "../../actions/payloads"
import {   FollowRequestStatus,
  Profile,
  ProfileExtracurriculars,
  ProfileProfessional,
  ProfileRecognition,
  ProfileService,
  ProfileTranscript,
  Reference,
  ReferenceType,
StudentBeat ,
} from "../../types"


export interface StudentReducer {
  profile: Profile | null
  isProfileLoaded: boolean

  transcript: ProfileTranscript | null
  isTranscriptLoaded: boolean

  extracurriculars: ProfileExtracurriculars | null
  areExtracurricularsLoaded: boolean

  professional: ProfileProfessional | null
  isProfessionalLoaded: boolean

  service: ProfileService | null
  isServiceLoaded: boolean

  recognition: ProfileRecognition | null
  isRecognitionLoaded: boolean

  beat: StudentBeat | null
  showBeat: boolean

  academicReferences: Reference[] | null
  activityReferences: Reference[] | null
}

export const initialState: StudentReducer = {
  profile: null,
  isProfileLoaded: false,

  transcript: null,
  isTranscriptLoaded: false,

  extracurriculars: null,
  areExtracurricularsLoaded: false,

  professional: null,
  isProfessionalLoaded: false,

  service: null,
  isServiceLoaded: false,

  recognition: null,
  isRecognitionLoaded: false,

  beat: null,
  showBeat: false,

  academicReferences: null,
  activityReferences: null,
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GetStudentProfile.Trigger: {
      const id = (action as ReturnType<typeof actions.getStudentProfile>)
        .payload
      if (state.profile?.id === id) {
        return state
      }

      return {
        ...state,
        profile: null,
        isProfileLoaded: false,
        transcript: null,
        isTranscriptLoaded: false,
        extracurriculars: null,
        areExtracurricularsLoaded: false,
        professional: null,
        isProfessionalLoaded: false,
        service: null,
        isServiceLoaded: false,
        recognition: null,
        isRecognitionLoaded: false,
        academicReferences: null,
        activityReferences: null,
      }
    }
    case ActionTypes.GetStudentProfile.Succeeded: {
      const profile = (action as ReturnType<
        typeof actions.getStudentProfileSucceeded
      >).payload

      return {
        ...state,
        profile,
        isProfileLoaded: true,
        beat: null,
      }
    }
    case ActionTypes.GetStudentProfile.Failed: {
      const {
        loaded,
      } = (action as Actions.PayloadAction<Payloads.GetProfileFailedPayload>).payload
      return {
        ...state,
        isProfileLoading: false,
        isProfileLoaded: loaded,
        profile: null,
      }
    }
    case ActionTypes.GetStudentTranscript.Trigger: {
      return {
        ...state,
        transcript: null,
        isTranscriptLoaded: false,
      }
    }
    case ActionTypes.GetStudentTranscript.Succeeded: {
      const transcript = (action as ReturnType<
        typeof actions.getStudentTranscriptSucceeded
      >).payload

      return {
        ...state,
        transcript,
        isTranscriptLoaded: true,
      }
    }
    case ActionTypes.GetStudentTranscript.Failed: {
      return {
        ...state,
        isTranscriptLoaded: true,
      }
    }
    case ActionTypes.GetStudentExtracurriculars.Trigger: {
      return {
        ...state,
        extracurriculars: null,
        areExtracurricularsLoaded: false,
      }
    }
    case ActionTypes.GetStudentExtracurriculars.Succeeded: {
      const extracurriculars = (action as ReturnType<
        typeof actions.getStudentExtracurricularsSucceeded
      >).payload

      return {
        ...state,
        extracurriculars,
        areExtracurricularsLoaded: true,
      }
    }
    case ActionTypes.GetStudentExtracurriculars.Failed: {
      return {
        ...state,
        areExtracurricularsLoaded: true,
      }
    }
    case ActionTypes.GetStudentProfessional.Trigger: {
      return {
        ...state,
        professional: null,
        isProfessionalLoaded: false,
      }
    }
    case ActionTypes.GetStudentProfessional.Succeeded: {
      const professional = (action as ReturnType<
        typeof actions.getStudentProfessionalSucceeded
      >).payload

      return {
        ...state,
        professional,
        isProfessionalLoaded: true,
      }
    }
    case ActionTypes.GetStudentProfessional.Failed: {
      return {
        ...state,
        isProfessionalLoaded: true,
      }
    }
    case ActionTypes.GetStudentService.Trigger: {
      return {
        ...state,
        service: null,
        isServiceLoaded: false,
      }
    }
    case ActionTypes.GetStudentService.Succeeded: {
      const service = (action as ReturnType<
        typeof actions.getStudentServiceSucceeded
      >).payload

      return {
        ...state,
        service,
        isServiceLoaded: true,
      }
    }
    case ActionTypes.GetStudentService.Failed: {
      return {
        ...state,
        isServiceLoaded: true,
      }
    }
    case ActionTypes.GetStudentRecognition.Trigger: {
      return {
        ...state,
        recognition: null,
        isRecognitionLoaded: false,
      }
    }
    case ActionTypes.GetStudentRecognition.Succeeded: {
      const recognition = (action as ReturnType<
        typeof actions.getStudentRecognitionSucceeded
      >).payload

      return {
        ...state,
        recognition,
        isRecognitionLoaded: true,
      }
    }
    case ActionTypes.GetStudentRecognition.Failed: {
      return {
        ...state,
        isRecognitionLoaded: true,
      }
    }
    case ActionTypes.GetStudentEquediBeat.Succeeded: {
      const beat = (action as ReturnType<
        typeof actions.getStudentEquediBeatSucceeded
      >).payload

      return {
        ...state,
        beat,
        showBeat: !!beat.length,
      }
    }
    case ActionTypes.GetStudentEquediBeat.Failed: {
      return {
        ...state,
        beat: [],
        showBeat: false,
      }
    }
    case ActionTypes.GetStudentReferences.Succeeded: {
      const { type, references } = (action as ReturnType<
        typeof actions.getStudentReferencesSucceeded
      >).payload
      return {
        ...state,
        academicReferences:
          type === ReferenceType.Academic
            ? references
            : state.academicReferences,
        activityReferences:
          type === ReferenceType.Activity
            ? references
            : state.activityReferences,
      }
    }
    case ActionTypes.FollowStudent.Succeeded: {
      if (!state.profile) {
        return state
      }

      return {
        ...state,
        profile: {
          ...state.profile,
          followRequestStatus: FollowRequestStatus.Pending,
        },
      }
    }
    case ActionTypes.GetFullTranscript.Succeeded: {
      const payload = (action as Actions.PayloadAction<any>).payload
      if (!payload.id) {
        return state
      }

      return {
        ...state,
        transcript: {
          ...(state.transcript || {}),
          fullTranscript: payload.data,
        },
      }
    }
    default:
      return state
  }
}
