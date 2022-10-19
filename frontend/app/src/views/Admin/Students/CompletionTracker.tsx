//Components
import { MDBContainer,MDBDataTable } from "mdbreact"
import * as React from "react"
//Hooks
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import BackButton from "../../../components/Button/BackButton"
import useLoader from "../../../hooks/useLoader"
//Actions
import * as actions from "../../../store/actions"
import { ReduxState } from "../../../store/types"
//Styles
import Styles from "./index.module.scss"

const CompletionTracker: React.FC = () => {
  const { t } = useTranslation()
  const params = useParams<{ id?: string }>()
  const { studentList } = useSelector((state: ReduxState) => state.admin)
  const student =
    studentList &&
    studentList.students &&
    studentList.students.length > 0 &&
    params &&
    params.id &&
    studentList.students.find((student) => student.id === Number(params.id))
  const dispatch = useDispatch()

  const STATUS_DONE = 2

  const studentCompletionData = student
    ? Object.entries(student.completion ?? {})
        .filter(([_]) => _ !== `id` && _ !== `campusScholars`)
        .map(([step, status]) => {
          return { step, status }
        })
    : []

  const data = {
    columns: [
      {
        label: t(`completionTracker.taskName`),
        field: `taskName`,
      },
      {
        label: t(`completionTracker.completed`),
        field: `completed`,
      },
    ],
    rows: studentCompletionData.map((row) => {
      return {
        taskName: t(
          `profile.student.profileScreen.buildYourProfileSteps.${row.step}.name`,
        ),
        completed: (
          <div
            style={{
              color: row.status === STATUS_DONE ? `#00AC58` : `#C91C0D`,
            }}
          >
            {row.status === STATUS_DONE ? `Y` : `N`}
          </div>
        ),
      }
    }),
  }

  const { onLoadComplete } = useLoader()

  useEffect(() => {
    if (student) {
      onLoadComplete()
      return
    }

    dispatch(actions.getStudentsList())
  }, [student, onLoadComplete])

  return (
    <div className={Styles.container}>
      {student ? (
        <MDBContainer fluid>
          <BackButton />
          <h1>
            {student && student.firstName && student.lastName
              ? `${student.firstName} ${student.lastName}'s ${t(
                  `completionTracker.completionTracker`,
                )}`
              : `No Name's ${t(`completionTracker.completionTracker`)}`}
          </h1>
          <div
            className={Styles.completionRing}
            style={{
              borderColor:
                student && student.percentageCompletion > 50
                  ? `#00AC58`
                  : `#C91C0D`,
            }}
          >
            <div
              style={{
                color:
                  student && student.percentageCompletion > 50
                    ? `#00AC58`
                    : `#C91C0D`,
              }}
            >
              {student && student.percentageCompletion
                ? `${student.percentageCompletion}%`
                : `0%`}
            </div>
            <div
              style={{
                color:
                  student && student.percentageCompletion > 50
                    ? `#00AC58`
                    : `#C91C0D`,
              }}
            >
              Completion
            </div>
          </div>
          <MDBDataTable
            data={data}
            noBottomColumns={true}
            className={Styles.table}
            displayEntries={false}
            sortable={false}
            paging={false}
            searching={false}
            noRecordsFoundLabel=""
          />
        </MDBContainer>
      ) : null}
    </div>
  )
}

export default CompletionTracker
