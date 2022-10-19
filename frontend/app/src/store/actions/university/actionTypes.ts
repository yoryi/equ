export enum GetUniversity {
  Trigger = `GET_UNIVERSITY`,
  Succeeded = `GET_UNIVERSITY_SUCCEEDED`,
  Failed = `GET_UNIVERSITY_FAILED`,
}

export enum GetUniversityMatchingScore {
  Trigger = `GET_UNIVERSITY_MATCHING_SCORE`,
  Succeeded = `GET_UNIVERSITY_MATCHING_SCORE_SUCCEEDED`,
  Failed = `GET_UNIVERSITY_MATCHING_SCORE_FAILED`,
}

export enum GetUniversitySpirit {
  Trigger = `GET_UNIVERSITY_SPIRIT`,
  Succeeded = `GET_UNIVERSITY_SPIRIT_SUCCEEDED`,
  Failed = `GET_UNIVERSITY_SPIRIT_FAILED`,
}

export enum CreateSpirit {
  Trigger = `CREATE_SPIRIT`,
  Succeeded = `CREATE_SPIRIT_SUCCEEDED`,

  PromiseTrigger = `CREATE_SPIRIT.TRIGGER`,
}

export enum UpdateSpirit {
  Trigger = `UPDATE_SPIRIT`,
  Succeeded = `UPDATE_SPIRIT_SUCCEEDED`,

  PromiseTrigger = `UPDATE_SPIRIT.TRIGGER`,
}

export enum DeleteSpirit {
  Trigger = `DELETE_SPIRIT`,
  Succeeded = `DELETE_SPIRIT_SUCCEEEDED`,

  PromiseTrigger = `DELETE_SPIRIT.TRIGGER`,
}

export enum UpdateSpiritJourney {
  Trigger = `UPDATE_SPIRIT_JOURNEY`,
  Succeeded = `UPDATE_SPIRIT_JOURNEY_SUCCEEDED`,

  PromiseTrigger = `UPDATE_SPIRIT_JOURNEY.TRIGGER`,
}

export enum MakeFirstPhotoSpiritJourney {
  Trigger = `MAKE_FIRST_PHOTO_SPIRIT_JOURNEY`,
  Succeeded = `MAKE_FIRST_PHOTO_SPIRIT_JOURNEY_SUCCEEDED`,

  PromiseTrigger = `MAKE_FIRST_PHOTO_SPIRIT_JOURNEY.TRIGGER`,
}

export enum AddDescriptionSpiritJourney {
  Trigger = `ADD_DESCRIPTION_SPIRIT_JOURNEY`,
  Succeeded = `ADD_DESCRIPTION_SPIRIT_JOURNEY_SUCCEEDED`,

  PromiseTrigger = `ADD_DESCRIPTION_SPIRIT_JOURNEY.TRIGGER`,
}

export enum RemovePhotoOrVideoSpiritJourney {
  Trigger = `REMOVE_PHOTO_OR_VIDEO_SPIRIT_JOURNEY`,
  Succeeded = `REMOVE_PHOTO_OR_VIDEO_SPIRIT_JOURNEY_SUCCEEDED`,

  PromiseTrigger = `REMOVE_PHOTO_OR_VIDEO_SPIRIT_JOURNEY.TRIGGER`,
}

export enum UpdateUniversityMission {
  Trigger = `UPDATE_UNIVERSITY_MISSION`,
  Succeeded = `UPDATE_UNIVERSITY_MISSION_SUCCEEDED`,
  Failed = `UPDATE_UNIVERSITY_MISSION_FAILED`,

  PromiseTrigger = `UPDATE_UNIVERSITY_MISSION.TRIGGER`,
}

export enum SaveSearch {
  Trigger = `SAVE_SEARCH`,
  Succeeded = `SAVE_SEARCH_SUCCEEDED`,

  PromiseTrigger = `SAVE_SEARCH.TRIGGER`,
}

export enum DeleteSpiritJourney {
  Trigger = `DELETE_SPIRIT_JOURNEY`,
  Succeeded = `DELETE_SPIRIT_JOURNEY_SUCCEEDED`,

  PromiseTrigger = `DELETE_SPIRIT_JOURNEY.TRIGGER`,
}

export const GetCurrentSpirit = `GET_CURRENT_SPIRIT`
export const ToggleAddSpiritModal = `TOGGLE_ADD_SPIRIT_MODAL`
export const ToggleAddSpiritSecondStep = `TOGGLE_ADD_SPIRIT_SECOND_STEP`
export const ToggleEditSpiritModal = `TOGGLE_EDIT_SPIRIT_MODAL`
export const GetDebugResponse = `GET_DEBUG_RESPONSE`
