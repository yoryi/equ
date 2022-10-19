import moment from "moment"
import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
//Hooks
import { useParams } from "react-router"

import { ReactComponent as Plus } from "../../../../assets/plus.svg"
import Card from "../../../../components/Card/Card"
import EmptyExperience from "../../../../components/EmptyExperience/EmptyExperience"
//Components
import IconBox from "../../../../components/IconBox"
import Table from "../../../../components/Table/Table"
import { actions } from "../../../../store"
import { ProfileTranscript } from "../../../../store/types/profile"
import { AddApCourseModal } from "./AddApCourseModal"
import { ApCourseModal } from "./ApCoursesModal"

interface ApCoursesProps {
  transcript: ProfileTranscript | null
}

export const ApCourses: React.FC<ApCoursesProps> = ({ transcript }) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isApCoursesModalOpen } = useSelector((state: any) =>
    state.profile.transcript ? state.profile.transcript : false,
  )
  const { isAddApCoursesModalOpen } = useSelector((state: any) =>
    state.profile.transcript ? state.profile.transcript : false,
  )

  if (!transcript?.apCourses?.length && !isViewingOwnProfile) {
    return null
  }

  return (
    <div className="student-profile-tab-item">
      <div className="student-profile-tab-item-title">
        <div>{t(`profile.student.transcriptScreen.apTests`)}</div>

        {!!transcript?.apCourses?.length && isViewingOwnProfile && (
          <IconBox
            className={`mx-1`}
            icon={Plus}
            variant={`dark`}
            onClick={() => dispatch(actions.toggleAddApCoursesModal(true))}
            tag={`button`}
            shadow
          />
        )}
      </div>
      <div className="ap-courses">
        {!!transcript?.apCourses?.length && (
          <Card
            body={
              <Table
                headValues={[t(`common:testName`), t(`common:score`)]}
                body={transcript.apCourses
                  .sort((a: any, b: any) => {
                    return a.order - b.order
                  })
                  .map((course: any) => (
                    <tr>
                      <td>
                        {course.gpa || course.name}
                        <div className="ap-courses-table-date">
                          {course.date
                            ? moment(course.date).format(`MMMM YYYY`)
                            : moment(course.year).format(`MMMM YYYY`)}
                        </div>
                      </td>
                      <td>{course.grade}</td>
                    </tr>
                  ))}
              />
            }
            toggleModal={() => dispatch(actions.toggleApCoursesModal(true))}
            hideEditIcon={!isViewingOwnProfile}
          />
        )}

        {!transcript?.apCourses?.length && isViewingOwnProfile && (
          <EmptyExperience
            title={t(`profile.student.transcriptScreen.apTests`)}
            toggleModal={() => dispatch(actions.toggleAddApCoursesModal(true))}
          />
        )}

        {isApCoursesModalOpen && !!transcript?.apCourses?.length ? (
          <ApCourseModal
            courses={transcript?.apCourses ?? []}
            isOpen={isApCoursesModalOpen && !!transcript?.apCourses?.length}
            toggle={() => dispatch(actions.toggleApCoursesModal(false))}
          />
        ) : null}

        {isAddApCoursesModalOpen ? (
          <AddApCourseModal
            isOpen={isAddApCoursesModalOpen}
            toggle={() => dispatch(actions.toggleAddApCoursesModal(false))}
          />
        ) : null}
      </div>
    </div>
  )
}
