/**
 * @todo allow only optional attributes
 */
import * as s from "@typeofweb/schema"

const cmdToRemoveAttribute = `` // empty string is the cmd to remove an attribute
/**
 * Modifies attribute schema to enable removal
 *
 * Accept only optional attributes.
 *   - if the attribute is required, there is no reason to set it to "CanBeRemoved"
 *
 * Accept empty string ("") as value for PATCH attributes that can be removed
 */
export const canBeRemoved = <A extends s.SomeSchema<unknown | undefined>>(
  attribute: A,
) => s.oneOf([attribute, cmdToRemoveAttribute])()
