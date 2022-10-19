//Utils
import classNames from "classnames"
import { useFormik } from "formik"
//Components
import { MDBCol,MDBRow } from "mdbreact"
import * as React from "react"
//Hooks
import { useMemo } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"

//Actions
import * as actions from "../../store/actions"
//Types
import {
  ReduxState,
  UniversityAdminData,
  UniversityContact,
} from "../../store/types"
import Button from "../Button/Button"
import SelectField from "../SelectField/SelectField"
import TextField from "../TextField/TextField"
//Styles
import Styles from "./index.module.scss"

interface UniversityContactFormProps {
  onSubmit: () => void
}

const UniversityContactForm: React.VFC<UniversityContactFormProps> = ({
  onSubmit,
}) => {
  const university = useSelector<ReduxState, UniversityAdminData | null>(
    (state) => state.admin.university,
  )
  const dispatch = useDispatch()

  const [t] = useTranslation()

  const initialValues = useMemo<UniversityContact>(
    () => ({
      email: university?.email ?? ``,
      contacted: university?.universityStats?.contacted ?? false,
    }),
    [university],
  )

  const {
    values,
    handleChange,
    setFieldValue,
    handleSubmit,
    isSubmitting,
  } = useFormik<UniversityContact>({
    initialValues,
    onSubmit: async (values) => {
      try {
        await dispatch(actions.updateUniversityEmail(values))
        onSubmit()
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }
      }
    },
    enableReinitialize: true,
  })

  return (
    <form className={`d-flex flex-column mt-4`} onSubmit={handleSubmit}>
      <MDBRow>
        <MDBCol className={`my-2`} size={`4`}>
          <TextField
            className={`m-0 w-auto`}
            name={`email`}
            value={values.email}
            onChange={handleChange}
            title={t(`common:email`)}
            placeholder={t(`common:email`)}
          />
        </MDBCol>

        <MDBCol className={`my-2`} size={`4`}>
          <SelectField
            className={`m-0`}
            items={[
              { id: true, name: t(`common:yes`) },
              { id: false, name: t(`common:no`) },
            ]}
            value={t(`common:${values.contacted ? `yes` : `no`}`)}
            onChange={async (e: any) =>
              setFieldValue(`contacted`, e.value === t(`common:yes`))
            }
            title={t(`common:isContacted`)}
            placeholder={t(`common:isContacted`)}
            size={`auto`}
          />
        </MDBCol>
      </MDBRow>

      <Button
        className={classNames(Styles.submitButton, `mt-4 align-self-center`)}
        size={`auto`}
        type={`submit`}
        disabled={isSubmitting}
      >
        {t(`common:saveChanges`)}
      </Button>
    </form>
  )
}

export default UniversityContactForm
