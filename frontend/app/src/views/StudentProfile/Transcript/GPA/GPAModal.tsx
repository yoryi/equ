import { useFormik } from "formik"
//Utils
import _ from "lodash"
import moment from "moment"
import React from "react"
//Hooks
import { useMemo,useState } from "react"
//Services
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"
import * as yup from "yup"

import MessageModal from "../../../../components/MessageModal"
//Components
import Modal from "../../../../components/Modal/Modal"
import TextField from "../../../../components/TextField/TextField"
import UnsavedChangesModal from "../../../../components/UnsavedChangesModal/UnsavedChangesModal"
import i18n from "../../../../services/i18n"
//Actions
import * as actions from "../../../../store/actions"
//Types
import { GPA, ReduxState } from "../../../../store/types"
//Styles
import Styles from "./GPAModal.module.scss"

interface GPAModalProps {
  isOpen: boolean
  toggle: () => void
}

interface GPAField {
  year: number
  gpa: string
}

interface GPAFormValues {
  gpas: GPAField[]
}

export const GPAModal: React.FC<GPAModalProps> = ({ isOpen, toggle }) => {
  const graduation = useSelector<ReduxState, number>(
    (state) => state.profile.profile?.graduation ?? moment().year(),
  )
  const gpas = useSelector<ReduxState, any | null | undefined>(
    (state) => state.profile.transcript?.gpas,
  )
  const dispatch = useDispatch()
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)
  const [isMessageModalVisible, setMessageModalVisible] = useState(false)

  const { t } = useTranslation()

  const validationSchema = yup.object({
    gpas: yup.array(
      yup.object({
        year: yup.number().required(),
        gpa: yup
          .number()
          .nullable()
          .min(
            1,
            i18n.t(`Min GPA is 1`, {
              name: i18n.t(`common:gpa`),
              min: 1,
              max: 4,
            }),
          )
          .max(
            4,
            i18n.t(`Max GPA is 4`, {
              name: i18n.t(`common:gpa`),
              min: 1,
              max: 4,
            }),
          )
          .typeError(
            i18n.t(`errors:mustBeValidNumber`, { name: i18n.t(`common:gpa`) }),
          )
          .required(
            i18n.t(`errors:cannotBeEmpty`, { name: i18n.t(`common:gpa`) }),
          ),
      }),
    ),
  })

  const initialValues = useMemo<GPAFormValues>(
    () => ({
      gpas: _.times<GPAField>(4, (i) => ({
        year: moment(graduation - 3, `YYYY`)
          .add(i, `year`)
          .year(),
        gpa:
          gpas?.find(
            ({ year }: GPA) =>
              year ===
              moment(graduation - 3, `YYYY`)
                .add(i, `year`)
                .year(),
          )?.gpa || ``,
      })),
    }),
    [graduation, gpas],
  )

  const {
    values,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    touched,
    errors,
  } = useFormik<GPAFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async ({ gpas }, { setErrors }) => {
      try {
        await dispatch(
          actions.updateGPA(
            gpas.map(({ year, gpa }) => ({
              year,
              gpa: parseFloat(gpa) ?? null,
            })),
          ),
        )

        const showSuccessModal = !_.isEqual({ gpas }, initialValues)
        setMessageModalVisible(showSuccessModal)
        if (!showSuccessModal) {
          toggle()
        }
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }

        setErrors(err.errors ?? {})
      }
    },
    enableReinitialize: true,
  })

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Modal
          title={t(`profile.student.transcriptScreen.gpaAtGlance`)}
          subtitle={t(`profile.student.transcriptScreen.enterUnweightedGpa`)}
          isOpen={isOpen && !isMessageModalVisible}
          toggle={() => {
            if (
              values &&
              values.gpas &&
              values.gpas.length > 0 &&
              (!values.gpas[0].gpa ||
                (!gpas && !values.gpas[0].gpa) ||
                (gpas && values.gpas[0].gpa === gpas[0].gpa)) &&
              (!values.gpas[1].gpa ||
                (!gpas && !values.gpas[1].gpa) ||
                (gpas && values.gpas[1].gpa === gpas[1].gpa)) &&
              (!values.gpas[2].gpa ||
                (!gpas && !values.gpas[2].gpa) ||
                (gpas && values.gpas[2].gpa === gpas[2].gpa)) &&
              (!values.gpas[3].gpa ||
                (!gpas && !values.gpas[3].gpa) ||
                (gpas && values.gpas[3].gpa === gpas[3].gpa))
            ) {
              toggle()
            } else {
              toggleUnsavedModal(true)
            }
          }}
          bodyClassName={Styles.body}
          body={
            <div
              className={Styles.inputContainer}
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `center`,
                marginTop: 40,
                marginBottom: 40,
              }}
            >
              {_.times(4, (i) => (
                <TextField
                  className={Styles.input}
                  type={`number`}
                  step={`0.01`}
                  onChange={async (e: any) =>
                    setFieldValue(
                      `gpas[${i}].gpa`,
                      e.target.value.replace(/[^0-9,.]/g, ``),
                    )
                  }
                  value={values.gpas[i].gpa ?? ``}
                  placeholder={t(`profile.student.transcriptScreen.enterGpa`)}
                  title={t(`profile.student.transcriptScreen.gpaYear`, {
                    year: moment(graduation - 3, `YYYY`)
                      .add(i, `year`)
                      .year(),
                  })}
                  error={
                    touched &&
                    errors &&
                    touched.gpas?.[i].gpa &&
                    ((errors.gpas?.[i] as { gpa: string } | null)
                      ?.gpa as string)
                  }
                  inputMode={`decimal`}
                />
              ))}
              {isUnsavedModalOpen ? (
                <UnsavedChangesModal
                  isOpen={isUnsavedModalOpen}
                  footerLeaveAction={() => {
                    toggleUnsavedModal(false)
                    toggle()
                  }}
                  footerStayAction={() => toggleUnsavedModal(false)}
                />
              ) : null}
            </div>
          }
          footer={t(`common:saveChanges`)}
          footerType={`submit`}
          disabledFooterButton={isSubmitting}
          closeIcon
        />
      </form>

      <MessageModal
        title={t(`common:success`)}
        message={t(`profile.student.transcriptScreen.gpaUpdatedSuccessfully`)}
        visible={isMessageModalVisible}
        onClose={() => {
          setMessageModalVisible(false)
          toggle()
          document.body.className = ``
        }}
      />
    </>
  )
}
