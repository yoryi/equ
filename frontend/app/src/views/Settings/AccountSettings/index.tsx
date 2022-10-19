import { useFormik } from "formik"
//Components
import {
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBPopover,
  MDBPopoverBody,
  MDBRow,
} from "mdbreact"
import * as React from "react"
//Hooks
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
//Types
import { ChangeEvent } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
//Utils
import * as yup from "yup"

import CloseIcon from "../../../assets/close-icon.svg"
import Button from "../../../components/Button/Button"
import CropImageModal, {
  CropImageModalRef,
} from "../../../components/CropImageModal"
import MessageModal from "../../../components/MessageModal"
import ProfilePhoto from "../../../components/ProfilePhoto"
import TextField from "../../../components/TextField/TextField"
import useLoader from "../../../hooks/useLoader"
//Actions
import * as actions from "../../../store/actions"
import {
  CroppedImage,
  PageAdministrator,
  ReduxState,
  University,
  UniversityAccountSettings,
} from "../../../store/types"
//Styles
import Styles from "./index.module.scss"

interface Values {
  name: string
  city: string
}

const AccountSettings: React.FC = () => {
  const isTokenLoaded = useSelector<ReduxState, boolean>(
    (state) => !!state.auth.tokenType && !!state.auth.accessToken,
  )
  const university = useSelector<ReduxState, University | null>(
    (state) => state.university.profile,
  )
  const universityAccountSettings = useSelector<
    ReduxState,
    UniversityAccountSettings | null
  >((state) => state.settings.universityAccountSettings)
  const isUniversityPageAdministratorLoaded = useSelector<ReduxState, boolean>(
    (state) => state.settings.isUniversityPageAdministratorLoaded,
  )
  const universityPageAdministrator = useSelector<
    ReduxState,
    PageAdministrator | null
  >((state) => state.settings.universityPageAdministrator)
  const dispatch = useDispatch()

  const [isPopoverVisible, setPopoverVisible] = useState(false)
  const [isAvatarUpdating, setAvatarUpdating] = useState(false)
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)

  const popoverBodyRef = useRef<HTMLDivElement>(null)
  const cropImageRef = useRef<CropImageModalRef>(null)

  const { onLoadComplete } = useLoader()

  const { t } = useTranslation()

  const initialValues = useMemo<Values>(
    () => ({
      name: universityAccountSettings?.name ?? ``,
      city: universityAccountSettings?.city ?? ``,
    }),
    [universityAccountSettings],
  )

  const validationSchema = yup.object({
    name: yup.string().required(),
    city: yup.string().required(),
  })

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik<Values>({
    initialValues,
    validationSchema,
    onSubmit: async ({ name, city }, { setErrors, setSubmitting }) => {
      try {
        await dispatch(
          actions.updateUniversityAccountSettings({
            name,
            city,
          }),
        )

        setSuccessModalVisible(true)
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }

        setErrors(err.errors ?? {})
      }
      setSubmitting(false)
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    if (!isTokenLoaded) {
      return
    }

    dispatch(actions.getUniversityAccountSettings())
  }, [isTokenLoaded, dispatch])

  useEffect(() => {
    if (!isTokenLoaded || isUniversityPageAdministratorLoaded) {
      return
    }

    dispatch(actions.getUniversityPageAdministrator())
  }, [isTokenLoaded, isUniversityPageAdministratorLoaded, dispatch])

  const handleDocumentClick = useCallback(
    (e: MouseEvent) => {
      if (popoverBodyRef.current?.contains(e.target as Node)) {
        return
      }

      setPopoverVisible(false)
    },
    [popoverBodyRef, setPopoverVisible],
  )

  useEffect(() => {
    document.addEventListener(`click`, handleDocumentClick)

    return () => document.removeEventListener(`click`, handleDocumentClick)
  }, [handleDocumentClick])

  useEffect(() => {
    if (!universityAccountSettings || !isUniversityPageAdministratorLoaded) {
      return
    }

    onLoadComplete()
  }, [universityAccountSettings, isUniversityPageAdministratorLoaded])

  const handleAvatarUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.files?.[0]
    if (!avatar) {
      return
    }

    cropImageRef.current?.load(avatar)
  }

  const handleAvatarUpload = async (avatar: CroppedImage) => {
    setAvatarUpdating(true)
    try {
      await dispatch(actions.updateUniversityAvatar(avatar))
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }

    setAvatarUpdating(false)
    setPopoverVisible(false)
  }

  const handleAvatarDelete = async () => {
    setAvatarUpdating(true)
    try {
      await dispatch(actions.deleteUniversityAvatar())
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }

    setAvatarUpdating(false)
    setPopoverVisible(false)
    setDeleteModalVisible(false)
  }

  if (!university) {
    return null
  }

  return (
    <>
      <form className={Styles.container} onSubmit={handleSubmit}>
        <div className={Styles.content}>
          <section>
            <h3 className={`d-none d-md-block`}>
              {t(`settings.accountSettings.accountSettings`)}
            </h3>
            <h1 className={`d-block d-md-none mb-4`}>
              {t(`settings.accountSettings.accountSettings`)}
            </h1>

            <div ref={popoverBodyRef}>
              <MDBPopover
                className={Styles.popover}
                isVisible={isPopoverVisible}
                onChange={
                  ((visible: boolean) => setPopoverVisible(visible)) as any
                }
                placement={`bottom`}
                clickable
              >
                <button className={Styles.changeLogo} type={`button`}>
                  <ProfilePhoto university={university} />

                  <div className={Styles.details}>
                    <h3>{university.name}</h3>
                    <span className={`text-3`}>
                      {t(
                        isAvatarUpdating
                          ? `common:loading`
                          : `common:changeLogo`,
                      )}
                    </span>
                  </div>
                </button>

                <MDBPopoverBody className={Styles.body}>
                  <button>
                    {t(
                      `common:${
                        university?.avatar ? `changeLogo` : `uploadLogo`
                      }`,
                    )}

                    <input
                      className={Styles.input}
                      type={`file`}
                      accept={`image/png, image/jpeg`}
                      onChange={handleAvatarUpdate}
                    />
                  </button>

                  {university?.avatar && (
                    <button
                      className={Styles.destructive}
                      onClick={() => setDeleteModalVisible(true)}
                      type={`button`}
                    >
                      {t(`common:removeLogo`)}
                    </button>
                  )}
                </MDBPopoverBody>
              </MDBPopover>
            </div>

            <div className={Styles.form}>
              <MDBRow>
                <MDBCol md={`6`} sm={`12`}>
                  <TextField
                    name={`name`}
                    value={values.name}
                    onChange={handleChange}
                    title={t(`common:fullName`)}
                    placeholder={t(`common:fullName`)}
                    error={touched.name && errors.name}
                    size={`auto`}
                  />
                </MDBCol>

                <MDBCol md={`6`} sm={`12`}>
                  <TextField
                    name={`city`}
                    value={values.city}
                    onChange={handleChange}
                    title={t(`common:address`)}
                    placeholder={t(`common:address`)}
                    error={touched.city && errors.city}
                    size={`auto`}
                  />
                </MDBCol>
              </MDBRow>
            </div>
          </section>

          <section>
            <h3 className={`d-none d-md-block`}>
              {t(`settings.accountSettings.pageAdministrator`)}
            </h3>
            <h1 className={`d-block d-md-none mb-0`}>
              {t(`settings.accountSettings.pageAdministrator`)}
            </h1>

            <span className={`text-4`}>
              {t(
                `settings.accountSettings.pleaseEmailToReassignPageAdministrator`,
              )}
            </span>

            <div className={Styles.form}>
              <MDBRow>
                <MDBCol md={`6`} sm={`12`}>
                  <TextField
                    value={universityPageAdministrator?.firstName ?? ``}
                    title={t(`common:firstName`)}
                    placeholder={t(`common:firstName`)}
                    size={`auto`}
                    disabled
                  />
                </MDBCol>

                <MDBCol md={`6`} sm={`12`}>
                  <TextField
                    value={universityPageAdministrator?.lastName ?? ``}
                    title={t(`common:lastName`)}
                    placeholder={t(`common:lastName`)}
                    size={`auto`}
                    disabled
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md={`12`} sm={`12`}>
                  <TextField
                    value={universityPageAdministrator?.email ?? ``}
                    title={t(`common:email`)}
                    placeholder={t(`common:email`)}
                    size={`auto`}
                    disabled
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md={`6`} sm={`12`}>
                  <TextField
                    value={universityPageAdministrator?.phone ?? ``}
                    title={t(`common:phoneNumber`)}
                    placeholder={t(`common:phoneNumber`)}
                    size={`auto`}
                    disabled
                  />
                </MDBCol>

                <MDBCol md={`6`} sm={`12`}>
                  <TextField
                    value={universityPageAdministrator?.position ?? ``}
                    title={t(`common:position`)}
                    placeholder={t(`common:position`)}
                    size={`auto`}
                    disabled
                  />
                </MDBCol>
              </MDBRow>
            </div>
          </section>
        </div>

        <Button disabled={isSubmitting} type={`submit`}>
          {t(`common:saveChanges`)}
        </Button>
      </form>

      <CropImageModal
        ref={cropImageRef}
        type={`avatar`}
        onChange={handleAvatarUpload}
      />

      <MessageModal
        title={t(`common:success`)}
        message={t(`settings.accountSettings.accountSettingsSaved`)}
        visible={isSuccessModalVisible}
        onClose={() => setSuccessModalVisible(false)}
      />

      <MDBModal
        isOpen={isDeleteModalVisible}
        toggle={() => setDeleteModalVisible(!isDeleteModalVisible)}
        size={`sm`}
        inline={false}
        noClickableBodyWithoutBackdrop={false}
        overflowScroll={false}
        centered
      >
        <MDBModalHeader titleClass={`w-100 d-flex`} tag={`div`}>
          <div style={{ width: 14 }} />

          <h3 className={`flex-grow-1`}>
            {t(`common:confirmDeletionModalTitle`)}
          </h3>

          <button
            onClick={() => setDeleteModalVisible(false)}
            className={`mt-n2 p-0 border-0 bg-transparent`}
          >
            <img src={CloseIcon} alt="close-icon" />
          </button>
        </MDBModalHeader>

        <MDBModalBody>
          <p className={`text-center`}>
            {t(`common:areYouSureYouWantToDelete`)}
          </p>
        </MDBModalBody>

        <MDBModalFooter>
          <Button size={`auto`} onClick={handleAvatarDelete} removeButton>
            {t(`common:delete`)}
          </Button>
        </MDBModalFooter>
      </MDBModal>
    </>
  )
}

export default AccountSettings
