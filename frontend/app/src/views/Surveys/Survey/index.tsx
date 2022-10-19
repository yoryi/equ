//Hooks
import * as React from "react"
import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useParams } from "react-router"
//Navigation
import { MemoryRouter, Redirect,Route, Switch } from "react-router"

//Components
import SurveyProgressBar from "../../../components/SurveyProgressBar"
//Actions
import * as actions from "../../../store/actions"
//Types
import { AnswerType,ReduxState, SurveyDetails } from "../../../store/types"
import MultipleChoice from "../MultipleChoice"
//Screens
import SingleChoice from "../SingleChoice"

interface SurveyParams {
  id: string
}

const SurveyView = () => {
  const id = parseInt(useParams<SurveyParams>().id)

  const isTokenLoaded = useSelector<ReduxState, boolean>(
    (state) => state.auth.isTokenLoaded,
  )
  const isSurveyPresent = useSelector<ReduxState, boolean>(
    (state) => !!state.surveys.surveys?.find((survey) => survey.id === id),
  )
  const survey = useSelector<ReduxState, SurveyDetails | null>((state) =>
    state.surveys.survey?.id === id ? state.surveys.survey : null,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isTokenLoaded || survey) {
      return
    }

    dispatch(actions.getSurvey())
  }, [isTokenLoaded, survey])

  const getScreen = (answerType: AnswerType) => {
    switch (answerType) {
      case AnswerType.SingleChoice:
        return SingleChoice
      case AnswerType.MultipleChoice:
        return MultipleChoice
    }
  }

  if (!survey) {
    return isSurveyPresent ? null : <Redirect to={`/surveys`} />
  }

  return (
    <>
      <MemoryRouter initialEntries={[survey?.questions[0].id.toString()]}>
        <SurveyProgressBar />

        <Switch>
          {survey?.questions.map((question) => (
            <Route
              key={question.id}
              path={question.id.toString()}
              component={getScreen(question.answerType)}
            />
          ))}
        </Switch>
      </MemoryRouter>
    </>
  )
}

export default SurveyView
