import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Route,Switch } from "react-router-dom"

import history from "../../../history"
import useWindowDimensions from "../../../hooks/UseWindowDimensions"
import { AccountSettings } from "./AccountSettings/AccountSettings"
import { ChangePassword } from "./ChangePassword/ChangePassword"
import { ChangeTabOrder } from "./ChangeTabOrder/ChangeTabOrder"
import { Notifications } from "./Notifications/Notifications"
import { PrivacyAndSecurity } from "./PrivacyAndSecurity/PrivacyAndSecurity"

const Settings = () => {
  const { t } = useTranslation()
  const { windowWidth } = useWindowDimensions()
  const path = history.location.pathname

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])

  const SettingsMenuPaths = {
    accountSettings: `/settings/account-settings`,
    changePassword: `/settings/change-password`,
    notifications: `/settings/notifications`,
    privacyAndSecurity: `/settings/privacy-security`,
    tabsOrder: `/settings/tabs-order`,
  }

  return (
    <div className="settings">
      {windowWidth > 1023 && (
        <div className="settings-tabs">
          <div className="settings-tabs-title">{t(`common:settings`)}</div>
          <div
            className={`settings-tabs-item ${
              path === SettingsMenuPaths.accountSettings
                ? `settings-tabs-item-active`
                : ``
            }`}
            onClick={() => history.push(SettingsMenuPaths.accountSettings)}
          >
            <span>{t(`menuScreen.accountSettings`)}</span>
          </div>
          <div
            className={`settings-tabs-item ${
              path === SettingsMenuPaths.changePassword
                ? `settings-tabs-item-active`
                : ``
            }`}
            onClick={() => history.push(SettingsMenuPaths.changePassword)}
          >
            <span>{t(`menuScreen.changePassword`)}</span>
          </div>
          <div
            className={`settings-tabs-item ${
              path === SettingsMenuPaths.notifications
                ? `settings-tabs-item-active`
                : ``
            }`}
            onClick={() => history.push(SettingsMenuPaths.notifications)}
          >
            <span>{t(`menuScreen.notifications`)}</span>
          </div>
          <div
            className={`settings-tabs-item ${
              path === SettingsMenuPaths.privacyAndSecurity
                ? `settings-tabs-item-active`
                : ``
            }`}
            onClick={() => history.push(SettingsMenuPaths.privacyAndSecurity)}
          >
            <span>{t(`menuScreen.privacyAndSecurity`)}</span>
          </div>
          <div
            className={`settings-tabs-item ${
              path === SettingsMenuPaths.tabsOrder
                ? `settings-tabs-item-active`
                : ``
            }`}
            onClick={() => history.push(SettingsMenuPaths.tabsOrder)}
          >
            <span>{t(`menuScreen.changeTabsOrder`)}</span>
          </div>
        </div>
      )}
      <Switch>
        <Route
          path={SettingsMenuPaths.accountSettings}
          component={AccountSettings}
          exact
        />
        <Route
          path={SettingsMenuPaths.changePassword}
          component={ChangePassword}
        />
        <Route
          path={SettingsMenuPaths.notifications}
          component={Notifications}
        />
        <Route
          path={SettingsMenuPaths.privacyAndSecurity}
          component={PrivacyAndSecurity}
        />
        <Route path={SettingsMenuPaths.tabsOrder} component={ChangeTabOrder} />
      </Switch>
    </div>
  )
}

export default Settings
