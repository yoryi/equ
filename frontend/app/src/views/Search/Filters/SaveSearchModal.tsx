import { FormikErrors, useFormik } from "formik"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import * as yup from "yup"

import Modal from "../../../components/Modal/Modal"
import TextField from "../../../components/TextField/TextField"
import { actions } from "../../../store"
import { PredefinedQueryType } from "../../../store/actions/university/payloads"

interface SaveSearchModalProps {
  isOpen: boolean
  toogle: () => void
  query: any
  numberOfResults: number | null
}

interface FormValues {
  searchName: string
}

export const SaveSearchModal: React.FC<SaveSearchModalProps> = ({
  isOpen,
  toogle,
  query,
  numberOfResults,
}) => {
  const dispatch = useDispatch()

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)

  const { t } = useTranslation()

  const validationSchema = yup.object({
    searchName: yup
      .string()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:searchName`) })),
  })

  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
    touched,
    errors,
  } = useFormik<FormValues>({
    initialValues: {
      searchName: ``,
    },
    validationSchema,
    onSubmit: ({ searchName }, { setSubmitting, setErrors }) => {
      const { name, sortBy, ...searchQuery } = query
      dispatch(
        actions.saveSearch({
          name: searchName,
          query: searchQuery,
          type: PredefinedQueryType.UNIVERSITY_TO_STUDENT,
          matching: numberOfResults,
        }),
      )
        .then(() => {
          toogle()
          dispatch(actions.getSavedSearches())
          dispatch(actions.setSearchText(``))
          dispatch(actions.setAutocompleteSearchText(``))
          setSuccessModalVisible(true)
        })
        .catch(({ errors }: { errors: FormikErrors<FormValues> }) =>
          setErrors(errors ?? {}),
        )
        .finally(() => setSubmitting(false))
    },
  })

  useEffect(() => {
    resetForm()
  }, [isOpen])

  return (
    <>
      <Modal
        title={t(`common:saveSearch`)}
        isOpen={isOpen}
        toggle={toogle}
        body={
          <div>
            <TextField
              className={`m-0 w-auto`}
              inputStyle={{ margin: 0 }}
              name={`searchName`}
              value={values.searchName}
              onChange={handleChange}
              title={t(`common:searchName`)}
              placeholder={t(`common:searchName`)}
              error={touched.searchName && errors.searchName}
            />
          </div>
        }
        size="sm"
        footer={t(`common:saveSearch`)}
        footerAction={handleSubmit}
        disabledFooterButton={isSubmitting}
      />
      <Modal
        isOpen={isSuccessModalVisible}
        toggle={() => setSuccessModalVisible(!isSuccessModalVisible)}
        title={t(`common:success`)}
        size={`sm`}
        footer={t(`common:continue`)}
        footerAction={() => setSuccessModalVisible(false)}
        footerStyle={{ marginBottom: 32 }}
        closeIcon
      >
        <p className={`text-center`}>{t(`common:saveSearchSuccessfully`)}</p>
      </Modal>
    </>
  )
}
