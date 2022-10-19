import { ActivityType, Attachment } from "../../types/profile"

export interface UpdateAttachments {
  activityId: number
  formData: any
  description?: string
  activityType: ActivityType
}

export interface DeleteAttachment {
  activityId: number
  attachmentId: number
  activityType: ActivityType
}

export interface AttachmentPayload {
  id: number
  order?: number
  activity?: any
  description?: string
  attachments: Attachment[]
}
