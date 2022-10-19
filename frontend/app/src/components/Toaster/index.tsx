//Utils
import cx from "classnames"
import * as React from "react"
//Hooks
import { useToaster } from "react-hot-toast"
//Services
import toastService from "react-hot-toast"
import { useTranslation } from "react-i18next"
//Components
import { Transition } from "react-transition-group"

import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg"
//Icons
import { ReactComponent as ErrorIcon } from "../../assets/error.svg"
//Styles
import Styles from "./index.module.scss"

const Toaster: React.VFC = () => {
  const { toasts, handlers } = useToaster()
  const { startPause, endPause, calculateOffset, updateHeight } = handlers

  const { t } = useTranslation()

  return (
    <div
      className={Styles.container}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toast) => {
        const offset = calculateOffset(toast.id, {
          reverseOrder: false,
          margin: 8,
        })

        const ref = (el: HTMLDivElement) => {
          if (!el || toast.height) {
            return
          }

          const height = el.getBoundingClientRect().height
          updateHeight(toast.id, height)
        }

        let icon: React.ReactNode | null = toast.icon
        if (!icon) {
          switch (toast.type) {
            case `error`:
              icon = <ErrorIcon />
          }
        }

        return (
          <Transition key={toast.id} in={toast.visible} timeout={0} appear>
            {(state) => (
              <div
                ref={ref}
                className={cx(Styles.toast, Styles[state], Styles[toast.type])}
                style={{ transform: `translateY(${offset}px)` }}
                onClick={() => {
                  if (window.innerWidth > 1023) {
                    return
                  }

                  toastService.dismiss(toast.id)
                }}
              >
                {icon && (
                  <div className={cx(Styles.iconContainer, Styles[toast.type])}>
                    {icon}
                  </div>
                )}

                <div className={`flex-grow-1`}>
                  <span>
                    {toast.message}

                    {toast.role === `alert` && (
                      <a
                        className={cx(Styles.link, `ml-1`)}
                        role={`button`}
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.reload()
                        }}
                      >
                        {t(`common:clickHereToRefresh`)}
                      </a>
                    )}
                  </span>
                </div>

                <div className={`d-none d-md-block`}>
                  <button
                    className={Styles.closeButton}
                    onClick={() => toastService.dismiss(toast.id)}
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            )}
          </Transition>
        )
      })}
    </div>
  )
}

export default Toaster
