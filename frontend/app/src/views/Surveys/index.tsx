//Utils
import _ from "lodash"
import * as React from "react"
//Hooks
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"

//Components
import Survey from "../../components/Survey"
import useLoader from "../../hooks/useLoader"
//Actions
import * as actions from "../../store/actions/surveys"
//Types
import { ReduxState, Survey as TSurvey } from "../../store/types"
//Styles
import Styles from "./index.module.scss"

const Surveys = () => {
  const isTokenLoaded = useSelector<ReduxState, boolean>(
    (state) => state.auth.isTokenLoaded,
  )
  const surveys = useSelector<ReduxState, TSurvey[] | null>(
    (state) => state.surveys.surveys,
  )
  const dispatch = useDispatch()

  const { onLoadComplete } = useLoader()

  useEffect(() => {
    if (!isTokenLoaded || !!surveys) {
      return
    }

    dispatch(actions.getSurveys())
  }, [isTokenLoaded, surveys])

  useEffect(() => {
    if (!surveys) {
      return
    }

    onLoadComplete()
  }, [surveys])

  const { t } = useTranslation()

  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>{t(`surveysScreen.studentSurveys`)}</h1>

      <div className={Styles.surveys}>
        {surveys?.map((survey) => (
          <Survey key={`survey-${survey.id}`} survey={survey} />
        ))}

        {!surveys &&
          _.times(2, (i) => <Survey key={`surveyPlaceholder-${i}`} loading />)}
      </div>
    </div>
  )
}

export default Surveys
