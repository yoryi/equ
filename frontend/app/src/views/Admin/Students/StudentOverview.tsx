import classNames from "classnames"
import { FormikValues, useFormik } from "formik"
import _ from "lodash"
//Components
import { MDBContainer } from "mdbreact"
import moment from "moment"
import * as React from "react"
import { useEffect, useMemo, useState } from "react"
//Services
import toast from "react-hot-toast"
//Hooks
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import * as yup from "yup"

import AutosuggestField from "../../../components/Autosuggest/Autosuggest"
import BackButton from "../../../components/Button/BackButton"
import Button from "../../../components/Button/Button"
import Checkbox from "../../../components/Checkbox/Checkbox"
import DatepickerWithDay from "../../../components/DatePicker/DatepickerWithDay"
import MessageModal from "../../../components/MessageModal"
import Modal from "../../../components/Modal/Modal"
import Multiselect from "../../../components/SelectField/MultiSelectField"
import SelectField, {
  Option,
} from "../../../components/SelectField/SelectField"
import TextField from "../../../components/TextField/TextField"
import history from "../../../history"
import useLoader from "../../../hooks/useLoader"
import i18n from "../../../services/i18n"
import { actions } from "../../../store"
import {
  Ethnicity,
  Gender,
  Hardship,
  HighSchool,
  Race,
  ReduxState,
  Role,
  Visibility,
} from "../../../store/types"
import { DeleteStudentAccountModal } from "./DeleteStudentAccountModal"
//Styles
import Styles from "./index.module.scss"

const NUMBER_TAKE_HIGHSCHOOLS = 20

