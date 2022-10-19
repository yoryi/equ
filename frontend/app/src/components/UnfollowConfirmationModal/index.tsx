import * as React from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//Hooks
import { useDispatch } from "react-redux"

//Actions
import * as actions from "../../store/actions"
//Types
import {
  Profile,
  Search,
  StudentProfile,
  University,
  UniversityProfile,
} from "../../store/types"
//Components
import Modal from "../Modal/Modal"

interface UnfollowConfirmationModalProps {
  visible: boolean
  onClose: () => void
}

interface UnfollowConfirmationStudentModalProps {
  student: Profile | StudentProfile
  university?: undefined
}

interface UnfollowConfirmationUniversityModalProps {
  student?: undefined
  university: University | UniversityProfile | Search.UniversityResult
}

const UnfollowConfirmationModal: React.VFC<
  UnfollowConfirmationModalProps &
    (
      | UnfollowConfirmationStudentModalProps
      | UnfollowConfirmationUniversityModalProps
    )
> = ({ student, university, visible, onClose }) => {
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const handleUnfollow = async () => {
    try {
      dispatch(
        student
          ? actions.unfollowStudent(student)
          : actions.unfollowUniversity(university!),
      )
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }

    onClose()
  }

  return (
    <Modal
      isOpen={visible}
      toggle={onClose}
      title={t(
        `common:unfollowConfirmationModal.${
          student ? `student` : `university`
        }.title`,
      )}
      footer={t(`common:${student ? `unfollowStudent` : `unfollowSchool`}`)}
      footerAction={handleUnfollow}
      size={`lg`}
      closeIcon
      removeButton
    >
      <p className={`text-center mx-2 mx-md-5`}>
        {t(
          `common:unfollowConfirmationModal.${
            student ? `student` : `university`
          }.message`,
        )}
      </p>
    </Modal>
  )
}

export default UnfollowConfirmationModal
