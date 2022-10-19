//Utils
import classNames from "classnames"
import * as React from "react"

//Styles
import Styles from "./index.module.scss"

interface BadgeProps {
  variant: "green" | "yellow" | "red" | "gray"
  children: React.ReactNode
  className?: string
}

const Badge: React.FC<BadgeProps> = ({ variant, children, className }) => (
  <div className={classNames(Styles.container, Styles[variant], className)}>
    {children}
  </div>
)

export default Badge
