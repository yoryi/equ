import moment from "moment"
import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
//Hooks
import { useParams } from "react-router"

import { ReactComponent as Plus } from "../../../../assets/plus.svg"
import Card from "../../../../components/Card/Card"
import EmptyExperience from "../../../../components/EmptyExperience/EmptyExperience"
import IconBox from "../../../../components/IconBox"
import Table from "../../../../components/Table/Table"
import useWindowDimensions from "../../../../hooks/UseWindowDimensions"
import { actions } from "../../../../store"
import { ProfileTranscript } from "../../../../store/types/profile"
import { AddCollegeCourseModal } from "./AddCollegeCourseModal"
import { CollegeCoursesModal } from "./CollegeCoursesModal"

interface CollegeCoursesProps {
  transcript: ProfileTranscript | null
}

export const CollegeCourses: React.FC<CollegeCoursesProps> = ({
  transcript,
}) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isCollegeCoursesModalOpen } = useSelector((state: any) =>
    state.profile.transcript ? state.profile.transcript : false,
  )
  const { isAddCollegeCourseModalOpen } = useSelector((state: any) =>
    state.profile.transcript ? state.profile.transcript : false,
  )

  const { windowWidth } = useWindowDimensions()

  if (!transcript?.collegeCourses?.length && !isViewingOwnProfile) {
    return null
  }

  return (
    <div className="student-profile-tab-item">
      <div className="student-profile-tab-item-title">
        <div>{t(`profile.student.transcriptScreen.collegeCourses`)}</div>

        {!!transcript?.collegeCourses?.length && isViewingOwnProfile && (
          <IconBox
            className={`mx-1`}
            icon={Plus}
            variant={`dark`}
            onClick={() => dispatch(actions.toggleAddCollegeCourseModal(true))}
            tag={`button`}
            shadow
          />
        )}
      </div>
      <div className="college-courses">
        {!!transcript?.collegeCourses?.length && (
          <Card
            body={
              <Table
                headValues={[
                  t(`profile.student.transcriptScreen.courseName`),
                  windowWidth < 1024
                    ? t(`common:credits`)
                    : t(`common:creditsEarned`),
                ]}
                body={transcript.collegeCourses
                  .sort((a: any, b: any) => {
                    return a.order - b.order
                  })
                  .map((course: any) => (
                    <tr>
                      <td>
                        {course.gpa || course.name}
                        <div className="college-courses-table-date">
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
            toggleModal={() =>
              dispatch(actions.toggleCollegeCoursesModal(true))
            }
            hideEditIcon={!isViewingOwnProfile}
          />
        )}

        {!transcript?.collegeCourses?.length && isViewingOwnProfile && (
          <EmptyExperience
            title={t(`profile.student.transcriptScreen.collegeCourses`)}
            toggleModal={() =>
              dispatch(actions.toggleAddCollegeCourseModal(true))
            }
          />
        )}

        {isCollegeCoursesModalOpen && !!transcript?.collegeCourses?.length ? (
          <CollegeCoursesModal
            isOpen={
              isCollegeCoursesModalOpen && !!transcript?.collegeCourses?.length
            }
            toggle={() => dispatch(actions.toggleCollegeCoursesModal(false))}
            courses={transcript?.collegeCourses ?? []}
          />
        ) : null}

        {isAddCollegeCourseModalOpen ? (
          <AddCollegeCourseModal
            isOpen={isAddCollegeCourseModalOpen}
            toggle={() => dispatch(actions.toggleAddCollegeCourseModal(false))}
          />
        ) : null}
      </div>
    </div>
  )
}
