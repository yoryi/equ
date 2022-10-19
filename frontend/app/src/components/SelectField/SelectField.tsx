import "react-dropdown/style.css"

//Utils
import classNames from "classnames"
import React from "react"
//Hooks
import { useEffect, useRef, useState } from "react"
//Components
import Select from "react-select"

import useWindowDimensions from "../../hooks/UseWindowDimensions"
//Styles
import select from "../../styles/select"
import { defaultTheme, errorTheme } from "../../styles/select/theme"

export interface Option {
  id: number
  name: string
  value?: string
}

interface SelectFieldProps {
  className?: string
  items?: any[]
  value: string
  otherValue?: boolean
  otherValues?: boolean
  onChange?: any
  onClick?: () => void
  title?: string
  size?: "sm" | "md" | "lg" | "auto"
  placeholder?: string
  error?: string | boolean
  isInvalid?: boolean
  disabled?: boolean
}

const SelectField: React.FC<SelectFieldProps> = ({
  className,
  items,
  value,
  otherValues,
  otherValue,
  onChange,
  placeholder,
  title,
  error,
  isInvalid = false,
  onClick,
  disabled,
}) => {
  const [isFocused, setFocused] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const { windowWidth } = useWindowDimensions()

  useEffect(() => {
    if (!isFocused || windowWidth >= 1024) {
      return
    }

    document.body.style.overflow = `hidden`
    return () => {
      document.body.style.overflow = `auto`
    }
  }, [isFocused, windowWidth])
  console.log("items", items)

  return (
    <div
      ref={ref}
      className={classNames(
        { "select-field-remove-margin": !!error },
        className,
        `select-field`,
      )}
      onClick={onClick ? onClick : () => null}
      onTouchStartCapture={onClick ? onClick : () => null}
    >
      {title && otherValues && (
        <label className={value && otherValues && otherValue ? `` : `pristine`}>
          {title}
        </label>
      )}
      {title && !otherValues && (
        <label className={value ? `` : `pristine`}>{title}</label>
      )}
      <Select
        styles={select}
        theme={isInvalid ? errorTheme : defaultTheme}
        options={
          items?.map(({ id, name }) => ({ value: id, label: name })) ?? []
        }
        value={
          value && items?.find(({ name }) => name === value)
            ? {
                value: items?.find(({ name }) => name === value).id,
                label: value,
              }
            : null
        }
        onChange={({ value, label }: any) =>
          onChange({ id: value, value: label })
        }
        placeholder={placeholder}
        onMenuOpen={() => setFocused(true)}
        onMenuClose={() => setFocused(false)}
        isDisabled={disabled}
      />
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default SelectField
