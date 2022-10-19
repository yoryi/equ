import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap-css-only/css/bootstrap.min.css"
import "mdbreact/dist/css/mdb.css"
import "./app.scss"
import "./services/i18n"

import * as _ from "lodash"
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import * as React from "react"
import { useTranslation } from "react-i18next"
import { Provider, useDispatch, useSelector } from "react-redux"
import { Router, Switch, useLocation } from "react-router"
import { Redirect, Route } from "react-router-dom"

import Loader from "./components/Loader"
import MessageModal from "./components/MessageModal"
import Toaster from "./components/Toaster"
import history from "./history"
import BaseRoute from "./routes/BaseRoute"
import ProtectedRoute from "./routes/ProtectedRoute"
import { initReduxStore, store } from "./store"
import * as actions from "./store/actions"
import { ReduxState, Role, SignUpStep } from "./store/types"
import AddReference from "./views/AddReference"
import Admin from "./views/Admin"
import ChangePassword from "./views/ChangePassword/ChangePassword"
import ErrorView from "./views/ErrorView"
import FollowedStudents from "./views/FollowedStudents"
import ForgotPassword from "./views/ForgotPassword/ForgotPassword"
import ForgotPasswordSentEmail from "./views/ForgotPassword/ForgotPasswordSentEmail"
import Help from "./views/Help"
import JoinPilot from "./views/JoinPilot"
import About from "./views/LandingPage/About/About"
import LandingPage from "./views/LandingPage/LandingPage"
import PrivacyPolicy from "./views/LandingPage/PrivacyPolicy/PrivacyPolicy"
import TermsOfUse from "./views/LandingPage/TermsOfUse/TermsOfUse"
import Lists from "./views/Lists"
import Login from "./views/Login/Login"
import Notifications from "./views/Notifications"
import StudentRegister from "./views/Register/StudentRegister"
import StudentRegisterFirstStep from "./views/Register/StudentRegisterFirstStep"
import StudentRegisterFourthStep from "./views/Register/StudentRegisterFourthStep"
import StudentRegisterSecondStep from "./views/Register/StudentRegisterSecondStep"
import StudentWelcome from "./views/Register/StudentWelcome"
import SearchResults from "./views/Search/Search"
import Settings from "./views/Settings"
import SignUp from "./views/SignUp"
import MissionStatementReadMore from "./views/StudentProfile/MissionStatement/MissionStatementReadMore"
import StudentSettings from "./views/StudentProfile/Settings/Settings"
import StudentProfile from "./views/StudentProfile/StudentProfile"
import Surveys from "./views/Surveys"
import SurveyView from "./views/Surveys/Survey"
import UniversityProfile from "./views/UniversityProfile"
import YourSchools from "./views/YourSchools"

initReduxStore(
  process.env.REACT_APP_API_URL ||
    `https://equity-backend-dev.us-east-1.elasticbeanstalk.com/`,
)

