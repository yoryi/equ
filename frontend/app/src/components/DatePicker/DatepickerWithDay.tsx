import _ from "lodash"
import moment from "moment"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"

import SelectField from "../SelectField/SelectField"

interface DatepickerWithDayProps {
  day: any
  month: any
  year: any
  setFieldValue: any
  dayError?: any
  monthError?: any
  yearError?: any
}

const yearOptions = _.times(100, (i) => ({
  id: moment().subtract(i, `year`).year(),
  name: moment().subtract(i, `year`).year(),
}))

const DatepickerWithDay: React.FC<DatepickerWithDayProps> = ({
  day,
  month,
  year,
  setFieldValue,
  dayError,
  monthError,
  yearError,
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
  const isLeapYear = year ? moment([year]).isLeapYear() : false
  const daysInMonth =
    month && year && !isLeapYear
      ? moment(`${year}-${month}`, `YYYY-MM`).daysInMonth()
      : month
      ? moment(month, `MM`).month() === 1
        ? 29
        : moment(month, `MM`).daysInMonth()
      : 31

  const defaultDaysOptions = _.times(daysInMonth, (i) => ({
    id: i + 1,
    name: String(i + 1),
  }))

  useEffect(() => {
    if (day > daysInMonth) setFieldValue(`day`, 0)
  }, [month, year])

  return (
    <div className="custom-datepicker  custom-datepicker-with-day">
      <div className="custom-datepicker-select-fields custom-datepicker-with-day-select-fields">
        <SelectField
          onChange={(e: any) =>
            setFieldValue(
              `month`,
              monthOptions.find((month) => month.name === e.value)?.id,
            )
          }
          value={
            month && Number(month) >= 1 && Number(month) <= 12
              ? monthOptions[Number(month) - 1].name
              : ``
          }
          items={monthOptions}
          title={t(`birthday`)}
          placeholder={t(`month`)}
          isInvalid={!!monthError}
          error={monthError}
        />
        <SelectField
          onChange={(e: any) =>
            setFieldValue(
              `day`,
              defaultDaysOptions.find((day) => day.name === e.value)?.id,
            )
          }
          value={day ? String(day) : ``}
          items={defaultDaysOptions}
          placeholder={t(`day`)}
          otherValues={true}
          otherValue={month && year}
          isInvalid={!!dayError}
          error={dayError}
        />
        <SelectField
          onChange={(e: any) =>
            setFieldValue(
              `year`,
              yearOptions.find((year) => year.name === e.value)?.id,
            )
          }
          value={year ?? ``}
          items={yearOptions}
          placeholder={t(`year`)}
          isInvalid={!!yearError}
          error={yearError}
        />
      </div>
    </div>
  )
}

export default DatepickerWithDay
