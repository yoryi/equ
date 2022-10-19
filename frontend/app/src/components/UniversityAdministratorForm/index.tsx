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
import NumberFormat from "react-number-format"
import { useDispatch,useSelector } from "react-redux"

//Actions
import * as actions from "../../store/actions"
//Types
import {
  ReduxState,
  UniversityAdminData,
  UniversityAdministrator,
} from "../../store/types"
import Button from "../Button/Button"
import TextField from "../TextField/TextField"
//Styles
import Styles from "./index.module.scss"

interface UniversityAdministratorFormProps {
  onSubmit: () => void
}

const UniversityAdministratorForm: React.VFC<UniversityAdministratorFormProps> = ({
  onSubmit,
}) => {
  const university = useSelector<ReduxState, UniversityAdminData | null>(
    (state) => state.admin.university,
  )
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const initialValues = useMemo<UniversityAdministrator>(
    () => ({
      firstName: university?.universityAdministrator?.firstName ?? ``,
      lastName: university?.universityAdministrator?.lastName ?? ``,
      email: university?.universityAdministrator?.email ?? ``,
      phone: university?.universityAdministrator?.phone ?? ``,
      position: university?.universityAdministrator?.position ?? ``,
    }),
    [university],
  )

  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik<UniversityAdministrator>({
    initialValues,
    onSubmit: async (values) => {
      try {
        await dispatch(actions.updateUniversityAdministrator(values))
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
      <MDBRow className={`my-n2`}>
        <MDBCol className={`my-2`} size={`4`}>
          <TextField
            className={`m-0 w-auto`}
            name={`firstName`}
            value={values.firstName}
            onChange={handleChange}
            title={t(`common:firstName`)}
            placeholder={t(`common:firstName`)}
          />
        </MDBCol>

        <MDBCol className={`my-2`} size={`4`}>
          <TextField
            className={`m-0 w-auto`}
            name={`lastName`}
            value={values.lastName}
            onChange={handleChange}
            title={t(`common:lastName`)}
            placeholder={t(`common:lastName`)}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className={`mb-4`}>
        <MDBCol size={`8`}>
          <TextField
            className={`m-0 w-auto`}
            inputStyle={{ margin: 0 }}
            name={`email`}
            value={values.email}
            onChange={handleChange}
            title={t(`common:email`)}
            placeholder={t(`common:email`)}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className={`my-n2`}>
        <MDBCol className={`my-2`} size={`4`}>
          <div className={`text-field`}>
            <label
              htmlFor={`phone`}
              className={classNames(`label`, { pristine: !values.phone })}
            >
              {t(`common:phoneNumber`)}
            </label>

            <NumberFormat
              id={`phone`}
              name={`phone`}
              className={`input mb-2`}
              format={`###-###-####`}
              mask={`_`}
              value={values.phone}
              placeholder={t(`common:phoneNumber`)}
              onChange={handleChange}
            />
          </div>
        </MDBCol>

        <MDBCol className={`my-2`} size={`4`}>
          <TextField
            className={`m-0 w-auto`}
            inputStyle={{ margin: 0 }}
            name={`position`}
            value={values.position}
            onChange={handleChange}
            title={t(`common:position`)}
            placeholder={t(`common:position`)}
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

export default UniversityAdministratorForm
