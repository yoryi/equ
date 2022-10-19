//Utils
import classNames from "classnames"
import * as React from "react"

//Components
import { ReactComponent as BackgroundImage } from "../../assets/transcript-cover-img.svg"
//Styles
import Styles from "./index.module.scss"

interface AdminRouteProps {
  background?: boolean
  narrow?: boolean
}

const AdminRoute: React.FC<AdminRouteProps> = ({
  background = false,
  narrow = false,
  children,
}) => (
  <div
    className={classNames(Styles.container, {
      [Styles.background]: background,
      [Styles.narrow]: narrow,
    })}
  >
    {children}

    {background && (
      <div className={Styles.background}>
        <BackgroundImage />
      </div>
    )}
  </div>
)

export default AdminRoute
