import { AdminReducer } from "../reducers/admin/reducer"
import { AuthReducer } from "../reducers/auth/reducer"
import { FollowReducer } from "../reducers/follow"
import { MediaReducer } from "../reducers/media/reducer"
import { NotificationsReducer } from "../reducers/notifications"
import { ProfileReducer } from "../reducers/profile/reducer"
import { SearchAndFiltersReducer } from "../reducers/searchAndFilters/reducer"
import { SettingsReducer } from "../reducers/settings/reducer"
import { SharedReducer } from "../reducers/shared/reducer"
import { StudentReducer } from "../reducers/student"
import { SurveysReducer } from "../reducers/surveys/reducer"
import { UniversityReducer } from "../reducers/university"

export interface ReduxState {
  auth: AuthReducer
  media: MediaReducer
  notifications: NotificationsReducer
  profile: ProfileReducer
  shared: SharedReducer
  settings: SettingsReducer
  student: StudentReducer
  surveys: SurveysReducer
  university: UniversityReducer
  follow: FollowReducer
  searchAndFilters: SearchAndFiltersReducer
  admin: AdminReducer
}
