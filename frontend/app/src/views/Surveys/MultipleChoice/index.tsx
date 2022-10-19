import classNames from "classnames"
import { useFormik } from "formik"
//Utils
import _ from "lodash"
import * as React from "react"
//Hooks
import { useEffect,useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"
import { useHistory,useLocation } from "react-router"

//Components
import { ReactComponent as ChevronLeft } from "../../../assets/chevron-left.svg"
import RegionMap from "../../../assets/region-map.png"
import Button from "../../../components/Button/Button"
import Checkbox from "../../../components/Checkbox/Checkbox"
import MessageModal from "../../../components/MessageModal"
//Navigation
import rootHistory from "../../../history"
//Actions
import * as actions from "../../../store/actions"
//Types
import {
  MultipleChoiceAnswer,
  MultipleChoiceQuestion,
  ReduxState,
} from "../../../store/types"
//Styles
import Styles from "./index.module.scss"

interface FormValues {
  answer: MultipleChoiceAnswer[]
}

const MultipleChoice = () => {
  const id = parseInt(useLocation().pathname)
  const history = useHistory()

  const question = useSelector<ReduxState, MultipleChoiceQuestion | null>(
    (state) =>
      (state.surveys.survey?.questions.find((question) => question.id === id) ??
        null) as MultipleChoiceQuestion | null,
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
  const nextQuestionID = useSelector<ReduxState, number | null>(
    (state) =>
      state.surveys.survey &&
      state.surveys.survey.questions[
        _.findIndex(
          state.surveys.survey.questions,
          (question) => question.id === id,
        ) + 1
      ]?.id,
  )
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
        (question?.answer &&
          question?.body.filter(
            ({ key }) => question?.answer?.indexOf(key) !== -1,
          )) ??
        [],
    },
    onSubmit: ({ answer }, { setSubmitting }) => {
      if (!question || answer.length === 0) {
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

  useEffect(() => {
    if (!question || question?.answer) {
      return
    }

    dispatch(actions.getQuestionAnswers(question?.studentPreferenceType))
  }, [dispatch, question])

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
              `d-flex align-items-center p-0 m-0 border-0 bg-transparent`,
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

        {question?.studentPreferenceType === 2 && (
          <img
            className={`w-100 mt-5`}
            style={{ maxWidth: 538 }}
            src={RegionMap}
            alt={question?.title}
          />
        )}

        <div className={Styles.answersContainer}>
          {_.chunk(question?.body, 2).map((chunk, i) => (
            <div key={`row-${i}`} className={Styles.row}>
              {chunk.map((answer, j) => (
                <div
                  key={`answer-${i}-${j}`}
                  className={Styles.answerContainer}
                >
                  <Checkbox
                    id={`answer-${i}-${j}`}
                    className={Styles.checkbox}
                    checked={
                      !!values.answer.find(({ key }) => answer.key === key)
                    }
                    toggle={async () =>
                      setFieldValue(
                        `answer`,
                        values.answer.find(
                          ({ content }) => content === answer.content,
                        )
                          ? values.answer.filter(
                              ({ content }) => content !== answer.content,
                            )
                          : [...values.answer, answer],
                      )
                    }
                  />
                  <div className={Styles.answerContentContainer}>
                    <label htmlFor={`answer-${i}-${j}`}>{answer.content}</label>
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
            disabled={!values.answer.length || isSubmitting}
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

export default MultipleChoice
