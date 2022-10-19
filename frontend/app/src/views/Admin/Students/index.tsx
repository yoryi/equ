import classNames from "classnames"
//Utils
import * as _ from "lodash"
//Components
import { MDBCard, MDBCardBody, MDBCol, MDBDataTableV5, MDBRow } from "mdbreact"
import * as React from "react"
//Hooks
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import TextField from "../../../components/TextField/TextField"
import history from "../../../history"
import useLoader from "../../../hooks/useLoader"
//Actions
import * as actions from "../../../store/actions"
import { ReduxState } from "../../../store/types"
//Styles
import Styles from "./index.module.scss"

interface Sort {
  field: "name" | "email" | "highSchool" | "completion" | "logins"
  order: "asc" | "desc"
}

const StudentList: React.FC = () => {
  const studentList = useSelector(
    (state: ReduxState) => state.admin.studentList,
  )
  const dispatch = useDispatch()

  const [sort, setSort] = useState<Sort>({
    field: `name`,
    order: `asc`,
  })
  const [query, setQuery] = useState(``)

  const { onLoadComplete } = useLoader()

  const { t } = useTranslation()

  const columns = [
    { label: t(`studentUserList.name`), field: `name` },
    { label: t(`studentUserList.email`), field: `email` },
    { label: t(`studentUserList.highschool`), field: `highSchool` },
    { label: t(`studentUserList.profileCompletion`), field: `completion` },
    { label: t(`studentUserList.numberOfLogins`), field: `logins` },
  ].map((column) => {
    if (column.field === sort.field) {
      return {
        ...column,
        sort: sort.order,
      }
    }

    return {
      ...column,
      sort: undefined,
    }
  })
  const rows =
    studentList?.students
      .map((student) => ({
        id: student.id,
        name:
          student.firstName &&
          student.lastName &&
          `${student.firstName} ${student.lastName}`,
        email: student.user.email,
        highSchool: student.school?.name,
        completion: student.percentageCompletion,
        logins: student.user.stats?.logins,
      }))
      .filter(
        (student) =>
          !query.length ||
          student.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          student.email?.toLowerCase().indexOf(query.toLowerCase()) !== -1,
      )
      .sort(
        (a, b) =>
          ((a[sort.field] ?? `z`) > (b[sort.field] ?? `z`) ? 1 : -1) *
          (sort.order === `asc` ? 1 : -1),
      )
      .map((student) => ({
        ...student,
        name: (
          <div
            style={{
              color: student.name ? `#005dcc` : `#1f242b`,
              cursor: student.name ? `pointer` : `default`,
            }}
            onClick={() => {
              history.push(`/admin/student/${student.id}`)
            }}
          >
            {student.name ?? `N/A`}
          </div>
        ),
        highSchool: student.highSchool ?? `N/A`,
        completion: (
          <div
            style={{
              color: student.completion > 50 ? `#00AC58` : `#C91C0D`,
              cursor: student.completion !== 0 ? `pointer` : `default`,
            }}
            onClick={() =>
              student.completion !== 0 &&
              history.push(`/admin/completion/${student.id}`)
            }
          >
            {student.completion || 0}%
          </div>
        ),
        logins: student.logins ?? `N/A`,
      })) ?? []

  useEffect(() => {
    if (studentList) {
      onLoadComplete()
      return
    }

    dispatch(actions.getStudentsList())
  }, [studentList])

  const handleSort = ({
    column: field,
    direction: order,
  }: {
    column: Sort["field"]
    direction: Sort["order"]
  }) =>
    setSort({
      field: field ?? sort.field,
      order:
        sort.field === field ? (sort.order === `desc` ? `asc` : `desc`) : order,
    })

  return (
    <div>
      <h1 className={Styles.studentUserListTitle}>
        {studentList?.name || t(`studentUserList.studentUsers`)}
      </h1>
      <MDBRow className={`mt-5 ${Styles.cardsRow}`} around>
        <MDBCol md={`3`}>
          <MDBCard className={`align-items-center py-4`}>
            <h2 className={`font-family-normal mb-2`}>
              {studentList?.stats.schoolsQty.toLocaleString(`en-US`)}
            </h2>
            <h3 className={`mb-0`}>{t(`studentUserList.highschools`)}</h3>
          </MDBCard>
        </MDBCol>

        <MDBCol md={`3`}>
          <MDBCard className={`align-items-center py-4`}>
            <h2 className={`font-family-normal mb-2`}>
              {studentList?.stats.studentsQty.toLocaleString(`en-US`)}
            </h2>
            <h3 className={`mb-0`}>{t(`studentUserList.students`)}</h3>
          </MDBCard>
        </MDBCol>

        <MDBCol md={`3`}>
          <MDBCard className={`align-items-center py-4`}>
            <h2 className={`font-family-normal mb-2`}>
              {studentList?.stats.averageCompletion.toLocaleString(`en-US`)
                ? `${studentList?.stats.averageCompletion.toLocaleString(
                    `en-US`,
                  )}%`
                : ``}
            </h2>
            <h3 className={`mb-0`}>{t(`studentUserList.averageCompletion`)}</h3>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBCard className={Styles.card}>
        <MDBCardBody className={`d-flex flex-column`}>
          <TextField
            className={classNames(Styles.searchInput, `align-self-end m-0`)}
            value={query}
            onChange={(e: any) => setQuery(e.target.value)}
            placeholder={t(`common:searchForStudents`)}
          />

          <MDBDataTableV5
            data={{
              columns,
              rows,
            }}
            noBottomColumns={true}
            className={Styles.table}
            displayEntries={false}
            searching={false}
            disableRetreatAfterSorting={true}
            onSort={
              handleSort as ({
                column,
                direction,
              }: {
                column: string
                direction: string
              }) => void
            }
          />
        </MDBCardBody>
      </MDBCard>
    </div>
  )
}

export default StudentList
