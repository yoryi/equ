export enum UpdateAttachments {
  Trigger = `UPDATE_ATTACHMENTS`,
  Succeeded = `UPDATE_ATTACHMENTS_SUCCEEDED`,
  Failed = `UPDATE_ATTACHMENTS_FAILED`,

  PromiseTrigger = `UPDATE_ATTACHMENTS.TRIGGER`,
}

export enum GetAttachments {
  Trigger = `GET_ATTACHMENTS`,
  Succeeded = `GET_ATTACHMENTS_SUCCEEDED`,
  Failed = `GET_ATTACHMENTS_FAILED`,
}

export enum DeleteAttachment {
  Trigger = `DELETE_ATTACHMENT`,
  Succeeded = `DELETE_ATTACHMENT_SUCCEEDED`,
  Failed = `DELETE_ATTACHMENT_FAILED`,

  PromiseTrigger = `DELETE_ATTACHMENT.TRIGGER`,
}
