//Utils
import classNames from "classnames"
import * as React from "react"
//Hooks
import { useEffect } from "react"
import Loader from "react-loader-spinner"
//Components
import { Transition } from "react-transition-group"

import { ReactComponent as Check } from "../../assets/check.svg"
import { ReactComponent as Close } from "../../assets/close-icon-white.svg"
//Styles
import Styles from "./index.module.scss"

export enum RoundButtonState {
  Default = `default`,
  Loading = `loading`,
  Success = `success`,
  Error = `error`,
}

interface RoundButtonBaseProps {
  variant: "blue" | "yellow" | "red"
  secondary?: boolean
  disabled?: boolean
  className?: string
  fill?: boolean
  children: React.ReactNode
  role?: string
}

interface RoundButtonProps {
  state?: RoundButtonState
  onClick?: () => void
  onStateReset?: () => void
  to?: undefined
}

interface RoundButtonLinkProps {
  state?: undefined
  onClick?: undefined
  onStateReset?: undefined
  to: string
}

const RoundButton: React.FC<
  RoundButtonBaseProps & (RoundButtonProps | RoundButtonLinkProps)
> = ({
  variant,
  secondary = false,
  disabled = false,
  className,
  fill = false,
  state = RoundButtonState.Default,
  onClick,
  onStateReset,
  to,
  children,
  role,
}) => {
  useEffect(() => {
    if (
      !onStateReset ||
      (state !== RoundButtonState.Success && state !== RoundButtonState.Error)
    ) {
      return
    }

    const timeout = setTimeout(onStateReset, 2000)

    return () => clearTimeout(timeout)
  }, [state, onStateReset])

  const loaderColor = secondary
    ? { blue: `#005dcc`, yellow: `#EBAD00`, red: `#c91c0d` }[variant]
    : `white`

  return React.createElement(
    to ? `a` : `button`,
    {
      href: to,
      target: to && `_blank`,
      className: classNames(
        Styles.button,
        {
          [Styles.secondary]: secondary,
          [Styles.disabled]: disabled,
        },
        Styles[variant],
        className,
      ),
      onClick,
      disabled,
      role,
    },
    <>
      <Transition in={state === RoundButtonState.Loading} timeout={500}>
        {(state) => (
          <div
            className={classNames(Styles.content, Styles.loader, Styles[state])}
          >
            <Loader
              type={`ThreeDots`}
              color={loaderColor}
              width={24}
              height={24}
            />
          </div>
        )}
      </Transition>

      <Transition in={state === RoundButtonState.Default} timeout={500}>
        {(state) => (
          <div
            className={classNames(
              Styles.content,
              { [Styles.fill]: fill },
              Styles[state],
            )}
          >
            {children}
          </div>
        )}
      </Transition>

      <Transition in={state === RoundButtonState.Success} timeout={500}>
        {(state) => (
          <div
            className={classNames(
              Styles.content,
              Styles.success,
              Styles[state],
            )}
          >
            <Check />
          </div>
        )}
      </Transition>

      <Transition in={state === RoundButtonState.Error} timeout={500}>
        {(state) => (
          <div className={classNames(Styles.content, Styles[state])}>
            <Close />
          </div>
        )}
      </Transition>
    </>,
  )
}

export default RoundButton
