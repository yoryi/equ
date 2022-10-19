export enum LoadRefreshToken {
  Trigger = `LOAD_REFRESH_TOKEN`,
}

export enum RefreshAccessToken {
  Trigger = `REFRESH_ACCESS_TOKEN`,
  Succeeded = `REFRESH_ACCESS_TOKEN_SUCCEEDED`,
}

export enum SignUp {
  Trigger = `SIGN_UP`,
  Succeeded = `SIGN_UP_SUCCEEDED`,
  Failed = `SIGN_UP_FAILED`,

  PromiseTrigger = `SIGN_UP.TRIGGER`,
}

export enum ConfirmSignUp {
  Trigger = `CONFIRM_SIGN_UP`,
  Succeeded = `CONFIRM_SIGN_UP_SUCCEEDED`,
  Failed = `CONFIRM_SIGN_UP_FAILED`,
}

export enum ResetSignUpError {
  Trigger = `RESET_SIGN_UP_ERROR`,
}

export enum StudentSignUpDetails {
  Trigger = `STUDENT_SIGN_UP_DETAILS`,
  Succeeded = `STUDENT_SIGN_UP_DETAILS_SUCCEEDED`,
  Failed = `STUDENT_SIGN_UP_DETAILS_FAILED`,

  PromiseTrigger = `STUDENT_SIGN_UP_DETAILS.TRIGGER`,
}

export enum StudentSignUpOptionalDetails {
  Trigger = `STUDENT_SIGN_UP_OPTIONAL_DETAILS`,
  Succeeded = `STUDENT_SIGN_UP_OPTIONAL_DETAILS_SUCCEEDED`,
  Failed = `STUDENT_SIGN_UP_OPTIONAL_DETAILS_FAILED`,

  PromiseTrigger = `STUDENT_SIGN_UP_OPTIONAL_DETAILS.TRIGGER`,
}

export enum StudentSignUpSkipOptionalDetails {
  Trigger = `STUDENT_SIGN_UP_SKIP_OPTIONAL_DETAILS`,
  Succeeded = `STUDENT_SIGN_UP_SKIP_OPTIONAL_DETAILS_SUCCEEDED`,
  Failed = `STUDENT_SIGN_UP_SKIN_OPTIONAL_DETAILS_FAILED`,

  PromiseTrigger = `STUDENT_SIGN_UP_SKIP_OPTIONAL_DETAILS.TRIGGER`,
}

export enum StudentSignUpInterests {
  Trigger = `STUDENT_SIGN_UP_INTERESTS`,
  Succeeded = `STUDENT_SIGN_UP_INTERESTS_SUCCEEDED`,
  Failed = `STUDENT_SIGN_UP_INTERESTS_FAILED`,

  PromiseTrigger = `STUDENT_SIGN_UP_INTERESTS.TRIGGER`,
}

export enum StudentSignUpPrivateAvatar {
  Trigger = `STUDENT_SIGN_UP_PRIVATE_AVATAR`,
  Succeeded = `STUDENT_SIGN_UP_PRIVATE_AVATAR_SUCCEEDED`,
  Failed = `STUDENT_SIGN_UP_PRIVATE_AVATAR_FAILED`,

  PromiseTrigger = `STUDENT_SIGN_UP_PRIVATE_AVATAR.TRIGGER`,
}

export enum StudentSignUpFinish {
  Trigger = `STUDENT_SIGN_UP_FINISH`,
  Succeeded = `STUDENT_SIGN_UP_FINISH_SUCCEEDED`,
  Failed = `STUDENT_SIGN_UP_FINISH_FAILED`,

  PromiseTrigger = `STUDENT_SIGN_UP_FINISH.TRIGGER`,
}

export enum FinishSignUp {
  Trigger = `FINISH_SIGN_UP`,
}

export enum UniversitySignUp {
  Trigger = `UNIVERSITY_SIGN_UP`,
  Succeeded = `UNIVERSITY_SIGN_UP_SUCCEEDED`,
  Failed = `UNIVERSITY_SIGN_UP_FAILED`,

  PromiseTrigger = `UNIVERSITY_SIGN_UP.TRIGGER`,
}

export enum SignIn {
  Trigger = `SIGN_IN`,
  Succeeded = `SIGN_IN_SUCCEEDED`,
  Failed = `SIGN_IN_FAILED`,

  PromiseTrigger = `SIGN_IN.TRIGGER`,
}

export enum ResetSignInError {
  Trigger = `RESET_SIGN_IN_ERROR`,
}

export enum RequestPasswordReset {
  Trigger = `REQUEST_PASSWORD_RESET`,
  Succeeded = `REQUEST_PASSWORD_RESET_SUCCEEDED`,
  Failed = `REQUEST_PASSWORD_RESET_FAILED`,

  PromiseTrigger = `REQUEST_PASSWORD_RESET.TRIGGER`,
}

export enum ResetRequestPasswordResetError {
  Trigger = `RESET_REQUEST_PASSWORD_RESET_ERROR`,
}

export enum ResetPassword {
  Trigger = `RESET_PASSWORD`,

  PromiseTrigger = `RESET_PASSWORD.TRIGGER`,
}

export enum ChangePassword {
  Trigger = `CHANGE_PASSWORD`,
  Succeeded = `CHANGE_PASSWORD_SUCCEEDED`,
  Failed = `CHANGE_PASSWORD_FAILED`,

  PromiseTrigger = `CHANGE_PASSWORD.TRIGGER`,
}

export enum GetUser {
  Trigger = `GET_USER`,
  Succeeded = `GET_USER_SUCCEEDED`,

  PromiseTrigger = `GET_USER.TRIGGER`,
}

export enum SignOut {
  Trigger = `SIGN_OUT`,
}

export enum JoinPilot {
  Trigger = `JOIN_PILOT`,

  PromiseTrigger = `JOIN_PILOT.TRIGGER`,
}

export const ToggleLogoutTokenDeprecatedModal =
  `TOGGLE_LOGOUT_TOKEN_DEPRECATED_MODAL`
