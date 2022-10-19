//Types
import { Gender, Hardship,Race } from "../../types"

export interface GetSharedOptionsSucceededPayload {
  genders: Gender[]
  races: Race[]
  ethnicities: any[]
  hardships: Hardship[]
}
