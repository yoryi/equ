import "react-multi-carousel/lib/styles.css"

//Utils
import classNames from "classnames"
//Components
import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from "mdbreact"
import React from "react"
//Hooks
import { useState } from "react"
//Types
import { ChangeEvent } from "react"
import { useTranslation } from "react-i18next"
import Carousel from "react-multi-carousel"
import { useDispatch,useSelector } from "react-redux"
import { useHistory } from "react-router"

import ArrowIcon from "../../../assets/arrow-top.svg"
import { ReactComponent as Check } from "../../../assets/check.svg"
import { ReactComponent as Plus } from "../../../assets/plus.svg"
import IconBox from "../../../components/IconBox"
//Actions
import * as actions from "../../../store/actions"
import {
  Completion,
  CompletionStatus,
  CompletionStep,
  ReduxState,
} from "../../../store/types"
//Styles
import Styles from "./BuildYourProfile.module.scss"

interface BuildYourProfileProps {
  handleAvatarUpdate: (e: ChangeEvent<HTMLInputElement>) => void
  handleCoverUpdate: (e: ChangeEvent<HTMLInputElement>) => void
}

const BuildYourProfile: React.FC<BuildYourProfileProps> = ({
  handleAvatarUpdate,
  handleCoverUpdate,
}) => {
  const completion = useSelector<ReduxState, Completion | null>(
    (state) => state.profile.profile?.completion ?? null,
  )
  const dispatch = useDispatch()

  const [areHiddenStepsVisible, setHiddenStepsVisible] = useState(false)

  const history = useHistory()

  const responsiveCarousel = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  const progress =
    Object.values(completion ?? {}).reduce(
      (total, step) => total + Number(step === CompletionStatus.Completed),
      0,
    ) / Object.keys(completion ?? {}).length

  const CustomRightArrow = ({ onClick }: any) => (
    <button
      className={classNames(Styles.arrow, Styles.right)}
      onClick={() => onClick()}
    >
      <img
        src={ArrowIcon}
        style={{ transform: `rotate(90deg)` }}
        alt="right-arrow-slider"
      />
    </button>
  )

  const CustomLeftArrow = ({ onClick }: any) => (
    <button
      className={classNames(Styles.arrow, Styles.left)}
      onClick={() => onClick()}
    >
      <img
        src={ArrowIcon}
        style={{ transform: `rotate(-90deg)` }}
        alt="left-arrow-slider"
      />
    </button>
  )

  const handleStepClick = (step: CompletionStep) => {
    switch (step) {
      case CompletionStep.CollegePreferenceSurvey:
        history.push(`/surveys`)
        break
      case CompletionStep.MissionStatement:
        dispatch(actions.toggleMissionStatementModal(true))
        break
      case CompletionStep.TranscriptTab:
        history.push(`/transcript`)
        setTimeout(() => (window.location.hash = `#student-profile-nav`), 200)
        break
      case CompletionStep.ExtracurricularsTab:
        history.push(`/extracurriculars`)
        window.location.hash = `#student-profile-nav`
        break
      case CompletionStep.ProfessionalTab:
        history.push(`/professional`)
        window.location.hash = `#student-profile-nav`
        break
      case CompletionStep.ServiceTab:
        history.push(`/service`)
        window.location.hash = `#student-profile-nav`
        break
      case CompletionStep.RecognitionTab:
        history.push(`/recognition`)
        window.location.hash = `#student-profile-nav`
        break
      case CompletionStep.DreamSchools:
        history.push(`/your-schools`)
        break
      case CompletionStep.EquediBeat:
        history.push(`/mission-statement`)
        break
      default:
        break
    }
  }

  const onChangeHandler = (step: CompletionStep) => {
    switch (step) {
      case CompletionStep.ProfilePhoto:
        return handleAvatarUpdate
      case CompletionStep.CoverPhoto:
        return handleCoverUpdate
      default:
        return undefined
    }
  }

  const { t } = useTranslation()

  return (
    <div className={Styles.container}>
      <MDBCard className={Styles.card}>
        <MDBCardBody>
          <div className={Styles.titleContainer}>
            <MDBCardTitle className={Styles.title}>
              {progress > 0
                ? t(`profile.student.profileScreen.profileCompleted`, {
                    progress: `${Math.round(progress * 100)}%`,
                  })
                : t(`profile.student.profileScreen.buildYourProfile`)}
            </MDBCardTitle>

            <button
              className={Styles.toggleHiddenStepsVisibility}
              onClick={() => setHiddenStepsVisible(!areHiddenStepsVisible)}
            >
              {t(
                `profile.student.profileScreen.${
                  areHiddenStepsVisible ? `hideHiddenSteps` : `showHiddenSteps`
                }`,
              )}
            </button>
          </div>

          <MDBCardText>
            <div className={Styles.progress}>
              <div
                className={Styles.bar}
                style={{ width: `${progress * 100}%` }}
              />

              <IconBox
                className={Styles.icon}
                style={{ left: `${progress * 100}%` }}
                icon={Check}
                variant={`white`}
                shadow
              />
            </div>

            <Carousel
              swipeable={true}
              draggable={false}
              responsive={responsiveCarousel}
              infinite={false}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass={Styles.carousel}
              removeArrowOnDeviceType={[`tablet`, `mobile`]}
              customRightArrow={<CustomRightArrow />}
              customLeftArrow={<CustomLeftArrow />}
              itemClass="carousel-item-padding-40-px"
            >
              {Object.entries(completion ?? {})
                .filter(
                  ([_, status]) =>
                    areHiddenStepsVisible || status !== CompletionStatus.Hidden,
                )
                .map(([step, status], i) => (
                  <Step
                    key={`step-${i}`}
                    status={status}
                    title={t(
                      `profile.student.profileScreen.buildYourProfileSteps.${step}.name`,
                    )}
                    text={t(
                      `profile.student.profileScreen.buildYourProfileSteps.${step}.description`,
                    )}
                    onClick={() => handleStepClick(step as CompletionStep)}
                    onHideToggle={() =>
                      dispatch(
                        actions.updateCompletionStep({
                          step: step as CompletionStep,
                          status:
                            status === CompletionStatus.Hidden
                              ? CompletionStatus.Pending
                              : CompletionStatus.Hidden,
                        }),
                      )
                    }
                    onChange={onChangeHandler(step as CompletionStep)}
                  />
                ))}
            </Carousel>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
}

interface StepProps {
  status: CompletionStatus
  title: string
  text: string
  onClick: () => void
  onHideToggle: () => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Step: React.FC<StepProps> = ({
  status,
  title,
  text,
  onClick,
  onHideToggle,
  onChange,
}) => {
  const { t } = useTranslation()

  return (
    <button className={Styles.item} onClick={onClick}>
      <IconBox
        icon={status === CompletionStatus.Completed ? Check : Plus}
        variant={status === CompletionStatus.Completed ? `dark` : `light`}
      />

      <div className={Styles.content}>
        <span className={Styles.title}>{title}</span>

        <span className={Styles.text}>{text}</span>

        {status !== CompletionStatus.Completed && (
          <button
            className={Styles.hideStep}
            onClick={(e) => {
              e.stopPropagation()

              onHideToggle()
            }}
          >
            {t(
              `profile.student.profileScreen.${
                status === CompletionStatus.Hidden ? `showStep` : `hideStep`
              }`,
            )}
          </button>
        )}
      </div>

      {onChange && (
        <input className={Styles.input} type={`file`} onChange={onChange} />
      )}
    </button>
  )
}

export default BuildYourProfile
