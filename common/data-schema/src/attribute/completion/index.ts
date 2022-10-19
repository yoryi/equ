import * as s from "@typeofweb/schema"

import * as completion from "./names"

export * from "./names"

export const names = Object.values(completion).filter(
  /**
   * Bug in esbuild * @see https://github.com/evanw/esbuild/issues/532#issuecomment-873517193
   */
  (v) => typeof v !== `object`,
)
export type names = typeof names[any]

export const required = s.number()
export const optional = s.optional(required)
