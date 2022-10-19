import { useFormik } from "formik"
import * as React from "react"
//Hooks
import { useEffect, useMemo } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"

import ArrowIcon from "../../assets/arrow-top.svg"
//Images
import checkedIcon from "../../assets/checked.svg"
//Components
import Button from "../../components/Button/Button"
import Progress from "../../components/Progress/Progress"
import history from "../../history"
//Actions
import * as actions from "../../store/actions"
//Types
import { ReduxState } from "../../store/types"
//Utils
import getAvatar from "../../utils/getAvatar"

interface AvatarProps {
  id: number
  icon: string
}

interface FormValues {
  privateAvatar: number | null
}

const StudentRegisterFourthStep = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { profile } = useSelector((state: ReduxState) => state.profile)
  const { isTokenLoaded, refreshToken, signUpSucceded } = useSelector(
    (state: ReduxState) => state.auth,
  )

  const initialValues: any = useMemo(() => {
    return {
      privateAvatar:
        profile && profile.privateAvatar ? profile.privateAvatar : null,
    }
  }, [profile])

  const {
    values,
    setFieldValue,
    handleSubmit,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues,
    onSubmit: async (payload) => {
      try {
        await dispatch(
          actions.studentSignUpPrivateAvatar({
            privateAvatar: payload.privateAvatar!,
          }),
        )
        history.push(`/register/student/welcome`)
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }
      }
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    if (
      isTokenLoaded &&
      ((refreshToken && profile && profile.signUpStep === null) ||
        !refreshToken) &&
      isTokenLoaded &&
      !signUpSucceded
    ) {
      history.push(`/`)
    }
  }, [isTokenLoaded, refreshToken, profile, signUpSucceded])

  const renderAvatar = (clickedAvatar: AvatarProps) => {
    const { id, icon } = clickedAvatar
    return (
      <div
        onClick={() => {
          setFieldValue(`privateAvatar`, id)
        }}
        key={id}
      >
        <img
          src={icon}
          alt={`${id}-icon`}
          className={`register-title-fourth-step-row-avatar${
            values.privateAvatar === id ? `-active` : ``
          }`}
        />
        <div>
          {values.privateAvatar === id && (
            <img
              src={checkedIcon}
              alt="checked-icon"
              className="register-title-fourth-step-row-avatar-checked"
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <Progress value={4} />
      <div
        className="register-back-button"
        onClick={() => history.push(`/register/student/step-two`)}
      >
        <img
          src={ArrowIcon}
          alt="arrow-icon"
          style={{ transform: `rotate(-90deg)` }}
        />
        <div>{t(`common:back`)}</div>
      </div>
      <div className="register">
        <div className="register-title-fourth-step">
          {t(`signUp.student.avatarSelectionScreen.title`)}
          <div className="register-subtitle-fourth-step">
            {t(`signUp.student.avatarSelectionScreen.description`)}
          </div>
        </div>
        <div className="register-title-fourth-step-row">
          {avatarsFirstRow.map((item) => renderAvatar(item))}
        </div>
        <div className="register-title-fourth-step-row register-title-fourth-step-middle-row">
          {avatarsSecondRow.map((item) => renderAvatar(item))}
        </div>
        <div className="register-title-fourth-step-row">
          {avatarsThirdRow.map((item) => renderAvatar(item))}
        </div>
        <div className="register-submit-container fourth-step-submit">
          <div className="register-submit">
            <Button
              onClick={() => {
                handleSubmit()
              }}
              disabled={!values.privateAvatar || isSubmitting}
            >
              {t(`common:continue`)}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentRegisterFourthStep

const avatarsFirstRow = [
  {
    id: 14,
    icon: getAvatar(14),
  },
  {
    id: 15,
    icon: getAvatar(15),
  },

  {
    id: 7,
    icon: getAvatar(7),
  },
  {
    id: 1,
    icon: getAvatar(1),
  },

  {
    id: 10,
    icon: getAvatar(10),
  },
]

const avatarsSecondRow = [
  {
    id: 12,
    icon: getAvatar(12),
  },

  {
    id: 2,
    icon: getAvatar(2),
  },

  {
    id: 4,
    icon: getAvatar(4),
  },

  {
    id: 3,
    icon: getAvatar(3),
  },

  {
    id: 9,
    icon: getAvatar(9),
  },
  {
    id: 13,
    icon: getAvatar(13),
  },
]

const avatarsThirdRow = [
  {
    id: 16,
    icon: getAvatar(16),
  },
  {
    id: 6,
    icon: getAvatar(6),
  },
  {
    id: 5,
    icon: getAvatar(5),
  },
  {
    id: 8,
    icon: getAvatar(8),
  },
  {
    id: 11,
    icon: getAvatar(11),
  },
]
