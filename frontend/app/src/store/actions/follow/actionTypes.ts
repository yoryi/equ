export enum FollowStudent {
  Trigger = `FOLLOW_STUDENT`,
  Succeeded = `FOLLOW_STUDENT_SUCCEEDED`,

  PromiseTrigger = `FOLLOW_STUDENT.TRIGGER`,
}

export enum UnfollowStudent {
  Trigger = `UNFOLLOW_STUDENT`,
  Succeeded = `UNFOLLOW_STUDENT_SUCCEEDED`,

  PromiseTrigger = `UNFOLLOW_STUDENT.TRIGGER`,
}

export enum FollowUniversity {
  Trigger = `FOLLOW_UNIVERSITY`,
  Succeeded = `FOLLOW_UNIVERSITY_SUCCEEDED`,

  PromiseTrigger = `FOLLOW_UNIVERSITY.TRIGGER`,
}

export enum UnfollowUniversity {
  Trigger = `UNFOLLOW_UNIVERSITY`,
  Succeeded = `UNFOLLOW_UNIVERSITY_SUCCEEDED`,

  PromiseTrigger = `UNFOLLOW_UNIVERSITY.TRIGGER`,
}

export enum AcceptFollowRequest {
  Trigger = `ACCEPT_FOLLOW_REQUEST`,
  Succeeded = `ACCEPT_FOLLOW_REQUEST_SUCCEEDED`,
}

export enum DeclineFollowRequest {
  Trigger = `DECLINE_FOLLOW_REQUEST`,
  Succeeded = `DECLINE_FOLLOW_REQUEST_SUCCEEDED`,
}

export enum AcceptAllFollowRequests {
  Trigger = `ACCEPT_ALL_FOLLOW_REQUESTS`,
  Succeeded = `ACCEPT_ALL_FOLLOW_REQUESTS_SUCCEEDED`,
}

export enum AddDreamUniversity {
  Trigger = `ADD_DREAM_UNIVERSITY`,
  Succeeded = `ADD_DREAM_UNIVERSITY_SUCCEEDED`,

  PromiseTrigger = `ADD_DREAM_UNIVERSITY.TRIGGER`,
}

export enum RemoveDreamUniversity {
  Trigger = `REMOVE_DREAM_UNIVERSITY`,
  Succeeded = `REMOVE_DREAM_UNIVERSITY_SUCCEEDED`,

  PromiseTrigger = `REMOVE_DREAM_UNIVERSITY.TRIGGER`,
}

export enum GetYourSchools {
  Trigger = `GET_YOUR_SCHOOLS`,
  Succeeded = `GET_YOUR_SCHOOLS_SUCCEEDED`,

  PromiseTrigger = `GET_YOUR_SCHOOLS.TRIGGER`,
}

export enum GetRecommendedUniversities {
  Trigger = `GET_RECOMMENDED_UNIVERSITIES`,
  Succeeded = `GET_RECOMMENDED_UNIVERSITIES_SUCCEEDED`,
  Failed = `GET_RECOMMENDED_UNIVERSITIES_FAILED`,
}

export enum GetFollowedStudents {
  Trigger = `GET_FOLLOWED_STUDENTS`,
  Succeeded = `GET_FOLLOWED_STUDENTS_SUCCEEDED`,

  PromiseTrigger = `GET_FOLLOWED_STUDENTS.TRIGGER`,
}
