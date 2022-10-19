/**
 * Check chars in string
 * @param types expected set of symbols
 */
export const hasType = (types: string): DataSchema.RegExDef => ({
  msg: `Need at least 1 character from [${types}]`,
  exp: new RegExp(`^[${types}]+$`),
})
