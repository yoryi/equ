import * as React from "react"
//Hooks
import { useEffect, useState } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

//Actions
import * as actions from "../../store/actions"
//Types
import { ReduxState, Reference, ReferenceType, Role } from "../../store/types"
import MessageModal from "../MessageModal"
//Components
import Modal from "../Modal/Modal"
import ProfilePhoto from "../ProfilePhoto"
//Styles
import Styles from "./index.module.scss"

interface ReferenceModalProps {
  reference: Reference | null
  visible: boolean
  onToggleVisibility: () => void
  onDelete?: () => Promise<void>
  viewType?: "accept" | "view"
  className?: string
}

const ReferenceModal: React.FC<ReferenceModalProps> = ({
  reference,
  visible,
  onToggleVisibility,
  onDelete,
  viewType = `view`,
  className,
}) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const { firstName, lastName } = useSelector<
    ReduxState,
    { firstName: string | null; lastName: string | null }
  >((state) => ({
    firstName:
      (isViewingOwnProfile
        ? state.profile.profile?.firstName
        : state.student.profile?.firstName) ?? null,
    lastName:
      (isViewingOwnProfile
        ? state.profile.profile?.lastName
        : state.student.profile?.lastName) ?? null,
  }))
  const user = useSelector<ReduxState, { role: Role } | null>(
    (state) => state.auth.user ?? null,
  )

  const dispatch = useDispatch()

  const [isAcceptModalVisible, setAcceptModalVisible] = useState(false)
  const [isRejectModalVisible, setRejectModalVisible] = useState(false)
  const [isDeleteConfirmationModalVisible, setDeleteConfirmationModalVisible] =
    useState(false)

  const { t } = useTranslation()

  useEffect(() => {
    if (!visible) {
      return
    }

    document.body.className = `modal-open overflow-hidden`
  }, [visible])

  const handleAccept = async () => {
    try {
      await dispatch(actions.acceptReference(reference!))
      onToggleVisibility()
      setAcceptModalVisible(true)
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
  }

  const handleReject = async () => {
    try {
      await dispatch(actions.rejectReference(reference!))
      onToggleVisibility()
      setRejectModalVisible(true)
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
    setDeleteConfirmationModalVisible(false)
  }

  const handleDelete = async () => {
    try {
      await (onDelete?.() ?? dispatch(actions.deleteReference(reference!)))
      onToggleVisibility()
      setDeleteConfirmationModalVisible(false)
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
    setDeleteConfirmationModalVisible(false)
  }

  return (
    <>
      <Modal
        isOpen={
          visible &&
          !isAcceptModalVisible &&
          !isRejectModalVisible &&
          !isDeleteConfirmationModalVisible
        }
        toggle={onToggleVisibility}
        title={t(`common:referenceFor`, {
          reference: t(
            `common:${
              reference?.referenceLink.type === ReferenceType.Academic
                ? `academic`
                : `activity`
            }Reference`,
          ),
          name:
            user?.role === Role.Admin || user?.role === Role.Program
              ? `${reference?.firstName} ${reference?.lastName}`
              : `${firstName} ${lastName}`,
        })}
        className={`${Styles.modalBody} ${className ? className : ``}`}
        footerStyle={{
          display: `flex`,
          flexDirection: `column`,
          marginBottom: 32,
        }}
        footer={viewType === `accept` ? t(`common:addToProfile`) : undefined}
        footerAction={viewType === `accept` ? handleAccept : undefined}
        deleteFooter={
          isViewingOwnProfile
            ? viewType === `accept`
              ? t(`common:rejectReference`)
              : t(`common:deleteReference`)
            : undefined
        }
        deleteAction={() => setDeleteConfirmationModalVisible(true)}
        size={`fluid`}
        confirmDeletion={false}
        closeIcon
      >
        <div className={Styles.profileContainer}>
          {reference && <ProfilePhoto reference={reference} />}

          <div className={Styles.detailsContainer}>
            <span
              className={Styles.name}
            >{`${reference?.firstName} ${reference?.lastName}`}</span>
            <span className={Styles.position}>{reference?.position}</span>
            <span className={Styles.classes}>{reference?.organization}</span>
          </div>
        </div>

        <p className={Styles.content}>{reference?.content}</p>
      </Modal>

      <MessageModal
        title={t(`common:success`)}
        message={t(`notificationsScreen.referenceAddedToProfile`)}
        visible={isAcceptModalVisible}
        onClose={() => setAcceptModalVisible(false)}
      />

      <MessageModal
        title={t(`common:success`)}
        message={t(`notificationsScreen.referenceDeletedSuccessfully`)}
        visible={isRejectModalVisible}
        onClose={() => setRejectModalVisible(false)}
      />

      <Modal
        isOpen={
          isDeleteConfirmationModalVisible &&
          !isAcceptModalVisible &&
          !isRejectModalVisible
        }
        toggle={() =>
          setDeleteConfirmationModalVisible(!isDeleteConfirmationModalVisible)
        }
        title={t(
          `common:${
            viewType === `accept`
              ? `pleaseConfirmReferenceRejection`
              : `pleaseConfirmReferenceDeletion`
          }`,
        )}
        size={`md`}
        footer={t(
          `common:${
            viewType === `accept` ? `rejectReference` : `deleteReference`
          }`,
        )}
        footerAction={viewType === `accept` ? handleReject : handleDelete}
        removeButton
        closeIcon
      >
        <p style={{ textAlign: `center` }}>
          {t(
            `common:${
              viewType === `accept`
                ? `referenceRejectionInfo`
                : `referenceDeletionInfo`
            }`,
          )}
        </p>
      </Modal>
    </>
  )
}

export default ReferenceModal
