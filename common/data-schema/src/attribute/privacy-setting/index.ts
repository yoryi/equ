import * as s from "@typeofweb/schema"

import * as privacySettings from "./names"

export * from "./names"

export const names = Object.values(privacySettings).filter(
  /**
   * Bug in esbuild * @see https://github.com/evanw/esbuild/issues/532#issuecomment-873517193
   */
  (v) => typeof v !== `object`,
)
export type names = typeof names[any]

export enum PrivacySettingsPublicPermission {
  PUBLIC = 1,
  RESTRICTED = 0,
}

export enum PrivacySettingsType {
  VISIBLE = 1,
  PRIVATE = 2,
  HIDDEN = 3,
}

export const basePrivacySettings = `${PrivacySettingsPublicPermission.RESTRICTED}-${PrivacySettingsType.PRIVATE}-${PrivacySettingsType.PRIVATE}`

export const required = s.string()
export const optional = s.optional(required)
