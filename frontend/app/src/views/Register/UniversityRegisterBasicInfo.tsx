import { useFormik } from "formik"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

import AutosuggestField from "../../components/Autosuggest/Autosuggest"
import Button from "../../components/Button/Button"
import TextField from "../../components/TextField/TextField"
import history from "../../history"
import * as actions from "../../store/actions"
import { HighSchool } from "../../store/types"

const UniversityRegisterBasicInfo = () => {
  const dispatch = useDispatch()

  const [highSchools] = useState<HighSchool[]>([])

  const {
    values,
    handleChange,
    setFieldValue,
    touched,
    errors,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      logo: null,
      name: ``,
      location: null,
    },
    onSubmit: ({ name, location }, { setSubmitting }) => {
      dispatch(
        actions.universitySignUp({
          logo: null as any,
          name,
          location: location as any,
        }),
      )
        .then(() => history.push(`/`))
        .finally(() => setSubmitting(false))
    },
  })

  const autoSuggestionStyles = {
    input:
      touched.location && errors.location
        ? {
            borderRadius: `6px`,
            outline: `none`,
            width: `310px`,
            border: `1px solid #c91c0d`,
            fontFamily: `Ilisarniq, sans-serif`,
            padding: `8px 16px`,
            color: `#c91c0d`,
            background: `#fae8e7`,
          }
        : {
            borderRadius: `6px`,
            outline: `none`,
            width: `310px`,
            border: `1px solid #eaebeb`,
            fontFamily: `Ilisarniq, sans-serif`,
            padding: `8px 16px`,
          },
    suggestionsContainer: {
      width: `310px`,
      marginTop: `0px`,
    },
    suggestion: {
      listStyleType: `none`,
      textAlign: `left`,
      borderBottom: `1px solid #eaebeb`,
      padding: `8px 8px`,
      fontFamily: `Ilisarniq, sans-serif`,
      color: `#1f242b`,
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
      boxSizing: `border-box`,
      padding: `0px 16px`,
      position: `absolute`,
      background: `#fff`,
      borderRadius: `4px`,
      boxShadow:
        `0px 0px 24px rgba(31, 36, 43, 0.06), 0px 4px 8px rgba(31, 36, 43, 0.08)`,
    },
  }

  const { t } = useTranslation()

  return (
    <div className="register">
      <div className="register-title">
        {t(`signUp.university.basicInfoScreen.basicInformation`)}
      </div>
      <>
        {/* <LogoUploader value={values.logo} onChange={(logo: string) => setFieldValue("logo", logo)} /> */}
        {touched.logo && (errors.logo as string) && (
          <div className="error">{errors.logo}</div>
        )}
      </>
      <TextField
        onChange={handleChange(`name`)}
        value={values.name}
        placeholder={t(`common:officialName`)}
        title={t(`common:officialName`)}
        error={touched.name && (errors.name as string)}
      />
      <div style={{ marginBottom: 18 }}>
        <div>
          <div
            className={`university-basic-info-location ${
              values.location ? `` : `pristine`
            }`}
          >
            {t(`common:location`)}
          </div>
          <>
            <AutosuggestField
              values={highSchools}
              value={``}
              setValue={async (location: string) =>
                setFieldValue(`location`, location)
              }
              placeholder={t(`common:searchLocation`)}
              styles={autoSuggestionStyles}
            />
            {touched.location && (errors.location as string) && (
              <div className="error">{errors.location}</div>
            )}
          </>
        </div>
      </div>
      <div className="register-submit" style={{ marginTop: `40px` }}>
        <Button onClick={() => handleSubmit()} disabled={isSubmitting}>
          {t(`common:letsGetStarted`)}
        </Button>
      </div>
    </div>
  )
}

export default UniversityRegisterBasicInfo
