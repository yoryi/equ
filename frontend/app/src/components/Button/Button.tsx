import classNames from "classnames"
import React from "react"
//Components
import { Link } from "react-router-dom"

//Utils
import getSize from "../../utils/getSize"

interface ButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  to?: string
  href?: string
  size?: "xs" | "sm" | "md" | "lg" | "auto" | "fluid"
  className?: string
  secondary?: boolean
  light?: boolean
  baseRoute?: boolean
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  deleteButton?: boolean
  removeButton?: boolean
  id?: string
  hoverAnimation?: boolean
  target?: string
  variant?: "blue" | "green" | "yellow" | "clear"
  style?: any
  role?: string
  ariaLabel?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  secondary,
  light = false,
  onClick,
  to,
  href,
  size,
  className,
  baseRoute,
  disabled = false,
  type,
  deleteButton,
  removeButton,
  id,
  hoverAnimation = false,
  target,
  variant = `blue`,
  style,
  role,
  ariaLabel,
}) =>
  React.createElement(
    !!to ? Link : !!href ? `a` : `button`,
    {
      ...(!to ? { onClick, disabled, type } : {}),
      className: classNames(
        {
          [`secondary-button`]: secondary,
          [`primary-button`]: !secondary,
          [`button-base-route`]: baseRoute,
          [`delete-button`]: deleteButton,
          [`remove-button`]: removeButton,
          [`light`]: light,
          [`hover-animation`]: hoverAnimation,
        },
        className,
        `default-button`,
        `${size}-button`,
        `${variant}-button`,
      ),
      style: { ...style, minWidth: getSize(size) },
      to: to as string,
      href,
      id,
      target,
      role,
      "aria-label": ariaLabel,
    },
    children,
  )

export default Button
