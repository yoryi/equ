import React from "react"
import { useTranslation } from "react-i18next"
//Hooks
import { useDispatch } from "react-redux"
import { useLocation } from "react-router"
import { Link,Route } from "react-router-dom"

import appLogo from "../assets/app-logo.svg"
import Button from "../components/Button/Button"
import Footer from "../components/Footer/Footer"
import history from "../history"
import useWindowDimensions from "../hooks/UseWindowDimensions"
//Actions
import * as actions from "../store/actions"

interface BaseRouteProps {
  path: string
  component?: any
  exact?: boolean
  render?: any
}

const BaseRoute: React.FC<BaseRouteProps> = ({
  component: Component,
  ...props
}) => {
  const dispatch = useDispatch()

  const location = useLocation()

  const { t } = useTranslation()

  const { windowWidth } = useWindowDimensions()

  const getNavContent = () => {
    const path = history.location.pathname
    if (path === `/register` || path === `/register-university`) {
      return (
        <div
          className="fixed-header-nav"
          onClick={() => history.push(`/sign-in`)}
        >
          {t(`common:alreadyOnEquedy`)}
        </div>
      )
    } else if (
      (RegExp((`step`)).exec(path)) ||
      path === `/forgot-password-sent-email` ||
      path === `/register-university-intro` ||
      path === `/register-university-basic-info` ||
      path === `/register/student/welcome`
    ) {
      return
    } else if (path === `/sign-in`) {
      return (
        <div
          className="fixed-header-nav"
          onClick={() => history.push(`/register`)}
        >
          {t(`common:notEquedi`)}
        </div>
      )
    } else if (path === `/forgot-password` || (RegExp((`change-password`)).exec(path))) {
      return (
        <div
          className="fixed-header-nav"
          onClick={() => history.push(`/sign-in`)}
        >
          {t(`common:cancel`)}
        </div>
      )
    } else {
      return (
        <>
          <Button
            secondary
            size={windowWidth <= 1023 ? `xs` : `sm`}
            onClick={() => history.push(`/sign-in`)}
            baseRoute
          >
            {t(`common:signIn`)}
          </Button>
          <Button
            onClick={() => history.push(`/register`)}
            size={windowWidth <= 1023 ? `xs` : `sm`}
            baseRoute
          >
            {t(`common:joinNow`)}
          </Button>
        </>
      )
    }
  }

  return (
    <Route
      {...props}
      render={(renderProps) => (
        <>
          <div className="wrapper-base-route">
            <div
              className={`fixed-header ${
                history.location.pathname === `/` ? `landing` : ``
              }`}
              id="fixed-header"
            >
              <Link to={`/`} onClick={() => dispatch(actions.signOut())}>
                <img src={appLogo} alt="Logo" />
              </Link>

              {process.env.REACT_APP_COMING_SOON === `1` && (
                <div className={`d-flex-flex-row fixed-header-buttons`}>
                  <Button
                    onClick={() =>
                      window.scrollTo(0, document.body.scrollHeight)
                    }
                    size={windowWidth <= 1023 ? `xs` : `sm`}
                    baseRoute
                  >
                    {t(`landingScreen.getNotified`)}
                  </Button>
                </div>
              )}

              {process.env.REACT_APP_PILOT === `1` &&
                process.env.REACT_APP_COMING_SOON !== `1` &&
                location.pathname !== `/join-pilot` && (
                  <div className={`d-flex flex-row fixed-header-buttons`}>
                    <Button
                      onClick={() => history.push(`/join-pilot`)}
                      size={windowWidth <= 1023 ? `xs` : `sm`}
                      baseRoute
                    >
                      {t(`common:joinPilot`)}
                    </Button>
                  </div>
                )}

              {process.env.REACT_APP_COMING_SOON !== `1` &&
                process.env.REACT_APP_PILOT !== `1` && (
                  <div className="d-flex flex-row fixed-header-buttons">
                    {getNavContent()}
                  </div>
                )}
            </div>

            <Component {...renderProps} />
          </div>
          <Footer />
        </>
      )}
    />
  )
}

export default BaseRoute
