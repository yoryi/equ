import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

import checkedIcon from "../../../../assets/checked.svg"
import Modal from "../../../../components/Modal/Modal"
import { actions } from "../../../../store"
import getAvatar from "../../../../utils/getAvatar"

interface ChangeAvatarProps {
  isOpen: boolean
  toggle: () => void
  setFieldValue: any
  values: any
}

interface AvatarProps {
  id: number
  icon: string
}

export const ChangeAvatar: React.FC<ChangeAvatarProps> = ({
  isOpen,
  toggle,
  setFieldValue,
  values,
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const renderAvatar = (clickedAvatar: AvatarProps) => {
    const { id, icon } = clickedAvatar
    const { privateAvatar } = values
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
            privateAvatar === id ? `-active` : ``
          }`}
        />
        <div>
          {privateAvatar === id && (
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
      <Modal
        title={t(`settings.studentProfileSettingsScreen.yourAvatarYourPrivacy`)}
        isOpen={isOpen}
        toggle={toggle}
        closeIcon={true}
        subtitle=""
        body={
          <div className="change-avatar-modal">
            <div className="change-avatar-modal-subtitle">
              {t(
                `settings.studentProfileSettingsScreen.pickAnAvatarToKeepProfilePrivate`,
              )}
            </div>
            <div style={{ marginTop: 20 }}>
              <div className="register-title-fourth-step-row">
                {avatarsFirstRow.map((item) => renderAvatar(item))}
              </div>
              <div className="register-title-fourth-step-row">
                {avatarsSecondRow.map((item) => renderAvatar(item))}
              </div>
              <div className="register-title-fourth-step-row">
                {avatarsThirdRow.map((item) => renderAvatar(item))}
              </div>
              <div className="register-title-fourth-step-row">
                {avatarsFourthRow.map((item) => renderAvatar(item))}
              </div>
            </div>
          </div>
        }
        footer={t(`common:saveChanges`)}
        footerAction={() => {
          dispatch(
            actions.updateStudentPrivateAvatar({
              privateAvatar: values.privateAvatar,
            }),
          )
        }}
      />
    </>
  )
}

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
]

const avatarsFourthRow = [
  {
    id: 11,
    icon: getAvatar(11),
  },
  {
    id: 13,
    icon: getAvatar(13),
  },
  {
    id: 10,
    icon: getAvatar(10),
  },
  {
    id: 9,
    icon: getAvatar(9),
  },
]
