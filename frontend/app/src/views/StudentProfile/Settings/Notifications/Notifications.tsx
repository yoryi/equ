import { useFormik } from "formik"
import React, { useEffect,useMemo } from "react"
//Hooks
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import Button from "../../../../components/Button/Button"
import Checkbox from "../../../../components/Checkbox/Checkbox"
//Components
import MessageModal from "../../../../components/MessageModal"
import useLoader from "../../../../hooks/useLoader"
import { actions } from "../../../../store"
import { ReduxState } from "../../../../store/types"
//Types
import { NotificationsSettings } from "../../../../store/types"

type FormValues = Pick<
  NotificationsSettings,
  "emailFollowActivity" | "emailNewsForYou"
>

export const Notifications = () => {
  const { notifications } = useSelector((state: ReduxState) => state.settings)
  const dispatch = useDispatch()

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)

  const { onLoadComplete } = useLoader()

  useEffect(() => {
    if (notifications) {
      onLoadComplete()
      return
    }

    dispatch(actions.getNotificationsSettings())
  }, [notifications])

  const initialValues = useMemo<FormValues>(
    () =>
      !!notifications
        ? notifications
        : {
            emailFollowActivity: false,
            emailNewsForYou: false,
          },
    [notifications],
  )

  const {
    values,
    handleChange,
    isSubmitting,
    handleSubmit,
  } = useFormik<FormValues>({
    initialValues,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      dispatch(
        actions.updateNotificationsSettings({
          emailFollowActivity: values.emailFollowActivity,
          emailNewsForYou: values.emailNewsForYou,
        }),
      )
        .then(() => setSuccessModalVisible(true))
        .catch(({ errors }: { errors: { [field: string]: string } }) =>
          setErrors(errors),
        )
        .finally(() => setSubmitting(false))
    },
    enableReinitialize: true,
  })

  const { t } = useTranslation()

  return (
    <>
      <form
        className="notifications-settings-container"
        onSubmit={handleSubmit}
      >
        <div className="notifications-settings-title">
          {t(`settings.notifications.emailNotifications`)}
        </div>
        <div>
          <div className="notifications-settings-item">
            <Checkbox
              name={`emailNewsForYou`}
              checked={values.emailNewsForYou}
              onChange={handleChange}
            />
            <div>
              <div className="notifications-settings-item-text">
                {t(`settings.notifications.referenceNotifications`)}
              </div>
              <div className="notifications-settings-item-subtext">
                {t(
                  `settings.notifications.receiveAnEmailWhenYouReceiveReference`,
                )}
              </div>
            </div>
          </div>
          <div className="notifications-settings-item">
            <Checkbox
              name={`emailFollowActivity`}
              checked={values.emailFollowActivity}
              onChange={handleChange}
            />

            <div>
              <div className="notifications-settings-item-text">
                {t(`settings.notifications.followNotifications`)}
              </div>
              <div className="notifications-settings-item-subtext">
                {t(
                  `settings.notifications.receiveEmailWhenUniversityRequestFollow`,
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="notifications-settings-submit">
          <Button type={`submit`} disabled={isSubmitting}>
            {t(`common:saveChanges`)}
          </Button>
        </div>
      </form>

      <MessageModal
        title={t(`common:success`)}
        message={t(`settings.notifications.notificationsSettingsSaved`)}
        visible={isSuccessModalVisible}
        onClose={() => setSuccessModalVisible(false)}
      />
    </>
  )
}
