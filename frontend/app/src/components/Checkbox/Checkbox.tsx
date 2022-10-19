//Utils
import classNames from "classnames"
import React from "react"

interface CheckboxProps {
  name?: string
  toggle?: () => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked?: boolean
  rounded?: boolean
  id?: string
  disabled?: boolean
  className?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  checked,
  toggle,
  onChange,
  rounded,
  id,
  disabled,
  className,
}) => (
  <div className={classNames({ [`rounded`]: rounded }, className, `checkbox`)}>
    <input
      name={name}
      type="checkbox"
      checked={checked}
      id={id}
      onClick={toggle}
      onChange={onChange}
      disabled={disabled}
    />
    <label htmlFor={id} />
  </div>
)

export default Checkbox
