import React from "react"

import getSize from "../../utils/getSize"

interface TextAreaProps {
  id?: string
  name?: string
  value: string | number
  onChange: any
  title?: string
  size?: "sm" | "md" | "lg"
  placeholder?: string
  error?: string | boolean
  icon?: string
  className?: string
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  title,
  size,
  error,
  className,
}) => (
  <div
    className={`${className ? className : ``} text-field`}
    style={{ width: getSize(size) }}
  >
    {title && (
      <label htmlFor={id} className={value ? `` : `pristine`}>
        {title}
      </label>
    )}
    <textarea
      id={id}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={`${error ? `text-field-error` : ``}`}
    />
    {error && <div className="error">{error}</div>}
  </div>
)

export default TextArea
