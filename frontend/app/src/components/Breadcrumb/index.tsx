//Utils
import cx from "classnames"
import * as React from "react"

//Icons
import { ReactComponent as ArrowRight } from "../../assets/arrow-right.svg"
//Styles
import Styles from "./index.module.scss"

interface BreadcrumbProps {
  className?: string
  children: React.ReactChild[]
}

const Breadcrumb: React.VFC<BreadcrumbProps> = ({ className, children }) => (
  <div className={cx(Styles.container, className)}>
    {children.reduce<React.ReactChild[]>((elements, child, i) => {
      if (i === elements.length - 1) {
        return [...elements, child]
      }

      return elements.concat(child, <ArrowRight key={`arrow-${i}`} />)
    }, [])}
  </div>
)

export default Breadcrumb
