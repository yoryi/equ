import { ReduxState } from "../store/types"

interface BuildYourProfileStep {
  name: string
  isCompleted?: (state: ReduxState) => boolean
}

export const BuildYourProfileSteps: BuildYourProfileStep[] = [
  { name: `answerCollegePreferenceSurvey` },
  {
    name: `addProfilePhoto`,
    isCompleted: (state) => !!state.profile.profile?.avatar,
  },
  {
    name: `addCoverPhoto`,
    isCompleted: (state) => !!state.profile.profile?.cover,
  },
  {
    name: `addMissionStatement`,
    isCompleted: (state) => !!state.profile.profile?.mission,
  },
  {
    name: `fillOutTranscriptTab`,
    isCompleted: (state) => !!state.profile.transcript,
  },
  {
    name: `fillOutExtracurricularsTab`,
    isCompleted: (state) => !!state.profile?.extracurriculars,
  },
  {
    name: `fillOutProfessionalTab`,
    isCompleted: (state) => !!state.profile?.professional,
  },
  {
    name: `fillOutServiceTab`,
    isCompleted: (state) => !!state.profile?.service,
  },
  {
    name: `fillOutRecognitionTab`,
    isCompleted: (state) => !!state.profile?.recognition,
  },
  { name: `addEquediBeat` },
  { name: `createYourDreamSchoolsList` },
  { name: `connectWithScholarsOnYourCampus` },
]
