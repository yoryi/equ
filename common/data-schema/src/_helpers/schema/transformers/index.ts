import * as s from "@typeofweb/schema"

export const transformerTrim = (v: string) => v.trim()
export const transformerTrimLowercase = (v: string) => v.trim().toLowerCase()

export const refineTrim = s.refine<string, string, string>((v, t) => {
  const value = transformerTrim(v)
  return t.right(value)
})()
export const refineTrimLowercase = s.refine<string, string, string>((v, t) => {
  const value = transformerTrimLowercase(v)
  return t.right(value)
})()
