import * as React from "react"
//Hooks
import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useLocation } from "react-router"
//Components
import { Redirect } from "react-router"

//Actions
import * as actions from "../../store/actions"
//Types
import { ReduxState } from "../../store/types"

const SignUp: React.VFC = () => {
  const isSignUpConfirmed = useSelector<ReduxState, boolean>(
    (state) => !!state.auth.refreshToken,
  )
  const dispatch = useDispatch()

  const token = new URLSearchParams(useLocation().search).get(`t`)

  useEffect(() => {
    if (!token) {
      return
    }

    dispatch(actions.confirmSignUp({ token }))
  }, [token])

  if (!isSignUpConfirmed) {
    if (token) {
      return <Redirect to={`/sign-in`} />
    }

    return null
  }

  return <Redirect to={`/register/student/step-one`} />
}

export default SignUp
