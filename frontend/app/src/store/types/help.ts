export enum ContactReason {
  TechnicalSupport = `technicalSupport`,
  GeneralQuestions = `generalQuestions`,
  Feedback = `feedback`,
  AnythingElse = `anythingElse`,
}

export interface HelpPayload {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  contactReason: ContactReason
  message: string
}
