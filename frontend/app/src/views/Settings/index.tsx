import { MDBCol,MDBRow } from "mdbreact"
import * as React from "react"
//Hooks
import { useTranslation } from "react-i18next"
//Components
import { NavLink,Route, Switch } from "react-router-dom"

//Routes
import AccountSettings from "./AccountSettings"
import ChangePassword from "./ChangePassword"
//Styles
import Styles from "./index.module.scss"
import Notifications from "./Notifications"

const Settings: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className={Styles.container}>
      <h1 className={`d-none d-md-block`}>{t(`settings.settings`)}</h1>

      <MDBRow>
        <MDBCol className={`d-none d-md-flex`} size={`4`}>
          <nav>
            <div>
              <NavLink to={`/settings`} exact>
                {t(`settings.accountSettings.accountSettings`)}
              </NavLink>
            </div>

            <div>
              <NavLink to={`/settings/password`}>
                {t(`settings.changePassword.changePassword`)}
              </NavLink>
            </div>

            <div>
              <NavLink to={`/settings/notifications`}>
                {t(`settings.notifications.notifications`)}
              </NavLink>
            </div>
          </nav>
        </MDBCol>

        <MDBCol xs={`12`} md={`8`}>
          <Switch>
            <Route path={`/settings`} component={AccountSettings} exact />
            <Route path={`/settings/password`} component={ChangePassword} />
            <Route path={`/settings/notifications`} component={Notifications} />
          </Switch>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default Settings
