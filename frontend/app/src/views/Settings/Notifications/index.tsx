//Utils
import classNames from "classnames"
import { useFormik } from "formik"
import * as React from "react"
//Hooks
import { useEffect, useMemo,useState } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"

import Button from "../../../components/Button/Button"
//Components
import Checkbox from "../../../components/Checkbox/Checkbox"
import MessageModal from "../../../components/MessageModal"
import useLoader from "../../../hooks/useLoader"
//Actions
import * as actions from "../../../store/actions"
//Types
import { NotificationsSettings,ReduxState } from "../../../store/types"
//Styles
import Styles from "./index.module.scss"

type FormValues = Pick<
  NotificationsSettings,
  "emailFollowActivity" | "emailFollowerDigest"
>

const Notifications: React.FC = () => {
  const notifications = useSelector<ReduxState, NotificationsSettings | null>(
    (state) => state.settings.notifications,
  )
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
            emailFollowerDigest: false,
          },
    [notifications],
  )

  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues,
    onSubmit: async (values) => {
      try {
        await dispatch(
          actions.updateNotificationsSettings({
            ...values,
            emailAccountActivity: false,
            emailNewsForYou: false,
            browserMessages: false,
            browserFollowsAndConnections: false,
          }),
        )

        setSuccessModalVisible(true)
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }
      }
    },
    enableReinitialize: true,
  })

  const { t } = useTranslation()

  return (
    <>
      <form className={`d-flex flex-column`} onSubmit={handleSubmit}>
        <h3 className={`d-none d-md-block`}>
          {t(`settings.notifications.emailNotifications`)}
        </h3>
        <h1 className={`d-block d-md-none mb-2`}>
          {t(`settings.notifications.emailNotifications`)}
        </h1>

        <div className={`d-flex mt-4`}>
          <Checkbox
            name={`emailFollowActivity`}
            checked={values.emailFollowActivity}
            onChange={handleChange}
          />

          <div className={`d-flex flex-column ml-2`}>
            <h4 className={`font-weight-bold font-weight-md-normal mb-1`}>
              {t(`settings.notifications.followActivity`)}
            </h4>
            <span className={`text-4`}>
              {t(
                `settings.notifications.getNotificationsWhenUsersAcceptFollowRequest`,
              )}
            </span>
          </div>
        </div>

        <div className={`d-flex mt-4`}>
          <Checkbox
            name={`emailFollowerDigest`}
            checked={values.emailFollowerDigest}
            onChange={handleChange}
          />

          <div className={`d-flex flex-column ml-2`}>
            <h4 className={`font-weight-bold font-weight-md-normal mb-1`}>
              {t(`settings.notifications.followerDigest`)}
            </h4>
            <span className={`text-4`}>
              {t(`settings.notifications.monthlyNewsletterFeaturingNews`)}
            </span>
          </div>
        </div>

        <Button
          className={classNames(Styles.submitButton, `align-self-center`)}
          type={`submit`}
          disabled={isSubmitting}
        >
          {t(`common:saveChanges`)}
        </Button>
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

export default Notifications
