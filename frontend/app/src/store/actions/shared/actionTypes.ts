export enum GetSharedOptions {
  Trigger = `GET_SHARED_OPTIONS`,
  Succeeded = `GET_SHARED_OPTIONS_SUCCEEDED`,
  Failed = `GET_SHARED_OPTIONS_FAILED`,
}

export enum GetStudentSearchParams {
  Trigger = `GET_STUDENT_SEARCH_PARAMS`,
  Succeeded = `GET_STUDENT_SEARCH_PARAMS_SUCCEEDED`,
  Failed = `GET_STUDENT_SEARCH_PARAMS_FAILED`,
}

export enum GetUniversitySearchParams {
  Trigger = `GET_UNIVERSITY_SEARCH_PARAMS`,
  Succeeded = `GET_UNIVERSITY_SEARCH_PARAMS_SUCCEEDED`,
  Failed = `GET_UNIVERSITY_SEARCH_PARAMS_FAILED`,
}

export enum GetPostReviewDeletionReasons {
  Trigger = `GET_POST_REVIEW_DELETION_REASONS`,
  Succeeded = `GET_POST_REVIEW_DELETION_REASONS_SUCCEEDED`,
  Failed = `GET_POST_REVIEW_DELETION_REASONS_FAILED`,
}

export enum SignUpForUpdates {
  Trigger = `SIGN_UP_FOR_UPDATES`,

  PromiseTrigger = `SIGN_UP_FOR_UPDATES.TRIGGER`,
}

export enum SearchZipCode {
  Trigger = `SEARCH_ZIP_CODE`,

  PromiseTrigger = `SEARCH_ZIP_CODE.TRIGGER`,
}
