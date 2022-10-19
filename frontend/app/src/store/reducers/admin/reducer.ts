//Action types
//Types
import { Action } from "redux"

import * as Actions from "../../actions/actions"
import * as ActionTypes from "../../actions/actionTypes"
import * as Types from "../../types"

export interface AdminReducer {
  studentList: Types.StudentUserList | null
  student: any

  universities: Types.UniversitiesAdminData | null
  university: Types.UniversityAdminData | null
  deletedAccount: boolean

  postReviewList: any
  postPreview: any
}

export const initialState: AdminReducer = {
  studentList: null,
  student: null,

  universities: null,
  university: null,
  deletedAccount: false,

  postReviewList: null,
  postPreview: null,
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GetStudentsList.Succeeded: {
      const studentList = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        studentList,
      }
    }
    case ActionTypes.GetStudentsList.Failed: {
      return {
        ...state,
        studentList: null,
      }
    }
    case ActionTypes.GetStudentByIdAdmin.Succeeded: {
      const studentData = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        student: studentData,
        deletedAccount: false,
      }
    }
    case ActionTypes.GetUniversitiesAdminData.Succeeded: {
      const universities = (action as Actions.PayloadAction<Types.UniversitiesAdminData>)
        .payload
      return {
        ...state,
        universities,
      }
    }
    case ActionTypes.GetUniversityAdminData.Succeeded: {
      const university = (action as Actions.PayloadAction<Types.UniversityAdminData>)
        .payload
      return {
        ...state,
        university,
      }
    }
    case ActionTypes.UpdateUniversityEmail.Succeeded: {
      const universityContact = (action as Actions.PayloadAction<Types.UniversityContact>)
        .payload
      return {
        ...state,
        universities: {
          ...state.universities,
          universities: state.universities?.universities.map((university) => {
            if (university.id === state.university?.id) {
              university.stats = {
                ...(university.stats ?? { claimed: false }),
                contacted: universityContact.contacted,
              }
            }
            return university
          }),
        },
        university: {
          ...state.university,
          universityStats: universityContact,
        },
      }
    }
    case ActionTypes.AssignUniversityProfile.Succeeded:
    case ActionTypes.UpdateUniversityAdministrator.Succeeded: {
      const universityAdministrator = (action as Actions.PayloadAction<Types.UniversityAdministrator>)
        .payload
      return {
        ...state,
        universities: {
          ...state.universities,
          universities: state.universities?.universities.map((university) => {
            if (university.id === state.university?.id) {
              university.administrator = {
                name: `${universityAdministrator.firstName} ${universityAdministrator.lastName}`,
                email: universityAdministrator.email,
                phone: universityAdministrator.phone,
                position: universityAdministrator.position,
              }
              university.stats = {
                ...(university.stats ?? { contacted: false }),
                claimed: true,
              }
            }
            return university
          }),
        },
        university: {
          ...state.university,
          universityAdministrator,
        },
      }
    }
    case ActionTypes.UnassignUniversityProfile.Succeeded: {
      return {
        ...state,
        university: {
          ...state.university,
          universityAdministrator: null,
        },
      }
    }
    case ActionTypes.ToggleUniversityVisibility.Succeeded: {
      const isVisible = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        university: {
          ...state.university,
          isVisible,
        },
      }
    }
    case ActionTypes.ToggleLockStudentAccount.Succeeded: {
      const data = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        student: {
          ...state.student,
          user: { ...state.student.user, blockedAt: data.blockedAt },
        },
      }
    }
    case ActionTypes.DeleteStudentAccount.Succeeded: {
      return {
        ...state,
        deletedAccount: true,
      }
    }
    case ActionTypes.UpdateBaseStudentDataByAdmin.Succeeded: {
      const data = (action as Actions.PayloadAction<any>).payload
      const { school, email, firstName, lastName, birthday, graduation } = data
      return {
        ...state,
        student: {
          ...state.student,
          user: { ...state.student.user, email },
          school,
          firstName,
          lastName,
          birthday,
          graduation,
        },
        studentList: {
          stats: state.studentList?.stats,
          students: state.studentList
            ? state.studentList.students.map((student) => {
                if (student.id !== data.id) {
                  return student
                } else {
                  return {
                    ...student,
                    user: { ...state.student.user, email },
                    school,
                    firstName,
                    lastName,
                  }
                }
              })
            : [],
        },
      }
    }
    case ActionTypes.UpdateStudentNotificationSettingsByAdmin.Succeeded: {
      const data = (action as Actions.PayloadAction<any>).payload
      const { emailFollowActivity, emailNewsForYou } = data
      return {
        ...state,
        student: {
          ...state.student,
          studentNotificationSettings: {
            ...state.student.studentNotificationSettings,
            emailFollowActivity,
            emailNewsForYou,
          },
        },
      }
    }
    case ActionTypes.UpdateStudentPrivacySettingsByAdmin.Succeeded: {
      const data = (action as Actions.PayloadAction<any>).payload
      const {
        nameAndPhoto,
        beat,
        transcript,
        extracurriculars,
        professional,
        service,
        recognition,
      } = data
      return {
        ...state,
        student: {
          ...state.student,
          privacySettings: {
            ...state.student.privacySettings,
            nameAndPhoto,
            beat,
            transcript,
            extracurriculars,
            professional,
            service,
            recognition,
            publicAccount:
              nameAndPhoto.public &&
              beat.public &&
              transcript.public &&
              extracurriculars.public &&
              service.public &&
              recognition.public,
          },
        },
      }
    }
    case ActionTypes.GetPostReviewAdminData.Succeeded: {
      const postReviewList = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        postReviewList,
      }
    }
    case ActionTypes.ToggleReviewPost.Succeeded: {
      const data = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        postReviewList: {
          postsQty: state.postReviewList.postsQty,
          postsReviewedQty: data.postsReviewedQty,
          posts: state.postReviewList
            ? state.postReviewList.posts.map((post: any) => {
                if (post.id !== data.updatedPost.id) {
                  return post
                } else {
                  return {
                    ...post,
                    isReviewed: !post.isReviewed,
                  }
                }
              })
            : [],
        },
      }
    }
    case ActionTypes.GetPostPreview.Succeeded: {
      const postPreview = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        postPreview,
      }
    }
    case ActionTypes.DeletePostByAdmin.Succeeded: {
      const { id, isReviewed } = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        postReviewList: {
          ...state.postReviewList,
          postsQty: state.postReviewList.postsQty - 1,
          postsReviewedQty: isReviewed
            ? state.postReviewList.postsReviewedQty - 1
            : state.postReviewList.postsReviewedQty,
          posts: state.postReviewList
            ? state.postReviewList.posts.filter((post: any) => {
                return post.id !== id
              })
            : [],
        },
      }
    }
    case ActionTypes.DeletePostReference.Succeeded: {
      return {
        ...state,
        postPreview: {
          ...state.postPreview,
          post: {
            ...state.postPreview.post,
            referenceLink: {
              ...state.postPreview.post.referenceLink,
              reference: null,
            },
          },
        },
      }
    }
    default:
      return state
  }
}
