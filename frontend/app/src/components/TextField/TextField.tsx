//Utils
import cx from "classnames"
import React from "react"

interface TextFieldProps {
  id?: string
  name?: string
  value: string | number
  onChange?: any
  title?: string
  className?: string
  inputStyle?: React.CSSProperties
  size?: "sm" | "md" | "lg" | "auto"
  placeholder?: string
  error?: string | string[] | boolean
  icon?: string
  type?: "number" | "text" | "email"
  disabled?: boolean
  textArea?: boolean
  rows?: number
  pattern?: string
  step?: string
  min?: string
  max?: string
  tabindex?: number
  inputMode?: string
  required?: boolean
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  title,
  className,
  error,
  inputStyle,
  icon,
  type,
  disabled,
  textArea = false,
  rows,
  pattern,
  step,
  min,
  max,
  inputMode,
  required = false,
}) => (
  <div className={cx(className, `text-field`)}>
    {title && (
      <label className={cx({ pristine: !value, required })} htmlFor={id}>
        {title}
      </label>
    )}
    {icon && <img src={icon} alt="search-icon" className="text-field-icon" />}
    {React.createElement(textArea ? `textarea` : `input`, {
      id,
      name,
      onChange,
      value,
      placeholder,
      className: error ? `text-field-error` : undefined,
      style: icon ? { paddingLeft: 42, marginBottom: 8 } : inputStyle,
      type,
      disabled,
      rows,
      pattern,
      step,
      min,
      max,
      inputMode,
    })}
    {error && (
      <div className="error">
        {Array.isArray(error) ? error.join(`\n`) : error}
      </div>
    )}
  </div>
)

export default TextField
