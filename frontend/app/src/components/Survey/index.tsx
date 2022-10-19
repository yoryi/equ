import * as mui from "@material-ui/core"
import * as React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { ReactComponent as Book } from "../../assets/book.svg"
import {
  CompletionStatus,
  CompletionStep,
  ReduxState,
  Survey as TSurvey,
} from "../../store/types"
import Button from "../Button/Button"
import Styles from "./index.module.scss"

interface SurveyProps {
  survey: TSurvey
  loading?: undefined
}

interface LoadingSurveyProps {
  survey?: undefined
  loading: true
}

const Survey: React.VFC<SurveyProps | LoadingSurveyProps> = ({
  survey,
  loading,
}) => {
  const isSurveyCompleted = useSelector<ReduxState, boolean>(
    (state) =>
      state.profile.profile?.completion[
        CompletionStep.CollegePreferenceSurvey
      ] === CompletionStatus.Completed,
  )

  const { t } = useTranslation()

  return (
    <div className={Styles.container}>
      {!loading && (
        <div className={Styles.iconBox}>
          <Book />
        </div>
      )}
      {loading && <mui.Skeleton width={48} height={48} variant="circular" />}

      <h1 className={Styles.title}>
        {!loading && survey?.title}
        {loading && <mui.Skeleton width={150} className={`mt-2`} />}
      </h1>

      <p className={Styles.description}>
        {!loading && survey?.description}
        {loading &&
          Array.from({ length: 3 }, (_, index) => (
            <mui.Skeleton
              key={index}
              className={`d-flex flex-column my-1`}
              width={175}
              {...(index && { style: { marginTop: `8px` } })}
            />
          ))}
      </p>

      {!loading && (
        <div className={`d-flex justify-content-center`}>
          <Button
            className={Styles.button}
            size={`auto`}
            to={`/surveys/survey/${survey?.id}`}
          >
            {t(
              `surveysScreen.${
                isSurveyCompleted ? `updateAnswers` : `takeSurvey`
              }`,
            )}
          </Button>
        </div>
      )}

      {loading && <mui.Skeleton className={`mt-4`} width={175} height={48} />}
    </div>
  )
}

export default Survey
