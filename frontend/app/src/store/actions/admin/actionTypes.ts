export enum GetStudentsList {
  Trigger = `GET_STUDENT_LIST`,
  Succeeded = `GET_STUDENT_LIST_SUCCEEDED`,
  Failed = `GET_STUDENT_LIST_FAILED`,
}

export enum GetStudentByIdAdmin {
  Trigger = `GET_STUDENT_BY_ID_ADMIN`,
  Succeeded = `GET_STUDENT_BY_ID_ADMIN_SUCCEEDED`,
  Failed = `GET_STUDENT_BY_ID_ADMIN_FAILED`,

  PromiseTrigger = `GET_STUDENT_BY_ID_ADMIN.TRIGGER`,
}

export enum GetUniversitiesAdminData {
  Trigger = `GET_UNIVERSITIES_ADMIN_DATA`,
  Succeeded = `GET_UNIVERSITIES_ADMIN_DATA_SUCCEEDED`,
  Failed = `GET_UNIVERSITIES_ADMIN_DATA_FAILED`,
}

export enum GetUniversityAdminData {
  Trigger = `GET_UNIVERSITY_ADMIN_DATA`,
  Succeeded = `GET_UNIVERSITY_ADMIN_DATA_SUCCEEDED`,
  Failed = `GET_UNIVERSITY_ADMIN_DATA_FAILED`,
}

export enum UpdateUniversityEmail {
  Trigger = `UPDATE_UNIVERSITY_EMAIL`,
  Succeeded = `UPDATE_UNIVERSITY_EMAIL_SUCCEEDED`,
  Failed = `UPDATE_UNIVERSITY_EMAIL_FAILED`,

  PromiseTrigger = `UPDATE_UNIVERSITY_EMAIL.TRIGGER`,
}

export enum AssignUniversityProfile {
  Trigger = `ASSIGN_UNIVERSITY_PROFILE`,
  Succeeded = `ASSIGN_UNIVERSITY_PROFILE_SUCCEEDED`,
  Failed = `ASSIGN_UNIVERSITY_FAILED`,

  PromiseTrigger = `ASSIGN_UNIVERSITY_PROFILE.TRIGGER`,
}

export enum UpdateUniversityAdministrator {
  Trigger = `UPDATE_UNIVERSITY_ADMINISTRATOR`,
  Succeeded = `UPDATE_UNIVERSITY_ADMINISTRATOR_SUCCEEDED`,
  Failed = `UPDATE_UNIVERSITY_ADMINISTRATOR_FAILED`,

  PromiseTrigger = `UPDATE_UNIVERSITY_ADMINISTRATOR.TRIGGER`,
}

export enum UnassignUniversityProfile {
  Trigger = `UNASSIGN_UNIVERSITY_PROFILE`,
  Succeeded = `UNASSIGN_UNIVERSITY_PROFILE_SUCCEEDED`,
  Failed = `UNASSIGN_UNIVERSITY_PROFILE_FAILED`,

  PromiseTrigger = `UNASSIGN_UNIVERSITY_PROFILE.TRIGGER`,
}

export enum ToggleUniversityVisibility {
  Trigger = `TOGGLE_UNIVERSITY_VISIBILITY`,
  Succeeded = `TOGGLE_UNIVERSITY_VISIBILITY_SUCCEEDED`,
  Failed = `TOGGLE_UNIVERSITY_VISIBILITY_FAILED`,
}

export enum ResetUniversityPassword {
  Trigger = `RESET_UNIVERSITY_PASSWORD`,

  PromiseTrigger = `RESET_UNIVERSITY_PASSWORD.TRIGGER`,
}

export enum ResetStudentPassword {
  Trigger = `RESET_USER_PASSWORD`,
  Succeeded = `RESET_USER_PASSWORD_SUCCEEDED`,
  Failed = `RESET_USER_PASSWORD_FAILED`,

  PromiseTrigger = `RESET_USER_PASSWORD.TRIGGER`,
}

export enum ToggleLockStudentAccount {
  Trigger = `TOGGLE_LOCK_STUDENT_ACCOUNT`,
  Succeeded = `TOGGLE_LOCK_STUDENT_ACCOUNT_SUCCEEDED`,
  Failed = `TOGGLE_LOCK_STUDENT_ACCOUNT_FAILED`,

