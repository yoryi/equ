import { FormikValues,useFormik } from "formik"
import React, { useEffect,useMemo, useState } from "react"
import Dropdown from "react-dropdown"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import Button from "../../../../components/Button/Button"
import Checkbox from "../../../../components/Checkbox/Checkbox"
//Components
import MessageModal from "../../../../components/MessageModal"
import Modal from "../../../../components/Modal/Modal"
//Hooks
import useLoader from "../../../../hooks/useLoader"
import { actions } from "../../../../store"
import { ReduxState, Visibility } from "../../../../store/types"

export const PrivacyAndSecurity = () => {
  const privacyAndSecurity = useSelector(
    (state: ReduxState) => state.settings.privacyAndSecurity,
  )
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isPublicAllChecked, togglePublicAllChecked] = useState(false)
  const [isModalOpen, toggleIsModalOpen] = useState(``)

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)

  const { onLoadComplete } = useLoader()

  useEffect(() => {
    if (privacyAndSecurity) {
      onLoadComplete()
      return
    }

    dispatch(actions.getPrivacyAndSecuritySettings())
  }, [privacyAndSecurity])

  const initialValues: FormikValues = useMemo(
    () =>
      privacyAndSecurity
        ? privacyAndSecurity
        : {
            nameAndPhoto: { public: true, students: 1, universities: 1 },
            beat: { public: true, students: 1, universities: 1 },
            transcript: { public: true, students: 1, universities: 1 },
            extracurriculars: { public: true, students: 1, universities: 1 },
            professional: { public: true, students: 1, universities: 1 },
            service: { public: true, students: 1, universities: 0 },
            recognition: { public: true, students: 1, universities: 1 },
          },
    [privacyAndSecurity],
  )

  const { values, setFieldValue, handleSubmit, isSubmitting } = useFormik({
    initialValues,
    onSubmit: (
      {
        nameAndPhoto,
        beat,
        transcript,
        extracurriculars,
        professional,
        service,
        recognition,
      },
      { setSubmitting },
    ) => {
      isPublicAllChecked
        ? dispatch(
            actions.updatePrivacyAndSecuritySettings({
              nameAndPhoto: {
                public: true,
                students: nameAndPhoto.students,
                universities: nameAndPhoto.universities,
              },
              beat: {
                public: true,
                students: beat.students,
                universities: beat.universities,
              },
              transcript: {
                public: true,
                students: transcript.students,
                universities: transcript.universities,
              },
              extracurriculars: {
                public: true,
                students: extracurriculars.students,
                universities: extracurriculars.universities,
              },
              professional: {
                public: true,
                students: professional.students,
                universities: professional.universities,
              },
              service: {
                public: true,
                students: service.students,
                universities: service.universities,
              },
              recognition: {
                public: true,
                students: recognition.students,
                universities: recognition.universities,
              },
            }),
          )
            .then(() => setSuccessModalVisible(true))
            .finally(() => setSubmitting(false))
        : dispatch(
            actions.updatePrivacyAndSecuritySettings({
              nameAndPhoto,
              beat,
              transcript,
              extracurriculars,
              professional,
              service,
              recognition,
            }),
          )
            .then(() => setSuccessModalVisible(true))
            .finally(() => setSubmitting(false))
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    if (
      values &&
      values.nameAndPhoto.public &&
      values.beat.public &&
      values.transcript.public &&
      values.extracurriculars.public &&
      values.professional.public &&
      values.service.public &&
      values.recognition.public
    ) {
      togglePublicAllChecked(true)
    } else {
      togglePublicAllChecked(false)
    }
  }, [values])

  const getModalPickerValue = (value: {
    universities: Visibility
    students: Visibility
    public: boolean
  }) => {
    if (value.public) {
      return `Public`
    }
    // if (value.universities === value.students) {
    //     return t('privacyAndSecurityScreen.toAll', { visibility: t(`common:visibility.${Visibility[value.universities]?.toLowerCase()}`) })
    // }
    // Post-MVP-after-student-student-connections
    return `
            ${t(
              `common:visibility.${Visibility[
                value.universities
              ]?.toLowerCase()}`,
            )}
        `
    // Post-MVP-after-student-student-connections
    // return `
    //     ${t('privacyAndSecurityScreen.universitiesVisibility', { visibility: t(`common:visibility.${Visibility[value.universities]?.toLowerCase()}`) })}
    //     ${t('privacyAndSecurityScreen.studentsVisibility', { visibility: t(`common:visibility.${Visibility[value.students]?.toLowerCase()}`) })}
    // `
  }

  const PrivacySecurityModal = (
    title: string,
    isOpen: string,
    toggle: () => void,
    values: any,
    name: string,
  ) => (
    <Modal
      title={title.toUpperCase()}
      isOpen={isOpen === title}
      toggle={toggle}
      closeIcon={true}
      body={
        <div className="privacy-security-modal">
          <div className="privacy-security-modal-item-container">
            <div className="privacy-security-modal-item">
              <div className="privacy-security-modal-item-title">
                {t(`common:universities`).toLocaleUpperCase()}
              </div>
              <div className="privacy-security-modal-item-checkbox">
                <Checkbox
                  id={`${name}.universities.${Visibility.Visible}`}
                  disabled={values.public}
                  checked={values.universities === Visibility.Visible}
                  rounded
                  toggle={async () =>
                    setFieldValue(`${name}.universities`, Visibility.Visible)
                  }
                />
                <div className="privacy-security-modal-item-checkbox-text">
                  {t(`common:visibility.visible`)}
                </div>
              </div>
              <div className="privacy-security-modal-item-checkbox">
                <Checkbox
                  id={`${name}.universities.${Visibility.Private}`}
                  disabled={values.public}
                  checked={values.universities === Visibility.Private}
                  rounded
                  toggle={async () =>
                    setFieldValue(`${name}.universities`, Visibility.Private)
                  }
                />
                <div className="privacy-security-modal-item-checkbox-text">
                  {t(`common:visibility.private`)}
                </div>
              </div>
              <div className="privacy-security-modal-item-checkbox">
                <Checkbox
                  id={`${name}.universities.${Visibility.Hidden}`}
                  disabled={values.public}
                  checked={values.universities === Visibility.Hidden}
                  rounded
                  toggle={async () =>
                    setFieldValue(`${name}.universities`, Visibility.Hidden)
                  }
                />
                <div className="privacy-security-modal-item-checkbox-text">
                  {t(`common:visibility.hidden`)}
                </div>
              </div>
            </div>
            {/* POST-PILOT when student-student connections added
                       <div className="privacy-security-modal-item">
                           <div className="privacy-security-modal-item-title">
                               {t("common:students").toLocaleUpperCase()}
                           </div>
                           <div className="privacy-security-modal-item-checkbox">
                               <Checkbox id={`${name}.students.${Visibility.Visible}`} disabled={values.public}
                                         checked={values.students === Visibility.Visible} rounded
                                         toggle={() => setFieldValue(`${name}.students`, Visibility.Visible)}/>
                               <div className="privacy-security-modal-item-checkbox-text">{t("common:visibility.visible")}</div>
                           </div>
                           <div className="privacy-security-modal-item-checkbox">
                               <Checkbox id={`${name}.students.${Visibility.Private}`} disabled={values.public}
                                         checked={values.students === Visibility.Private} rounded
                                         toggle={() => setFieldValue(`${name}.students`, Visibility.Private)}/>
                               <div className="privacy-security-modal-item-checkbox-text">{t("common:visibility.private")}</div>
                           </div>
                           <div className="privacy-security-modal-item-checkbox">
                               <Checkbox id={`${name}.students.${Visibility.Hidden}`} disabled={values.public}
                                         checked={values.students === Visibility.Hidden} rounded
                                         toggle={() => setFieldValue(`${name}.students`, Visibility.Hidden)}/>
                               <div className="privacy-security-modal-item-checkbox-text">{t("common:visibility.hidden")}</div>
                           </div>
                       </div> */}
          </div>
          <div className="privacy-security-modal-public">
            <Checkbox
              id={`${name}.public.${values.public}`}
              checked={values.public}
              toggle={async () => setFieldValue(`${name}.public`, !values.public)}
            />
            <div className="privacy-security-modal-public-container">
              <div className="privacy-security-modal-public-title">
                {t(`privacyAndSecurityScreen.publicTab`)}
              </div>
              <div className="privacy-security-modal-public-subtitle">
                {t(`privacyAndSecurityScreen.publicTabDescription`)}
              </div>
            </div>
          </div>
        </div>
      }
      footer={t(`common:saveChanges`)}
      footerAction={() => {
        toggle()
      }}
    />
  )

  const renderRow = (
    title: string,
    subtitle: string,
    value: any,
    name: string,
  ) => {
    return (
      <div className="privacy-and-security-row">
        <div className="privacy-and-security-row-title-container">
          <div className="privacy-and-security-row-title">{title}</div>
          <div className="privacy-and-security-row-subtitle">{subtitle}</div>
        </div>
        <div
          className={`select-field`}
          onClick={() => toggleIsModalOpen(title)}
          onTouchStartCapture={() => toggleIsModalOpen(title)}
        >
          {<label className={`pristine`}>{title}</label>}
          <Dropdown options={[]} value={getModalPickerValue(value)} disabled />
        </div>
        {title === isModalOpen &&
          PrivacySecurityModal(
            title,
            isModalOpen,
            () => toggleIsModalOpen(``),
            value,
            name,
          )}
      </div>
    )
  }

  if (!values) {
    return null
  }

  return (
    <>
      <div className="account-settings-container">
        <div className="notifications-settings-title">
          {t(`privacyAndSecurityScreen.privacyAndSecurity`)}
        </div>
        <div className="privacy-and-security-subtitle">
          {t(`privacyAndSecurityScreen.privacyAndSecuritySubtitle`)}
        </div>
        {renderRow(
          t(`privacyAndSecurityScreen.nameAndPhoto`),
          t(`privacyAndSecurityScreen.whoCanViewYourFullName`),
          values.nameAndPhoto,
          `nameAndPhoto`,
        )}
        {renderRow(
          t(`privacyAndSecurityScreen.yourBeat`),
          t(`privacyAndSecurityScreen.whoCanViewYourBeatPage`),
          values.beat,
          `beat`,
        )}
        {renderRow(
          t(`privacyAndSecurityScreen.transcript`),
          t(`privacyAndSecurityScreen.whoCanViewYourTranscriptTab`),
          values.transcript,
          `transcript`,
        )}
        {renderRow(
          t(`privacyAndSecurityScreen.extracurriculars`),
          t(`privacyAndSecurityScreen.whoCanViewYourExtracurricularsTab`),
          values.extracurriculars,
          `extracurriculars`,
        )}
        {renderRow(
          t(`privacyAndSecurityScreen.professional`),
          t(`privacyAndSecurityScreen.whoCanViewYourProfessionalTab`),
          values.professional,
          `professional`,
        )}
        {renderRow(
          t(`privacyAndSecurityScreen.service`),
          t(`privacyAndSecurityScreen.whoCanViewYourServiceTab`),
          values.service,
          `service`,
        )}
        {renderRow(
          t(`privacyAndSecurityScreen.recognition`),
          t(`privacyAndSecurityScreen.whoCanViewYourRecognitionTab`),
          values.recognition,
          `recognition`,
        )}
        <div className="privacy-and-security-title">
          {t(`studentOverview.publicAccountAuthorization`)}
          <div className="privacy-and-security-public">
            <Checkbox
              id="public-checkbox-all"
              checked={isPublicAllChecked}
              toggle={() => {
                togglePublicAllChecked(!isPublicAllChecked)
                if (!isPublicAllChecked) {
                  setFieldValue(`nameAndPhoto.public`, true)
                  setFieldValue(`beat.public`, true)
                  setFieldValue(`transcript.public`, true)
                  setFieldValue(`extracurriculars.public`, true)
                  setFieldValue(`professional.public`, true)
                  setFieldValue(`service.public`, true)
                  setFieldValue(`recognition.public`, true)
                } else {
                  setFieldValue(`nameAndPhoto.public`, false)
                  setFieldValue(`beat.public`, false)
                  setFieldValue(`transcript.public`, false)
                  setFieldValue(`extracurriculars.public`, false)
                  setFieldValue(`professional.public`, false)
                  setFieldValue(`service.public`, false)
                  setFieldValue(`recognition.public`, false)
                }
              }}
            />
            <div className="privacy-and-security-public-text-container">
              <div className="privacy-and-security-public-text-title">
                {t(`privacyAndSecurityScreen.makeMyAccountPublic`)}
              </div>
              <div className="privacy-and-security-public-text-subtitle">
                {t(`privacyAndSecurityScreen.makeMyAccountPublicText`)}
              </div>
            </div>
          </div>
        </div>
        <div className="privacy-and-security-submit">
          <Button onClick={() => handleSubmit()} disabled={isSubmitting}>
            {t(`common:saveChanges`)}
          </Button>
        </div>
      </div>

      <MessageModal
        title={t(`common:success`)}
        message={t(`privacyAndSecurityScreen.privacyAndSecuritySettingsSaved`)}
        visible={isSuccessModalVisible}
        onClose={() => setSuccessModalVisible(false)}
      />
    </>
  )
}
