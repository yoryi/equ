//Utils
import cx from "classnames"
import * as React from "react"

//Styles
import Styles from "./index.module.scss"

interface ProgressBarProps {
  title: string
  value: number | [number, number | null, number]
  max: number
  percentage?: boolean
  className?: string
}

/**
 * Renders a progress bar.
 * @param {string} title - Progress bar title
 * @param {number | [number, number | null, number]} value - Progress bar value
 * @param {number} max - Maximum value
 * @param {boolean} percentage - Set to true if the value should be displayed as percentage
 * @param {string} className - Class name applied to the component
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  title,
  value,
  max,
  percentage = false,
  className,
}) => (
  <div className={cx(Styles.container, className)}>
    {!percentage && <span className={`text-2`}>{title}</span>}

    <div
      className={cx(
        {
          [`align-items-end`]:
            (percentage && typeof value === `number`) ||
            (!!value && typeof value === `number`) ||
            (Array.isArray(value) && !value[1]),
          [`align-items-center`]: Array.isArray(value) && !!value[1],
        },
        `d-flex`,
      )}
    >
      <div className={`flex-grow-1`}>
        <div
          className={cx(Styles.labels, {
            [`justify-content-between`]: percentage,
          })}
        >
          {percentage && <span className={`text-2`}>{title}</span>}

          <div
            className={cx({
              [`position-relative flex-grow-1 px-1`]: !percentage,
            })}
          >
            {!percentage && !!value && typeof value === `number` && (
              <h5
                className={Styles.value}
                style={{ left: `${(value / max) * 100}%` }}
              >
                {value}
              </h5>
            )}

            {!percentage && Array.isArray(value) && (
              <>
                <h5
                  className={cx(Styles.value, Styles.left)}
                  style={{ right: `${100 - (value[0] / max) * 100}%` }}
                >
                  {value[0]}
                </h5>

                <h5
                  className={Styles.value}
                  style={{ left: `${(value[2] / max) * 100}%` }}
                >
                  {value[2]}
                </h5>
              </>
            )}

            {percentage && typeof value === `number` && (
              <h5>{`${
                value * 100 >= 1 ? (value * 100).toFixed(0) : `<1`
              }%`}</h5>
            )}
          </div>
        </div>

        <div className={Styles.bar}>
          {typeof value === `number` && value / max >= 0.01 && (
            <div
              className={Styles.value}
              style={{ width: `${(value / max) * 100}%` }}
            />
          )}

          {Array.isArray(value) && (
            <>
              <div
                className={cx(Styles.value, `position-absolute`)}
                style={{
                  width: `${((value[2] - value[0]) / max) * 100}%`,
                  left: `${(value[0] / max) * 100}%`,
                }}
              />

              {!!value[1] && (
                <div
                  className={Styles.line}
                  style={{ left: `${(value[1] / max) * 100}%` }}
                />
              )}
            </>
          )}
        </div>

        {Array.isArray(value) && !!value[1] && (
          <div className={Styles.labels}>
            <h5
              className={Styles.value}
              style={{ right: `${100 - (value[1] / max) * 100}%` }}
            >
              {value[1]}
            </h5>
          </div>
        )}
      </div>

      {!percentage && <span className={`ml-3 text-4`}>{max}</span>}
    </div>
  </div>
)

export default ProgressBar
