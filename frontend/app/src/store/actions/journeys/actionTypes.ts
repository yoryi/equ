export enum GetJourney {
  Trigger = `GET_JOURNEY`,
  Succeeded = `GET_JOURNEY_SUCCEEDED`,
  Failed = `GET_JOURNEY_FAILED`,
}

export enum RemovePhovoOrVideo {
  Trigger = `REMOVE_PHOTO_OR_VIDEO`,
  Succeeded = `REMOVE_PHOTO_OR_VIDEO_SUCCEEDED`,
  Failed = `REMOVE_PHOTO_OR_VIDEO_FAILED`,

  PromiseTrigger = `REMOVE_PHOTO_OR_VIDEO.TRIGGER`,
}

export enum UpdateJourney {
  Trigger = `UPDATE_JOURNEY`,
  Succeeded = `UPDATE_JOURNEY_SUCCEEDED`,
  Failed = `UPDATE_JOURNEY_FAILED`,

  PromiseTrigger = `UPDATE_JOURNEY.TRIGGER`,
}

export enum MakeFirstPhoto {
  Trigger = `MAKE_FIRST_PHOTO`,
  Succeeded = `MAKE_FIRST_PHOTO_SUCCEEDED`,
  Failed = `MAKE_FIRST_PHOTO_FAILED`,

  PromiseTrigger = `MAKE_FIRST_PHOTO.TRIGGER`,
}

export enum AddJourneyDescription {
  Trigger = `ADD_JOURNEY_DESCRIPTION`,
  Succeeded = `ADD_JOURNEY_DESCRIPTION_SUCCEEDED`,
  Failed = `ADD_JOURNEY_DESCRIPTION_FAILED`,

  PromiseTrigger = `ADD_JOURNEY_DESCRIPTION.TRIGGER`,
}

export enum DeleteJourney {
  Trigger = `DELETE_JOURNEY`,
  Succeeded = `DELETE_JOURNEY_SUCCEEDED`,
  Failed = `DELETE_JOURNEY_FAILED`,

  PromiseTrigger = `DELETE_JOURNEY.TRIGGER`,
}

export const ToggleJourneyModal = `TOGGLE_JOURNEY_MODAL`
export const ToggleEditJourneyModal = `TOGGLE_EDIT_JOURNEY_MODAL`
export const ToggleAddJourneyDescriptionModal =
  `TOGGLE_ADD_JOURNEY_DESCRIPTION_MODAL`
