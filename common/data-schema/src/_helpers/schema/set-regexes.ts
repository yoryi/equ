import * as s from "@typeofweb/schema"

export const setRegexes = (
  regexes: DataSchema.RegExDef[],
  transformer?: (v: string) => string,
) => {
  return s.refine<string, string, string>((v, t) => {
    const value = transformer ? transformer(v) : v

    for (const regex of regexes) {
      const pass = regex.exp.test(value)
      if (!pass) {
        return t.left(value)
      }
    }
    return t.right(value)
  })()
}
