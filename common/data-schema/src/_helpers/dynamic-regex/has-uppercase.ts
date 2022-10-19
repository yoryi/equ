/**
 * Need 1 uppercase caharacter from [A-Z]
 */
export const hasUppercase: DataSchema.RegExDef = {
  msg: `Need 1 uppercase`,
  exp: /[A-Z]/,
}