const AppNavigator = () => {
  const { isTokenLoaded, refreshToken, accessToken, signUpSucceded } =
    useSelector((state: ReduxState) => state.auth)
  const { isProfileLoaded, profile } = useSelector(
    (state: ReduxState) => state.profile,
  )
  const { university, spirit } = useSelector((state: any) => state.university)
  const { user, isLogoutTokenDeprecatedModalOpen } = useSelector(
    (state: any) => state.auth,
  )
  const { recommendedSearch } = useSelector(
    (state: any) => state.searchAndFilters,
  )
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { pathname } = useLocation()

  const prevRoute = React.useRef(pathname)

  const onRouteChange = React.useCallback(() => {
    if (
      pathname.match(
        /(\/student\/\d+)?\/(transcript|extracurriculars|professional|service|recognition)/g,
      ) ||
      (pathname.match(/\/?/g) &&
        prevRoute.current.match(
          /(\/student\/\d+)?\/(transcript|extracurriculars|professional|service|recognition)/g,
        ))
    ) {
      prevRoute.current = pathname
      return
    }

    window.scrollTo(0, 0)
    prevRoute.current = pathname
  }, [prevRoute, pathname])

  React.useEffect(onRouteChange, [pathname])

  React.useEffect(() => {
    if (!accessToken || user) {
      return
    }

    dispatch(actions.getUser())
  }, [accessToken, user])

  React.useEffect(() => {
    if (!isTokenLoaded || !accessToken || isProfileLoaded) {
      return
    }

    if (user && user.role === `STUDENT`) {
      dispatch(actions.getProfile())
    } else if (user && user.role === `UNIVERSITY`) {
      dispatch(actions.getUniversity())

      const path = history.location.pathname.split(`/university/`)
      const universityId = parseInt(path[1])

      if (!university) {
        _.isNaN(universityId)
          ? dispatch(actions.getUniversity())
          : dispatch(actions.getUniversity(universityId))
      }
      if (!spirit) {
        _.isNaN(universityId)
          ? dispatch(actions.getUniversitySpirit())
          : dispatch(actions.getUniversitySpirit(universityId))
      }
    }
  }, [
    isTokenLoaded,
    accessToken,
    isProfileLoaded,
    user,
    history.location.pathname,
  ])

  React.useEffect(() => {
    const refreshToken =
      sessionStorage.getItem(`refreshToken`) ??
      localStorage.getItem(`refreshToken`)
    dispatch(actions.loadRefreshToken(refreshToken))
  }, [])

  React.useEffect(() => {
    if (history.location.pathname !== `/search` && recommendedSearch) {
      dispatch(actions.setRecommendedSearch(``))
    }
  }, [history.location.pathname])

  React.useEffect(() => {
    if (!accessToken) {
      return
    }

    dispatch(actions.refreshMediaToken())
  }, [accessToken])

  React.useEffect(() => {
    dispatch(actions.getSharedOptions())
  }, [])

  React.useEffect(() => {
    if (!accessToken || !!user || signUpSucceded) {
      return
    }

    dispatch(actions.getUser())
  }, [user, refreshToken, signUpSucceded, accessToken])

  React.useEffect(() => {
    if (!accessToken || !user) {
      return
    }

    dispatch(actions.startNotificationsTask())
  }, [accessToken, user])

  if (process.env.REACT_APP_COMING_SOON === `1`) {
    return (
      <Switch>
        <BaseRoute path={`/`} component={LandingPage} exact />

        <Redirect to={`/`} />
      </Switch>
    )
  }

  if (process.env.REACT_APP_PILOT === `1`) {
    return (
      <Switch>
        <BaseRoute path={`/`} component={LandingPage} exact />
        <BaseRoute path={`/join-pilot`} component={JoinPilot} exact />

        <BaseRoute path={`/privacy-policy`} component={PrivacyPolicy} />
        <BaseRoute path={`/about`} component={About} />
        <BaseRoute path={`/terms-of-use`} component={TermsOfUse} />
        <BaseRoute path={`/help`} component={Help} />

        <Redirect to={`/`} />
      </Switch>
    )
  }

  if (
    !isTokenLoaded ||
    (refreshToken && !user) ||
    (user?.role === Role.Student && !profile)
  ) {
    return null
  }

  let content: React.ReactNode
  switch (user?.role) {
    case Role.Student:
      if (profile?.signUpStep === SignUpStep.Finish) {
        content = (
          <Switch>
            <ProtectedRoute
              path={[
                `/`,
                `/transcript`,
                `/extracurriculars`,
                `/professional`,
                `/service`,
                `/recognition`,
              ]}
              component={StudentProfile}
              exact
            />
            <ProtectedRoute
              path={`/mission-statement`}
              component={MissionStatementReadMore}
              exact
            />
            <ProtectedRoute path={`/your-schools`} component={YourSchools} />
            <ProtectedRoute path={`/notifications`} component={Notifications} />
            <ProtectedRoute path={`/settings`} component={StudentSettings} />
            <ProtectedRoute path={`/surveys`} component={Surveys} exact />
            <ProtectedRoute
              path={`/surveys/survey/:id`}
              component={SurveyView}
              exact
            />
            <ProtectedRoute path={`/search`} component={SearchResults} />

            <ProtectedRoute path={`/student/:id`} component={StudentProfile} />
            <ProtectedRoute
              path={`/university/:id`}
              component={UniversityProfile}
            />

            <ProtectedRoute
              path={`/privacy-policy`}
              component={PrivacyPolicy}
            />
            <ProtectedRoute path={`/about`} component={About} />
            <ProtectedRoute path={`/terms-of-use`} component={TermsOfUse} />
            <ProtectedRoute path={`/help`} component={Help} />
            <BaseRoute path={`/reference`} component={AddReference} />

            <Route path={`/error/:code`} component={ErrorView} />

            <Redirect to={`/`} />
          </Switch>
        )
      } else {
        content = (
          <Switch>
            <BaseRoute
              path={`/register/student/step-one`}
              component={StudentRegisterFirstStep}
            />
            <BaseRoute
              path={`/register/student/step-two`}
              component={StudentRegisterSecondStep}
            />
            <BaseRoute
              path={`/register/student/step-three`}
              component={StudentRegisterFourthStep}
            />
            <BaseRoute
              path={`/register/student/welcome`}
              component={StudentWelcome}
            />

            <ProtectedRoute path={`/terms-of-use`} component={TermsOfUse} />
            <ProtectedRoute
              path={`/privacy-policy`}
              component={PrivacyPolicy}
            />

            <Route path={`/error/:code`} component={ErrorView} />

            <Redirect
              to={(() => {
                switch (profile?.signUpStep) {
                  case SignUpStep.Details:
                    return `/register/student/step-one`
                  case SignUpStep.OptionalDetails:
                    return `/register/student/step-two`
                  case SignUpStep.PrivateAvatar:
                    return `/register/student/step-three`
                  case SignUpStep.Welcome:
                    return `/register/student/welcome`
                  default:
                    return `/register/student/step-one`
                }
              })()}
            />
          </Switch>
        )
      }
      break
    case Role.University:
      content = (
        <Switch>
          <ProtectedRoute
            path={[`/`, `/spirit`]}
            component={UniversityProfile}
            exact
          />
          <ProtectedRoute path={`/lists`} component={Lists} />
          <ProtectedRoute
            path={`/followed-students`}
            component={FollowedStudents}
          />
          <ProtectedRoute path={`/notifications`} component={Notifications} />
          <ProtectedRoute path={`/settings`} component={Settings} />
          <ProtectedRoute path={`/search`} component={SearchResults} />
          <ProtectedRoute path={`/student/:id`} component={StudentProfile} />
          <ProtectedRoute
            path={`/mission-statement/:id`}
            component={MissionStatementReadMore}
            exact
          />

          <ProtectedRoute
            path={`/university/:id`}
            component={UniversityProfile}
          />
          <ProtectedRoute path={`/privacy-policy`} component={PrivacyPolicy} />
          <ProtectedRoute path={`/about`} component={About} />
          <ProtectedRoute path={`/terms-of-use`} component={TermsOfUse} />
          <ProtectedRoute path={`/help`} component={Help} />
          <BaseRoute path={`/reference`} component={AddReference} />

          <Route path={`/error/:code`} component={ErrorView} />

          <Redirect to={`/`} />
        </Switch>
      )
      break
    case Role.Admin:
    case Role.Program:
      content = (
        <Switch>
          <Route path={`/admin`} component={Admin} />
          <ProtectedRoute path={`/student/:id`} component={StudentProfile} />
          <ProtectedRoute
            path={`/mission-statement/:id`}
            component={MissionStatementReadMore}
            exact
          />

          <ProtectedRoute
            path={`/university/:id`}
            component={UniversityProfile}
          />
          <ProtectedRoute path={`/privacy-policy`} component={PrivacyPolicy} />
          <ProtectedRoute path={`/about`} component={About} />
          <ProtectedRoute path={`/terms-of-use`} component={TermsOfUse} />
          <ProtectedRoute path={`/help`} component={Help} />
          <BaseRoute path={`/reference`} component={AddReference} />

          <Route path={`/error/:code`} component={ErrorView} />

          <Redirect to={`/admin`} />
        </Switch>
      )
      break
    default:
      content = (
        <Switch>
          <BaseRoute path={`/`} component={LandingPage} exact />
          <BaseRoute path={`/register`} component={StudentRegister} />
          <BaseRoute path={`/sign-in`} component={Login} />
          <BaseRoute path={`/forgot-password`} component={ForgotPassword} />
          <BaseRoute
            path={`/forgot-password-sent-email`}
            component={ForgotPasswordSentEmail}
          />
          <BaseRoute path={`/reset-password`} component={ChangePassword} />

          <BaseRoute path={`/student/:id`} component={StudentProfile} />
          <BaseRoute path={`/university/:id`} component={UniversityProfile} />

          <BaseRoute path={`/privacy-policy`} component={PrivacyPolicy} />
          <BaseRoute path={`/about`} component={About} />
          <BaseRoute path={`/terms-of-use`} component={TermsOfUse} />
          <BaseRoute path={`/help`} component={Help} />
          <BaseRoute path={`/reference`} component={AddReference} />

          <Route path={`/signup`} component={SignUp} />

          <Route path={`/error/:code`} component={ErrorView} />

          <Redirect to={`/`} />
        </Switch>
      )
      break
  }

  return (
    <>
      {content}

      <MessageModal
        title={``}
        message={t(`common:youHaveBennLoggedOutDueToInactivity`)}
        visible={isLogoutTokenDeprecatedModalOpen}
        onClose={() => {
          dispatch(actions.signOut())
          window.scrollTo(0, 0)
        }}
      />
    </>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <Loader>
        <Router history={history}>
          <AppNavigator />
        </Router>
      </Loader>

      <Toaster />
    </Provider>
  )
}

export default App
