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
import { actions } from "../../../../store"
import { ProfileTranscript } from "../../../../store/types/profile"
import { AddSatSubjectTestModal } from "./AddSatSubjectTestModal"
import { SatSubjectsModal } from "./SatSubjectsModal"

interface SatSubjectTestsProps {
  transcript: ProfileTranscript | null
}

export const SatSubjectTests: React.FC<SatSubjectTestsProps> = ({
  transcript,
}) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isSubjectCoursesModalOpen } = useSelector((state: any) =>
    state.profile.transcript ? state.profile.transcript : false,
  )
  const { isAddSubjectCoursesModalOpen } = useSelector((state: any) =>
    state.profile.transcript ? state.profile.transcript : false,
  )

  if (!transcript?.satSubjectTests?.length && !isViewingOwnProfile) {
    return null
  }

  return (
    <div className="student-profile-tab-item">
      <div className="student-profile-tab-item-title">
        <div>{t(`profile.student.transcriptScreen.satSubjectTests`)}</div>

        {!!transcript?.satSubjectTests?.length && isViewingOwnProfile && (
          <IconBox
            className={`mx-1`}
            icon={Plus}
            variant={`dark`}
            onClick={() => dispatch(actions.toggleAddSubjectCoursesModal(true))}
            tag={`button`}
            shadow
          />
        )}
      </div>
      <div className="sat-subject-tests">
        {!!transcript?.satSubjectTests?.length && (
          <Card
            body={
              <Table
                headValues={[
                  t(`profile.student.transcriptScreen.testName`),
                  t(`common:score`),
                ]}
                body={transcript.satSubjectTests
                  .sort((a: any, b: any) => {
                    return a.order - b.order
                  })
                  .map((course: any) => (
                    <tr>
                      <td>
                        {course.gpa || course.name}
                        <div className="sat-subject-tests-table-date">
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
              dispatch(actions.toggleSubjectCoursesModal(true))
            }
            hideEditIcon={!isViewingOwnProfile}
          />
        )}

        {!transcript?.satSubjectTests?.length && isViewingOwnProfile && (
          <EmptyExperience
            title={t(`profile.student.transcriptScreen.satSubjectTests`)}
            toggleModal={() =>
              dispatch(actions.toggleAddSubjectCoursesModal(true))
            }
          />
        )}

        {isSubjectCoursesModalOpen && !!transcript?.satSubjectTests?.length ? (
          <SatSubjectsModal
            isOpen={
              isSubjectCoursesModalOpen && !!transcript?.satSubjectTests?.length
            }
            toggle={() => dispatch(actions.toggleSubjectCoursesModal(false))}
            courses={transcript?.satSubjectTests ?? []}
          />
        ) : null}

        {isAddSubjectCoursesModalOpen ? (
          <AddSatSubjectTestModal
            isOpen={isAddSubjectCoursesModalOpen}
            toggle={() => dispatch(actions.toggleAddSubjectCoursesModal(false))}
          />
        ) : null}
      </div>
    </div>
  )
}
