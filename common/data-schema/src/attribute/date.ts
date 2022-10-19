import * as s from "@typeofweb/schema"

export const name = `date`
export const nameYear = `year`
export const nameEndDate = `endDate`
export const nameStartDate = `startDate`
export const nameCreatedAt = `createdAt`
export const nameUpdatedAt = `updatedAt`
export const nameProcessedOn = `processedOn`
export const nameBirthday = `birthday`
export const nameReadAt = `readAt`
export const nameCloseAt = `closeAt`
export const nameBlockedAt = `blockedAt`
export const nameLastLoggedAt = `lastLoggedAt`

export const required = s.string()
export const optional = s.optional(required)

export const requiredNumber = s.number()
export const optionalNumber = s.optional(requiredNumber)
