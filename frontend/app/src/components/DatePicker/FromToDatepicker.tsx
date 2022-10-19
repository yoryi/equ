import _ from "lodash"
import moment from "moment"
import React from "react"
//Hooks
import { useTranslation } from "react-i18next"

import Checkbox from "../Checkbox/Checkbox"
import SelectField from "../SelectField/SelectField"

interface FromToDatepickerProps {
  className?: string
  from: {
    month: number | null
    year: number | null
  }
  to: {
    month: number | null
    year: number | null
  } | null
  error?: string | boolean
  checkboxText: string
  setFieldValue?: any
}

const yearOptions = _.times(15, (i) => ({
  id: moment().subtract(i, `year`).year(),
  name: moment().subtract(i, `year`).year().toString(),
}))

const FromToDatepicker: React.FC<FromToDatepickerProps> = ({
  from,
  to,
  error,
  checkboxText,
  setFieldValue,
}) => {
  const { t } = useTranslation(`common`)

  const monthOptions = [
    { id: 1, name: t(`january`) },
    { id: 2, name: t(`february`) },
    { id: 3, name: t(`march`) },
    { id: 4, name: t(`april`) },
    { id: 5, name: t(`may`) },
    { id: 6, name: t(`june`) },
    { id: 7, name: t(`july`) },
    { id: 8, name: t(`august`) },
    { id: 9, name: t(`september`) },
    { id: 10, name: t(`october`) },
    { id: 11, name: t(`november`) },
    { id: 12, name: t(`december`) },
  ]

  return (
    <div className="custom-datepicker">
      <div className="custom-datepicker-checkbox">
        <Checkbox
          id="current-participate"
          checked={!to}
          toggle={() => {
            setFieldValue(
              `to`,
              !to
                ? {
                    month: null,
                    year: null,
                  }
                : null,
            )
          }}
        />
        <div className="custom-datepicker-checkbox-text">{checkboxText}</div>
      </div>
      <div className="custom-datepicker-select-fields">
        <SelectField
          onChange={(e: any) =>
            setFieldValue(
              `from.month`,
              monthOptions.find((month) => month.name === e.value)?.id,
            )
          }
          value={from.month ? monthOptions[from.month - 1].name : ``}
          items={monthOptions}
          title={t(`from`)}
          placeholder={t(`month`)}
          otherValues={true}
          otherValue={!!from.year}
          isInvalid={!!error}
        />
        <SelectField
          onChange={(e: any) =>
            setFieldValue(
              `from.year`,
              yearOptions.find((year) => year.name === e.value)?.id,
            )
          }
          value={from.year?.toString() ?? ``}
          items={yearOptions}
          placeholder={t(`year`)}
          isInvalid={!!error}
        />
      </div>
      {!to ? (
        <div className="custom-datepicker-present-section">
          <div className="custom-datepicker-present-section-label">
            {t(`to`).toUpperCase()}
          </div>
          <div className="custom-datepicker-present-section-text">
            {t(`present`)}
          </div>
        </div>
      ) : (
        <div className="custom-datepicker-select-fields">
          <SelectField
            onChange={(e: any) =>
              setFieldValue(
                `to.month`,
                monthOptions.find((month) => month.name === e.value)?.id,
              )
            }
            value={to.month ? monthOptions[to.month - 1].name : ``}
            items={monthOptions}
            title={t(`to`)}
            placeholder={t(`month`)}
            otherValues={true}
            otherValue={!!to.year}
            isInvalid={!!error}
          />
          <SelectField
            onChange={(e: any) =>
              setFieldValue(
                `to.year`,
                yearOptions.find((year) => year.name === e.value)?.id,
              )
            }
            value={to.year?.toString() ?? ``}
            items={yearOptions}
            placeholder={t(`year`)}
            isInvalid={!!error}
          />
        </div>
      )}

      <span className={`error`}>{error}</span>
    </div>
  )
}

export default FromToDatepicker
