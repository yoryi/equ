//Utils
import cx from "classnames"
import _ from "lodash"
import moment from "moment"
import React from "react"
//Hooks
import { useTranslation } from "react-i18next"

import SelectField from "../SelectField/SelectField"

interface DatepickerProps {
  className?: string
  fromMonth?: any
  fromYear?: any
  title: string
  setFieldValue?: any
  error?: string | false
  type?: "Semester" | "Month"
}

const yearOptions = _.times(15, (i) => ({
  id: moment().subtract(i, `year`).year(),
  name: moment().subtract(i, `year`).year().toString(),
}))

const Datepicker: React.FC<DatepickerProps> = ({
  className,
  fromMonth,
  fromYear,
  type,
  title,
  setFieldValue,
  error,
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

  const semesterOptions = [
    { id: 1, name: t(`spring`) },
    { id: 2, name: t(`fall`) },
    { id: 3, name: t(`fullYear`) },
  ]

  return (
    <div className={cx(className, `custom-datepicker`)}>
      <div className="custom-datepicker-select-fields d-flex">
        <SelectField
          onChange={(e: any) =>
            type === `Month`
              ? setFieldValue(
                  `month`,
                  monthOptions.find((month) => month.name === e.value)?.id,
                )
              : setFieldValue(
                  `month`,
                  semesterOptions.find((semester) => semester.name === e.value)
                    ?.id,
                )
          }
          value={
            type === `Month`
              ? fromMonth && Number(fromMonth) >= 1 && Number(fromMonth) <= 12
                ? monthOptions[Number(fromMonth) - 1].name
                : ``
              : fromMonth &&
                (Number(fromMonth) === 1 ||
                  Number(fromMonth) === 2 ||
                  Number(fromMonth) === 3)
              ? semesterOptions[Number(fromMonth) - 1].name
              : ``
          }
          items={type === `Month` ? monthOptions : semesterOptions}
          title={title}
          placeholder={t(type === `Month` ? `month` : `fallSpringYear`)}
          otherValues={true}
          otherValue={!!fromYear}
          isInvalid={!!error}
        />
        <SelectField
          onChange={(e: any) =>
            setFieldValue(
              `year`,
              yearOptions.find((year) => year.name === e.value)?.id,
            )
          }
          value={fromYear?.toString() ?? ``}
          items={yearOptions}
          placeholder={t(`year`)}
          isInvalid={!!error}
        />
      </div>

      <div className={`error`}>{error}</div>
    </div>
  )
}

export default Datepicker
