//Utils
import classNames from "classnames"
import React from "react"
//Hooks
import { useState } from "react"

import eyeIcon from "../../assets/eye.svg"
import closedEyeIcon from "../../assets/eye-closed.svg"
import getSize from "../../utils/getSize"
//Components
import PasswordStrengthIndicator from "../PasswordStrengthIndicator"

interface PasswordFieldProps {
  name: string
  value: string
  onChange: (event: React.ChangeEvent<any>) => void
  title: string
  className?: string
  inputStyle?: React.CSSProperties
  placeholder?: string
  size?: "sm" | "md" | "lg" | "auto"
  error?: string | string[] | boolean
  strengthIndicator?: boolean
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  value,
  onChange,
  placeholder,
  title,
  size,
  error,
  className,
  inputStyle,
  strengthIndicator = false,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  return (
    <div
      className={classNames(`text-field`, className)}
      style={{ width: getSize(size) }}
    >
      {title && <label className={value ? `` : `pristine`}>{title}</label>}
      <input
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={`${error ? `text-field-error` : ``}`}
        type={isPasswordVisible ? `text` : `password`}
        style={inputStyle}
      />
      <img
        onClick={() => setPasswordVisible(!isPasswordVisible)}
        src={isPasswordVisible ? eyeIcon : closedEyeIcon}
        alt="eye-icon"
        className="text-field-eye"
      />

      {error && (
        <div className="error">
          {Array.isArray(error) ? error.join(`\n`) : error}
        </div>
      )}

      {strengthIndicator && (
        <PasswordStrengthIndicator password={value} className={`mb-3`} />
      )}
    </div>
  )
}

export default PasswordField