  PromiseTrigger = `TOGGLE_LOCK_STUDENT_ACCOUNT.TRIGGER`,
}

export enum DeleteStudentAccount {
  Trigger = `DELETE_STUDENT_ACCOUNT`,
  Succeeded = `DELETE_STUDENT_ACCOUNT_SUCCEEDED`,
  Failed = `DELETE_STUDENT_ACCOUNT_FAILED`,

  PromiseTrigger = `DELETE_STUDENT_ACCOUNT.TRIGGER`,
}

export enum UpdateBaseStudentDataByAdmin {
  Trigger = `UPDATE_BASE_STUDENT_DATA_BY_ADMIN`,
  Succeeded = `UPDATE_BASE_STUDENT_DATA_BY_ADMIN_SUCCEEDED`,
  Failed = `UPDATE_BASE_STUDENT_DATA_BY_ADMIN_FAILED`,

  PromiseTrigger = `UPDATE_BASE_STUDENT_DATA_BY_ADMIN.TRIGGER`,
}

export enum UpdateStudentNotificationSettingsByAdmin {
  Trigger = `UPDATE_STUDENT_NOTIFICATION_SETTINGS_BY_ADMIN`,
  Succeeded = `UPDATE_STUDENT_NOTIFICATION_SETTINGS_BY_ADMIN_SUCCEEDED`,
  Failed = `UPDATE_STUDENT_NOTIFICATION_SETTINGS_BY_ADMIN_FAILED`,

  PromiseTrigger = `UPDATE_STUDENT_NOTIFICATION_SETTINGS_BY_ADMIN.TRIGGER`,
}

export enum UpdateStudentPrivacySettingsByAdmin {
  Trigger = `UPDATE_STUDENT_PRIVACY_SETTINGS_BY_ADMIN`,
  Succeeded = `UPDATE_STUDENT_PRIVACY_SETTINGS_BY_ADMIN_SUCCEEDED`,
  Failed = `UPDATE_STUDENT_PRIVACY_SETTINGS_BY_ADMIN_FAILED`,

  PromiseTrigger = `UPDATE_STUDENT_PRIVACY_SETTINGS_BY_ADMIN.TRIGGER`,
}

export enum GetPostReviewAdminData {
  Trigger = `GET_POST_REVIEW_ADMIN_DATA`,
  Succeeded = `GET_POST_REVIEW_ADMIN_DATA_SUCCEEDED`,
  Failed = `GET_POST_REVIEW_ADMIN_DATA_FAILED`,
}

export enum ToggleReviewPost {
  Trigger = `TOGGLE_REVIEW_POST`,
  Succeeded = `TOGGLE_REVIEW_POST_SUCCEEDED`,
  Failed = `TOGGLE_REVIEW_POST_FAILED`,

  PromiseTrigger = `TOGGLE_REVIEW_POST.TRIGGER`,
}

export enum GetPostPreview {
  Trigger = `GET_POST_PREVIEW`,
  Succeeded = `GET_POST_PREVIEW_SUCCEEDED`,
  Failed = `GET_POST_PREVIEW_FAILED`,

  PromiseTrigger = `GET_POST_PREVIEW.TRIGGER`,
}

export enum DeletePostByAdmin {
  Trigger = `DELETE_POST_BY_ADMIN`,
  Succeeded = `DELETE_POST_BY_ADMIN_SUCCEEDED`,
  Failed = `DELETE_POST_BY_ADMIN_FAILED`,

  PromiseTrigger = `DELETE_POST_BY_ADMIN.TRIGGER`,
}

export enum DeletePostReference {
  Trigger = `DELETE_POST_REFERENCE`,
  Succeeded = `DELETE_POST_REFERENCE_SUCCEEDED`,
  Failed = `DELETE_POST_REFERENCE_FAILED`,

  PromiseTrigger = `DELETE_POST_REFERENCE.TRIGGER`,
}

export enum MailStudentByAdmin {
  Trigger = `MAIL_STUDENT_BY_ADMIN`,
  Succeeded = `MAIL_STUDENT_BY_ADMIN_SUCCEEDED`,
  Failed = `MAIL_STUDENT_BY_ADMIN_FAILED`,

  PromiseTrigger = `MAIL_STUDENT_BY_ADMIN.TRIGGER`,
}
