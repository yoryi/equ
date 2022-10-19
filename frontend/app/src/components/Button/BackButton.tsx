import React from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as LeftArrow } from "../../assets/chevron-left.svg"
import history from "../../history"

const BackButton = () => {
  const { t } = useTranslation()
  return window.history.length !== 2 ? (
    <div className="back-button" onClick={() => history.goBack()}>
      <LeftArrow />
      {t(`common:back`)}
    </div>
  ) : null
}

export default BackButton
