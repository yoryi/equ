export enum GetPrivacyAndSecuritySettings {
  Trigger = `GET_PRIVACY_AND_SECURITY_SETTINGS`,
  Succeeded = `GET_PRIVACY_AND_SECURITY_SETTINGS_SUCCEEDED`,
  Failed = `GET_PRIVACY_AND_SECURITY_SETTINGS_FAILED`,

  PromiseTrigger = `GET_PRIVACY_AND_SECURITY_SETTINGS.TRIGGER`,
}

export enum UpdatePrivacyAndSecuritySettings {
  Trigger = `UPDATE_PRIVACY_AND_SECURITY_SETTINGS`,
  Succeeded = `UPDATE_PRIVACY_AND_SECURITY_SETTINGS_SUCCEEDED`,

  PromiseTrigger = `UPDATE_PRIVACY_AND_SECURITY_SETTINGS.TRIGGER`,
}

export enum GetNotificationsSettings {
  Trigger = `GET_NOTIFICATIONS_SETTINGS`,
  Succeeded = `GET_NOTIFICATIONS_SETTINGS_SUCCEEDED`,

  PromiseTrigger = `GET_NOTIFICATIONS_SETTINGS.TRIGGER`,
}

export enum UpdateNotificationsSettings {
  Trigger = `UPDATE_NOTIFICATIONS_SETTINGS`,
  Succeeded = `UPDATE_NOTIFICATIONS_SETTINGS_SUCCEEDED`,

  PromiseTrigger = `UPDATE_NOTIFICATIONS_SETTINGS.TRIGGER`,
}

export enum UpdateStudentAccountSettings {
  Trigger = `UPDATE_STUDENT_ACCOUNT_SETTINGS`,
  Succeeded = `UPDATE_STUDENT_ACCOUNT_SETTINGS_SUCCEEDED`,

  PromiseTrigger = `UPDATE_STUDENT_ACCOUNT_SETTINGS.TRIGGER`,
}

export enum UpdateStudentsPrivateAvatar {
  Trigger = `UPDATE_STUDENT_PRIVATE_AVATAR`,
  Succeeded = `UPDATE_STUDENT_PRIVATE_AVATAR_SUCCEEDED`,

  PromiseTrigger = `UPDATE_STUDENT_PRIVATE_AVATAR.TRIGGER`,
}

export enum UpdateStudentAvatar {
  Trigger = `UPDATE_STUDENT_AVATAR`,
  Succeeded = `UPDATE_STUDENT_AVATAR_SUCCEEDED`,

  PromiseTrigger = `UPDATE_STUDENT_AVATAR.TRIGGER`,
}

export enum DeleteStudentAvatar {
  Trigger = `DELETE_STUDENT_AVATAR`,
  Succeeded = `DELETE_STUDENT_AVATAR_SUCCEEDED`,

  PromiseTrigger = `DELETE_STUDENT_AVATAR.TRIGGER`,
}

export enum UpdateStudentCover {
  Trigger = `UPDATE_STUDENT_COVER`,
  Succeeded = `UPDATE_STUDENT_COVER_SUCCEEDED`,

  PromiseTrigger = `UPDATE_STUDENT_COVER.TRIGGER`,
}

export enum DeleteStudentCover {
  Trigger = `DELETE_STUDENT_COVER`,
  Succeeded = `DELETE_STUDENT_COVER_SUCCEEDED`,

  PromiseTrigger = `DELETE_STUDENT_COVER.TRIGGER`,
}

export enum UpdateUniversityAvatar {
  Trigger = `UPDATE_UNIVERSITY_AVATAR`,
  Succeeded = `UPDATE_UNIVERSITY_AVATAR_SUCCEEDED`,

  PromiseTrigger = `UPDATE_UNIVERSITY_AVATAR.TRIGGER`,
}

export enum DeleteUniversityAvatar {
  Trigger = `DELETE_UNIVERSITY_AVATAR`,
  Succeeded = `DELETE_UNIVERSITY_AVATAR_SUCCEEDED`,

  PromiseTrigger = `DELETE_UNIVERSITY_AVATAR.TRIGGER`,
}

export enum UpdateUniversityCover {
  Trigger = `UPDATE_UNIVERSITY_COVER`,
  Succeeded = `UPDATE_UNIVERSITY_COVER_SUCCEEDED`,

  PromiseTrigger = `UPDATE_UNIVERSITY_COVER.TRIGGER`,
}

export enum DeleteUniversityCover {
  Trigger = `DELETE_UNIVERSITY_COVER`,
  Succeeded = `DELETE_UNIVERSITY_COVER_SUCCEEDED`,

  PromiseTrigger = `DELETE_UNIVERSITY_COVER.TRIGGER`,
}

export enum GetUniversityAccountSettings {
  Trigger = `GET_UNIVERSITY_ACCOUNT_SETTINGS`,
  Succeeded = `GET_UNIVERSITY_ACCOUNT_SETTINGS_SUCCEEDED`,
}

export enum UpdateUniversityAccountSettings {
  Trigger = `UPDATE_UNIVERSITY_ACCOUNT_SETTINGS`,
  Succeeded = `UPDATE_UNIVERSITY_ACCOUNT_SETTINGS_SUCCEEDED`,

  PromiseTrigger = `UPDATE_UNIVERSITY_ACCOUNT_SETTINGS.TRIGGER`,
}

export enum GetUniversityPageAdministrator {
  Trigger = `GET_UNIVERSITY_PAGE_ADMINISTRATOR`,
  Succeeded = `GET_UNIVERSITY_PAGE_ADMINISTRATOR_SUCCEEDED`,
}

export enum CloseAccount {
  Trigger = `CLOSE_ACCOUNT`,
  Succeeded = `CLOSE_ACCOUNT_SUCCEEDED`,

  PromiseTrigger = `CLOSE_ACCOUNT.TRIGGER`,
}

export const ToggleChangePasswordModal = `TOGGLE_CHANGE_PASSWORD_MODAL`
export const ToggleChangePrivateAvatarModal =
  `TOGGLE_CHANGE_PRIVATE_AVATAR_MODAL`
export const ToggleCloseAccountModal = `TOGGLE_CLOSE_ACCOUNT_MODAL`
