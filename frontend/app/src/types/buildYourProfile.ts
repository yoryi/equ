//Types
import { ReduxState } from "../store/types"

export interface BuildYourProfileStep {
  name: string
  isCompleted?: (state: ReduxState) => boolean
}