const StudentOverview: React.FC = () => {
  const params = useParams<{ id?: string }>()
  const id = params.id ? parseInt(params.id) : null

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [highSchools, setHighSchools] = useState<HighSchool[]>([])
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)
  const [
    isSaveChangesSuccessModalVisible,
    setSetChangesSuccessModalVisible,
  ] = useState(false)
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
  const [
    isPrivacySecurityModalOpen,
    toggleIsPrivacySecurityModalOpen,
  ] = useState(``)
  const [formErrors, setFormErrors] = useState(``)
  const [isCopyMessageVisible, setCopyMessageVisible] = useState(false)

  const role = useSelector<ReduxState, Role | null>(
    (state) => state.auth.user?.role ?? null,
  )
  const { student, deletedAccount } = useSelector(
    (state: ReduxState) => state.admin,
  )
  const { searchedHighSchools } = useSelector((state: any) => state.profile)
  const genders = useSelector((state: ReduxState) => state.shared.genders)
  const races = useSelector((state: ReduxState) => state.shared.races)
  const ethnicities = useSelector(
    (state: ReduxState) => state.shared.ethnicities,
  )
  const hardships = useSelector((state: ReduxState) => state.shared.hardships)

  const { onLoadComplete } = useLoader()

  useEffect(() => {
    if (!id) {
      return
    }

    if (student?.id === id) {
      onLoadComplete()
      return
    }

    dispatch(actions.getStudentByIdAdmin(id))
  }, [id, student])

  const searchHighSchool = (name: string) => {
    if (name.length >= 3) {
      dispatch(
        actions.getHighSchools({
          name,
          skip: 0,
          take: NUMBER_TAKE_HIGHSCHOOLS,
        }),
      )
    }
  }

  useEffect(() => {
    setHighSchools(searchedHighSchools)
  }, [searchedHighSchools])

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required(
        i18n.t(`errors:cannotBeEmpty`, { name: i18n.t(`common:firstName`) }),
      ),
    lastName: yup
      .string()
      .required(
        i18n.t(`errors:cannotBeEmpty`, { name: i18n.t(`common:lastName`) }),
      ),
    school: yup
      .object({
        name: yup.string().nullable().required(),
        id: yup
          .number()
          .nullable()
          .required(`Please provide at least 3 characters and pick school`),
      })
      .nullable()
      .required(t(`errors:thisFieldIsRequired`)),
    graduation: yup.number().required(
      i18n.t(`errors:pleasePick`, {
        name: i18n.t(`common:grade`).toLowerCase(),
      }),
    ),
    day: yup
      .number()
      .min(1, t(`errors:thisFieldIsRequired`))
      .nullable()
      .required(t(`errors:thisFieldIsRequired`)),
    month: yup
      .number()
      .min(1, t(`errors:thisFieldIsRequired`))
      .nullable()
      .required(t(`errors:thisFieldIsRequired`)),
    year: yup
      .number()
      .min(1, t(`errors:thisFieldIsRequired`))
      .nullable()
      .required(t(`errors:thisFieldIsRequired`)),
  })

  const initialValues: FormikValues = useMemo(
    () => ({
      firstName: student?.firstName ?? ``,
      lastName: student?.lastName ?? ``,
      email: student?.user.email ?? ``,
      day: student?.birthday
        ? Number(moment(student?.birthday).format(`D`))
        : 0,
      month: student?.birthday
        ? Number(moment(student?.birthday).format(`M`))
        : 0,
      year: student?.birthday
        ? Number(moment(student?.birthday).format(`YYYY`))
        : 0,

      school: student && student.school ? student.school : ``,
      graduation: student?.graduation ?? moment().year(),

      gender: student?.gender,
      race: student?.race,
      ethnicity: student?.ethnicity,
      hardship: student && student.hardship ? student.hardship : [],

      emailFollowActivity:
        student?.studentNotificationSettings?.emailFollowActivity ?? false,
      emailFollowerDigest:
        student?.studentNotificationSettings?.emailNewsForYou ?? false,

      nameAndPhoto: {
        public: !!student?.privacySettings.nameAndPhoto.public,
        students: student?.privacySettings.nameAndPhoto.students ?? 1,
        universities: student?.privacySettings.nameAndPhoto.universities ?? 1,
      },
      beat: {
        public: !!student?.privacySettings.beat.public,
        students: student?.privacySettings.beat.students ?? 1,
        universities: student?.privacySettings.beat.universities ?? 1,
      },
      transcript: {
        public: !!student?.privacySettings.transcript.public,
        students: student?.privacySettings.transcript.students ?? 1,
        universities: student?.privacySettings.transcript.universities ?? 1,
      },
      extracurriculars: {
        public: !!student?.privacySettings.extracurriculars.public,
        students: student?.privacySettings.extracurriculars.students ?? 1,
        universities:
          student?.privacySettings.extracurriculars.universities ?? 1,
      },
      professional: {
        public: !!student?.privacySettings.professional.public,
        students: student?.privacySettings.professional.students ?? 1,
        universities: student?.privacySettings.professional.universities ?? 1,
      },
      service: {
        public: !!student?.privacySettings.service.public,
        students: student?.privacySettings.service.students ?? 1,
        universities: student?.privacySettings.service.universities ?? 1,
      },
      recognition: {
        public: !!student?.privacySettings.recognition.public,
        students: student?.privacySettings.recognition.students ?? 1,
        universities: student?.privacySettings.recognition.universities ?? 1,
      },
      publicAccount: student?.privacySettings.publicAccount,
    }),
    [student],
  )

  const {
    values,
    handleChange,
    setFieldValue,
    touched,
    errors,
    handleSubmit,
  } = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (
      {
        firstName,
        lastName,
        email,
        school,
        graduation,
        hardship,
        day,
        year,
        month,
        emailFollowerDigest,
        emailFollowActivity,
        nameAndPhoto,
        beat,
        transcript,
        extracurriculars,
        professional,
        service,
        recognition,
        publicAccount,
      },
      { setSubmitting },
    ) => {
      const birthday = new Date(year, month - 1, day)

      dispatch(
        actions.updateBaseStudentDataByAdmin({
          firstName,
          lastName,
          email,
          birthday,
          school,
          graduation,
          hardship,
          id: student.id,
        }),
      )
        .then(() => setSetChangesSuccessModalVisible(true))
        .catch((err: any) => {
          setFormErrors(err.message)
        })
        .finally(() => setSubmitting(false))

      dispatch(
        actions.updateStudentNotificationSettingsByAdmin({
          emailFollowActivity,
          emailNewsForYou: emailFollowerDigest,
          id: student.id,
        }),
      )

      publicAccount
        ? dispatch(
            actions.updateStudentPrivacySettingsByAdmin({
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
              id: student.id,
            }),
          )
        : dispatch(
            actions.updateStudentPrivacySettingsByAdmin({
              nameAndPhoto,
              beat,
              transcript,
              extracurriculars,
              professional,
              service,
              recognition,
              id: student.id,
            }),
          )
    },
    enableReinitialize: true,
  })

  const graduationOptions: Option[] = _.times(
    5,
    (i): Option => ({
      id: moment().add(i, `year`).year(),
      name: t(`common:classOf`, { year: moment().add(i, `year`).year() }),
    }),
  )

  const autoSuggestionStyles = {
    input:
      touched && errors && touched.school && errors.school
        ? {
            borderRadius: `6px`,
            outline: `none`,
            width: `100%`,
            border: `1px solid #c91c0d`,
            fontFamily: `Ilisarniq, sans-serif`,
            padding: `8px 16px`,
            color: `#c91c0d`,
            background: `#fae8e7`,
          }
        : {
            borderRadius: `6px`,
            outline: `none`,
            width: `100%`,
            border: `1px solid #eaebeb`,
            fontFamily: `Ilisarniq, sans-serif`,
            padding: `8px 16px`,
          },
    suggestionsContainer: {
      width: `100%`,
      marginTop: `0px`,
      maxHeight: `300px`,
    },
    suggestion: {
      listStyleType: `none`,
      textAlign: `left`,
      borderBottom: `1px solid #eaebeb`,
      padding: `8px 8px`,
      fontFamily: `Ilisarniq, sans-serif`,
      color: `#1f242b`,
      width: highSchools && highSchools.length >= 6 ? `264px` : `280px`,
    },
    suggestionHighlighted: {
      background: `#eee`,
      cursor: `pointer`,
    },
    container: {
      position: `relative`,
      zIndex: 2,
      background: `#fff`,
    },
    suggestionsList: {
      margin: `0px`,
      maxHeight: `300px`,
      overflowY: `auto`,
      boxSizing: `border-box`,
      padding: `0px 16px`,
      position: `absolute`,
      background: `#fff`,
      borderRadius: `4px`,
      boxShadow: `0px 0px 24px rgba(31, 36, 43, 0.06), 0px 4px 8px rgba(31, 36, 43, 0.08)`,
    },
  }

  const hardshipValues =
    values.hardship && values.hardship.length > 0 && hardships
      ? values.hardship.map((item: any) =>
          item && _.isObject(item) ? item : hardships[item - 1],
        )
      : []

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
      closeIcon={false}
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
          </div>
          <div className="privacy-security-modal-public">
            <Checkbox
              id={`${name}.public.${values.public}`}
              checked={values.public}
              toggle={async () =>
                setFieldValue(`${name}.public`, !values.public)
              }
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

  const getModalPickerValue = (value: {
    universities: Visibility
    students: Visibility
    public: boolean
  }) => {
    if (values.publicAccount || value.public) {
      return `Public`
    }

    return `${t(
      `common:visibility.${Visibility[value.universities]?.toLowerCase()}`,
    )}`
  }
  const renderPrivacySecurityRow = (
    title: string,
    subtitle: string,
    value: any,
    name: string,
  ) => {
    return (
      <div className="privacy-and-security-row" style={{ width: 640 }}>
        <div className="privacy-and-security-row-title-container">
          <div className="privacy-and-security-row-title">{title}</div>
          <div className="privacy-and-security-row-subtitle">{subtitle}</div>
        </div>
        <SelectField
          onClick={() => {
            toggleIsPrivacySecurityModalOpen(title)
          }}
          items={[{ id: value, name: getModalPickerValue(value) }]}
          value={getModalPickerValue(value)}
          disabled
        />
        {title === isPrivacySecurityModalOpen &&
          PrivacySecurityModal(
            title,
            isPrivacySecurityModalOpen,
            () => toggleIsPrivacySecurityModalOpen(``),
            value,
            name,
          )}
      </div>
    )
  }

  useEffect(() => {
    if (formErrors) {
      setFormErrors(``)
    }
  }, [values])

  if (!student) {
    return null
  }

  const handleEmailCopy = async () => {
    await navigator.clipboard.writeText(student?.user?.email ?? ``)
    setCopyMessageVisible(false)
    setTimeout(() => setCopyMessageVisible(true), 0)
  }

  const studentCompletionData = student
    ? Object.entries(student.completion ?? {})
        .filter(([_]) => _ !== `id`)
        .map(([step, status]) => {
          return { step, status }
        })
    : []

  const isCompletionVisible =
    studentCompletionData.length > 0
      ? studentCompletionData.filter((item) => item.status === 2).length !==
          0 && student.completion
      : true

  return (
    <div className={`${Styles.container} account-settings-container`}>
      {student ? (
        <MDBContainer fluid>
          <BackButton />
          <h1>
            {student && student.firstName && student.lastName
              ? `${student.firstName} ${student.lastName}`
              : `No Name`}
          </h1>
          <div className={Styles.studentOverviewButtonsContainer}>
            {isCompletionVisible && student.completion ? (
              <Button
                onClick={() => history.push(`/admin/completion/${params.id}`)}
              >
                {t(`studentOverview.viewCompletion`)}
              </Button>
            ) : null}
            <Button
              onClick={() => window.open(`/student/${params.id}`, `_blank`)}
            >
              {t(`studentOverview.viewProfile`)}
            </Button>
            <div style={{ position: `relative` }}>
              <Button onClick={handleEmailCopy}>
                {t(`studentOverview.emailStudent`)}
              </Button>
              {isCopyMessageVisible && (
                <span className={classNames(Styles.copyMessage)}>
                  {t(`common:emailCopied`)}
                </span>
              )}
            </div>
            {role === Role.Admin && (
              <>
                <Button
                  onClick={async () => {
                    try {
                      await dispatch(actions.resetStudentPassword(student.id))
                      setSuccessModalVisible(true)
                    } catch (err) {
                      if (err.message) {
                        toast.error(err.message)
                      }
                    }
                  }}
                >
                  {t(`studentOverview.resetPassword`)}
                </Button>
                <Button
                  onClick={() =>
                    dispatch(actions.toggleLockStudentAccount(student.id))
                  }
                >
                  {student.user.blockedAt
                    ? t(`studentOverview.unlockProfile`)
                    : t(`studentOverview.lockProfile`)}
                </Button>
                <Button
                  onClick={() => setDeleteModalVisible(true)}
                  disabled={deletedAccount}
                >
                  {t(`studentOverview.deleteAccount`)}
                </Button>
              </>
            )}
          </div>
          <div className={Styles.studentOverviewSectionTitle}>
            {t(`studentOverview.personalInformation`)}
          </div>
          <div className="account-settings-row mx-n2">
            <TextField
              className={`mx-2`}
              onChange={handleChange(`firstName`)}
              value={values.firstName}
              placeholder={t(`common:firstName`)}
              title={t(`common:firstName`)}
              error={touched.firstName && (errors.firstName as string)}
            />
            <TextField
              className={`mx-2`}
              onChange={handleChange(`lastName`)}
              value={values.lastName}
              placeholder={t(`common:lastName`)}
              title={t(`common:lastName`)}
              error={touched.lastName && (errors.lastName as string)}
            />
          </div>
          <div className="account-settings-row account-settings-row-single-row w-50 mb-4 pr-2">
            <TextField
              onChange={handleChange(`email`)}
              value={values.email}
              placeholder={t(`common:email`)}
              title={t(`common:email`)}
              error={formErrors === `Email exist in db!` ? formErrors : ``}
            />
          </div>
          <div className={`w-50 mb-4 pr-2`}>
            <DatepickerWithDay
              day={values.day}
              month={values.month}
              year={values.year}
              setFieldValue={setFieldValue}
              dayError={touched.day && errors.day}
              monthError={touched.month && errors.month}
              yearError={touched.year && errors.year}
            />
          </div>

          <div className={Styles.studentOverviewSectionTitle}>
            {t(`studentOverview.highSchool`)}
          </div>
          <div
            className="account-settings-row mx-n2"
            style={{ marginBottom: 50 }}
          >
            <div className={`mx-2`}>
              <div
                className={`register-title-first-step-row-highschool ${
                  touched && touched.school && errors && errors.school
                    ? `highschool-error`
                    : ``
                }`}
              >
                <div
                  className={`highschool-label ${
                    values.school ? `` : `pristine`
                  }`}
                >
                  {t(`common:highSchool`)}
                </div>
                <>
                  <AutosuggestField
                    values={highSchools}
                    value={values.school?.name ?? ``}
                    setValue={async (school: HighSchool) => {
                      searchHighSchool(school.name)
                      await setFieldValue(`school`, school)
                    }}
                    placeholder={t(`common:searchHighSchools`)}
                    styles={autoSuggestionStyles}
                  />
                  {touched.school && !!errors.school && (
                    <span className={`autosuggest-error`}>
                      {((errors.school as { id: string } | null)
                        ?.id as string) ?? errors.school}
                    </span>
                  )}
                </>
              </div>
            </div>
            <SelectField
              className={`mx-2`}
              onChange={(option: Option) => {
                setFieldValue(
                  `graduation`,
                  graduationOptions.find((grade) => grade.name === option.value)
                    ?.id,
                )
              }}
              value={values.graduation ? `Class of ${values.graduation}` : ``}
              items={graduationOptions}
              title={t(`common:grade`)}
              placeholder={t(`common:selectGrade`)}
              error={touched.graduation && (errors.graduation as string)}
            />
          </div>

          <div className={Styles.studentOverviewSectionTitle}>
            {t(`settings.studentProfileSettingsScreen.diversity`)}
          </div>
          <div className="account-settings-row mx-n2">
            <SelectField
              className={`mx-2`}
              onChange={async (option: Option) =>
                setFieldValue(
                  `gender`,
                  genders?.find((gender) => gender.name === option.value)?.id,
                )
              }
              value={
                values.gender && genders ? genders[values.gender - 1].name : ``
              }
              items={genders as Gender[]}
              placeholder="N/A"
              title={t(`common:gender`)}
              error={touched.gender && (errors.gender as string)}
              disabled
            />
            <SelectField
              className={`mx-2`}
              onChange={async (option: Option) =>
                setFieldValue(
                  `race`,
                  races?.find((race) => race.name === option.value)?.id,
                )
              }
              value={values.race && races ? races[values.race - 1].name : ``}
              items={races as Race[]}
              placeholder="N/A"
              title={t(`common:race`)}
              error={touched.race && (errors.race as string)}
              disabled
            />
          </div>
          <div
            className="account-settings-row mx-n2"
            style={{ marginBottom: 50 }}
          >
            <SelectField
              className={`mx-2`}
              onChange={async (option: Option) =>
                setFieldValue(
                  `ethnicity`,
                  ethnicities?.find(
                    (ethnicity) => ethnicity.name === option.value,
                  )?.id,
                )
              }
              value={
                (values.ethnicity &&
                  ethnicities?.[values.ethnicity - 1]?.name) ??
                ``
              }
              items={ethnicities as Ethnicity[]}
              placeholder="N/A"
              title={t(`common:ethnicity`)}
              error={touched.ethnicity && (errors.ethnicity as string)}
              disabled
            />
            <Multiselect
              className={`mx-2`}
              onSelect={async (selected: any) =>
                setFieldValue(`hardship`, selected)
              }
              onRemove={async (selected: any) =>
                setFieldValue(`hardship`, selected)
              }
              selectedValues={hardshipValues}
              items={hardships as Hardship[]}
              placeholder={t(`common:selectHardship`)}
              title={t(`common:hardships`)}
              displayValue="name"
              error={touched.hardship && (errors.hardship as string)}
              size={`auto`}
            />
          </div>
          <div className={Styles.studentOverviewSectionTitle}>
            {t(`studentOverview.emailNotifications`)}
          </div>
          <div style={{ marginBottom: 50, marginTop: 30 }}>
            <div className="notifications-settings-item">
              <Checkbox
                name={`emailFollowerDigest`}
                checked={values.emailFollowerDigest}
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
          <div className={Styles.studentOverviewSectionTitle}>
            {t(`studentOverview.privacyAndSecurity`)}
          </div>
          {renderPrivacySecurityRow(
            t(`privacyAndSecurityScreen.nameAndPhoto`),
            `Who can view your full name, profile photo, and banner photo?`,
            values.nameAndPhoto,
            `nameAndPhoto`,
          )}
          {renderPrivacySecurityRow(
            t(`privacyAndSecurityScreen.yourBeat`),
            `Who can view your Beat page?`,
            values.beat,
            `beat`,
          )}
          {renderPrivacySecurityRow(
            t(`privacyAndSecurityScreen.transcript`),
            `Who can view your Transcript tab?`,
            values.transcript,
            `transcript`,
          )}
          {renderPrivacySecurityRow(
            t(`privacyAndSecurityScreen.extracurriculars`),
            `Who can view your Extracurriculars tab?`,
            values.extracurriculars,
            `extracurriculars`,
          )}
          {renderPrivacySecurityRow(
            t(`privacyAndSecurityScreen.professional`),
            `Who can view your Professional tab?`,
            values.professional,
            `professional`,
          )}
          {renderPrivacySecurityRow(
            t(`privacyAndSecurityScreen.service`),
            `Who can view your Service tab?`,
            values.service,
            `service`,
          )}
          {renderPrivacySecurityRow(
            t(`privacyAndSecurityScreen.recognition`),
            `Who can view your Recognition tab?`,
            values.recognition,
            `recognition`,
          )}

          <div
            className={Styles.studentOverviewSectionTitle}
            style={{ marginTop: 50 }}
          >
            {t(`studentOverview.publicAccountAuthorization`)}
          </div>
          <div
            className="privacy-and-security-public"
            style={{ marginBottom: 50, marginLeft: 14 }}
          >
            <Checkbox
              id="public-checkbox-all"
              checked={values.publicAccount}
              toggle={() => {
                if (values.publicAccount) {
                  setFieldValue(`transcript.public`, false)
                  setFieldValue(`extracurriculars.public`, false)
                  setFieldValue(`professional.public`, false)
                  setFieldValue(`service.public`, false)
                  setFieldValue(`recognition.public`, false)
                }

                setFieldValue(`publicAccount`, !values.publicAccount)
              }}
            />
            <div className="privacy-and-security-public-text-container">
              <div className="privacy-and-security-public-text-title">
                Public Account
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 100 }}>
            <Button onClick={() => handleSubmit()}>
              {t(`common:saveChanges`)}
            </Button>
          </div>
          <DeleteStudentAccountModal
            isOpen={isDeleteModalVisible}
            toggle={() => setDeleteModalVisible(false)}
            id={student.id}
          />
          <MessageModal
            title={t(`common:success`)}
            message={t(`studentOverview.requestToChangePasswordSent`)}
            visible={isSuccessModalVisible}
            onClose={() => setSuccessModalVisible(false)}
          />
          <MessageModal
            title={t(`common:success`)}
            message={t(`studentOverview.changesHasBeenSaved`)}
            visible={isSaveChangesSuccessModalVisible}
            onClose={() => setSetChangesSuccessModalVisible(false)}
          />
        </MDBContainer>
      ) : null}
    </div>
  )
}

export default StudentOverview
