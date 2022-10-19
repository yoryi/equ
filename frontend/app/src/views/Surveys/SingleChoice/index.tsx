import classNames from "classnames"
import { useFormik } from "formik"
//Utils
import _ from "lodash"
import * as React from "react"
//Hooks
import { useEffect, useMemo,useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"
import { useHistory,useLocation } from "react-router"

//Components
import { ReactComponent as ChevronLeft } from "../../../assets/chevron-left.svg"
import Button from "../../../components/Button/Button"
import Checkbox from "../../../components/Checkbox/Checkbox"
import MessageModal from "../../../components/MessageModal"
//Navigation
import rootHistory from "../../../history"
//Actions
import * as actions from "../../../store/actions"
//Types
import {
  MultipleChoiceQuestion,
  ReduxState,
  SingleChoiceAnswer,
  SingleChoiceQuestion,
} from "../../../store/types"
//Styles
import Styles from "./index.module.scss"

interface FormValues {
  answer: SingleChoiceAnswer | null
}

const SingleChoice = () => {
  const id = parseInt(useLocation().pathname)
  const history = useHistory()

  const question = useSelector<ReduxState, SingleChoiceQuestion | null>(
    (state) =>
      (state.surveys.survey?.questions.find((question) => question.id === id) ??
        null) as SingleChoiceQuestion | null,
  )
  const previousQuestionID = useSelector<ReduxState, number | null>(
    (state) =>
      state.surveys.survey?.questions[
        _.findIndex(
          state.surveys.survey.questions,
          (question) => question.id === id,
        ) - 1
      ]?.id ?? null,
  )
  const questions = useSelector<
    ReduxState,
    (SingleChoiceQuestion | MultipleChoiceQuestion)[] | null
  >((state) => state.surveys.survey?.questions ?? null)
  const dispatch = useDispatch()

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)

  const {
    values,
    setFieldValue,
    handleSubmit,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      answer:
        question?.body.find(({ key }) => key === question?.answer) ?? null,
    },
    onSubmit: ({ answer }, { setSubmitting }) => {
      if (!question || !answer) {
        setSubmitting(false)
        return
      }

      dispatch(
        actions.answerQuestion({
          question,
          answer,
        }),
      ).then(() => {
        if (nextQuestionID) {
          history.push(nextQuestionID.toString())
        } else {
          dispatch(actions.completeSurvey())
          setSuccessModalVisible(true)
        }
      })
    },
    enableReinitialize: true,
  })

  const nextQuestionID = useMemo(
    () =>
      questions?.[
        _.findIndex(questions, (question) => question.id === id) +
          (values.answer?.key === 2 ? 2 : 1)
      ]?.id ?? null,
    [questions, id, values],
  )

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  const { t } = useTranslation()

  if (!question) {
    return null
  }

  return (
    <>
      {previousQuestionID && (
        <div className={`d-flex mt-4 ml-4`}>
          <button
            className={classNames(
              Styles.previousQuestion,
              `d-flex align-items-center m-0 p-0 border-0 bg-transparent`,
            )}
            onClick={() => history.goBack()}
          >
            <ChevronLeft className={`mr-2`} />

            {t(`surveyScreen.previousQuestion`)}
          </button>
        </div>
      )}

      <div className={Styles.container}>
        <h3 className={Styles.question}>{question.title}</h3>

        <div
          className={classNames(Styles.answersContainer, {
            [`mx-auto mw-auto w-auto`]: question?.body.length === 2,
          })}
        >
          {question?.body.length === 2 &&
            question?.body.map((answer, i) => (
              <div
                key={`answer-${i}`}
                className={classNames(
                  Styles.row,
                  `justify-content-start align-items-center`,
                )}
              >
                <Checkbox
                  id={`answer-${i}`}
                  className={Styles.checkbox}
                  checked={answer.content === values.answer?.content}
                  toggle={async () => setFieldValue(`answer`, answer)}
                  rounded
                />
                <div className={Styles.answerContentContainer}>
                  <label htmlFor={`answer-${i}`} className={`ml-2 mb-0`}>
                    {answer.content}
                  </label>
                </div>
              </div>
            ))}

          {question?.body.length !== 2 &&
            _.chunk(question?.body, 2).map((chunk, i) => (
              <div key={`row-${i}`} className={Styles.row}>
                {chunk.map((answer, j) => (
                  <div
                    key={`answer-${i}-${j}`}
                    className={Styles.answerContainer}
                  >
                    <Checkbox
                      id={`answer-${i}-${j}`}
                      className={Styles.checkbox}
                      checked={answer.content === values.answer?.content}
                      toggle={async () => setFieldValue(`answer`, answer)}
                      rounded
                    />
                    <div className={Styles.answerContentContainer}>
                      <label htmlFor={`answer-${i}-${j}`}>
                        {answer.content}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>

        <div className={Styles.submitButtonContainer}>
          <Button
            size={`md`}
            onClick={() => handleSubmit()}
            type={`submit`}
            disabled={!values.answer || isSubmitting}
          >
            {t(
              `surveyScreen.${
                nextQuestionID ? `nextQuestion` : `completeSurvey`
              }`,
            )}
          </Button>
        </div>
      </div>

      <MessageModal
        visible={isSuccessModalVisible}
        onClose={() => {
          setSuccessModalVisible(false)
          setTimeout(() => rootHistory.push(`/`))
        }}
        title={t(`common:success`)}
        message={t(`surveyScreen.thankYouForCompletingCollegeInterestsSurvey`)}
        buttonLabel={t(`common:closeWindow`)}
      />
    </>
  )
}

export default SingleChoice
