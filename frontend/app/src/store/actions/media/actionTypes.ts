export enum GetMedia {
  Trigger = `GET_MEDIA`,
  Succeeded = `GET_MEDIA_SUCCEEDED`,
  Failed = `GET_MEDIA_FAILED`,

  PromiseTrigger = `GET_MEDIA.TRIGGER`,
}

export enum RefreshMediaToken {
  Trigger = `REFRESH_MEDIA_TOKEN`,
  Succeeded = `REFRESH_MEDIA_TOKEN_SUCCEEDED`,

  PromiseTrigger = `REFRESH_MEDIA_TOKEN.TRIGGER`,
}
