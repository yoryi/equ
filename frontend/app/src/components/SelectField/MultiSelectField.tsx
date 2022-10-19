import "react-dropdown/style.css"

//Utils
import classNames from "classnames"
//@ts-ignore
import { Multiselect } from "multiselect-react-dropdown"
import React from "react"

import getSize from "../../utils/getSize"

export interface Option {
  id: number
  name: string
  value?: string
}

interface MultiselectFieldProps {
  className?: string
  items?: any[]
  selectedValues: any
  onSelect?: any
  onRemove?: any
  onClick?: () => void
  title?: string
  size?: "sm" | "md" | "lg" | "auto"
  placeholder?: string
  error?: string | boolean
  disabled?: boolean
  displayValue: string
}

const MultiselectField: React.FC<MultiselectFieldProps> = ({
  className,
  items,
  selectedValues,
  onSelect,
  placeholder,
  title,
  size,
  error,
  onClick,
  disabled,
  displayValue,
  onRemove,
}) => (
  <div
    className={classNames(
      { [`select-field-remove-margin`]: error },
      className,
      `select-field`,
    )}
    style={{ width: getSize(size) }}
    onClick={onClick ? onClick : () => null}
    onTouchStartCapture={onClick ? onClick : () => null}
  >
    {title && (
      <label className={!selectedValues?.length ? `pristine` : ``}>
        {title}
      </label>
    )}
    <Multiselect
      id={
        disabled
          ? `multiselectContainerReact-disabled`
          : `multiselectContainerReact`
      }
      options={items?.length && !disabled ? items : []}
      disabled={disabled}
      onSelect={onSelect}
      onRemove={onRemove}
      placeholder={placeholder}
      selectedValues={
        selectedValues && items?.length && !disabled ? selectedValues : []
      }
      displayValue={displayValue}
      avoidHighlightFirstOption={true}
      style={{
        chips: {
          background: `#eaebeb`,
          color: `#1f242b`,
        },
        multiselectContainer: {
          zIndex: 20,
        },
        optionContainer: {
          border: `1px solid #eaebeb`,
          fontSize: `16px`,
          fontFamily: `Ilisarniq, sans-serif`,
          color: `#1f242b`,
          paddingLeft: 16,
          paddingRight: 16,
          display: disabled ? `none` : `block`,
        },
        option: {
          fontSize: `16px`,
          fontFamily: `Ilisarniq, sans-serif`,
          color: `#1f242b`,
          borderBottom: `1px solid #eaebeb`,
          listStyleType: `none`,
        },
        searchBox: {
          border: `1px solid #eaebeb`,
          borderRadius: `6px`,
          fontSize: `16px`,
          fontFamily: `Ilisarniq, sans-serif`,
          color: `#707378`,
          minHeight: `46px`,
          marginTop: `0px`,
          paddingLeft: `16px`,
          paddingRight: 32,
        },
      }}
    />
    {error && <div className="error">{error}</div>}
  </div>
)

export default MultiselectField
