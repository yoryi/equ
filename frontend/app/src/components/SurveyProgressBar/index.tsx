//Utils
import _ from "lodash"
import * as React from "react"
//Hooks
import { useSelector } from "react-redux"
import { useLocation } from "react-router"

//Types
import { ReduxState } from "../../store/types"
//Styles
import Styles from "./index.module.scss"

const SurveyProgressBar: React.FC = () => {
  const id = parseInt(useLocation().pathname)

  const progress = useSelector<ReduxState, number>((state) =>
    state.surveys.survey
      ? _.findIndex(
          state.surveys.survey.questions,
          (question) => question.id === id,
        ) / state.surveys.survey.questions.length
      : 0,
  )

  return (
    <div className={Styles.container}>
      <div
        className={Styles.progress}
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}

export default SurveyProgressBar
