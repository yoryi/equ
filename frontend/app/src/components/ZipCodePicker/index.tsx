//Utils
import classNames from "classnames"
import * as React from "react"
//Hooks
import { useEffect } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
//Components
import AsyncSelect from "react-select/async"

//Actions
import * as actions from "../../store/actions"
import select from "../../styles/select"
import { defaultTheme, errorTheme } from "../../styles/select/theme"
//Styles
import Styles from "./index.module.scss"

export interface Value {
  zipCode: string
  stateCode: string
  formattedAddress?: string
  lat: number
  lng: number
}

interface ZipCodePickerProps {
  value: Value | null | undefined
  onChange: (value: Value | null) => void
  label?: string
  isInvalid?: boolean
  error?: string | false | undefined
  className?: string
}

const ZipCodePicker: React.VFC<ZipCodePickerProps> = ({
  value,
  onChange,
  label,
  isInvalid = false,
  error,
  className,
}) => {
  const dispatch = useDispatch()

  const loadOptionsHandler = async (query: string) => {
    if (!query.length) {
      return []
    }

    try {
      const results: Value[] = (await dispatch(
        actions.searchZipCode(query),
      )) as any
      return results.map((result) => ({
        value: result,
        label: result.formattedAddress,
      }))
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }

      return []
    }
  }

  useEffect(() => {
    if (!value || value?.formattedAddress) {
      return
    }

    ;(async () => {
      try {
        const [result] = await loadOptionsHandler(value.zipCode)
        onChange(result.value)
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }
      }
    })()
  }, [value])

  const { t } = useTranslation(`common`)

  return (
    <div className={classNames(className, `d-flex flex-column`)}>
      {label && (
        <label
          className={classNames(Styles.label, {
            [Styles.highlighted]: !!value,
          })}
        >
          {label}
        </label>
      )}

      <AsyncSelect
        value={
          value
            ? {
                label: value.formattedAddress,
                value,
              }
            : null
        }
        onChange={(value) => {
          if (value instanceof Array) {
            onChange(value[0].value)
          } else {
            onChange((value as { value: Value } | null)?.value ?? null)
          }
        }}
        loadOptions={loadOptionsHandler}
        styles={select}
        theme={isInvalid ? errorTheme : defaultTheme}
        noOptionsMessage={({ inputValue }) =>
          t(
            inputValue?.length
              ? `noMatchingZipCodesFound`
              : `startEnteringYourZipCodeToShowPossibleOptions`,
          )
        }
        cacheOptions
        defaultOptions
      />

      {error && <span className={Styles.error}>{error}</span>}
    </div>
  )
}

export default ZipCodePicker
