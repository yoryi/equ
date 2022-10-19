//Utils
import _ from "lodash"
import React, { useEffect,useState } from "react"
import { useDropzone } from "react-dropzone"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
//Hooks
import { useParams } from "react-router"

//Images
import { ReactComponent as QuestionMarkIcon } from "../../../../assets/question-mark-icon.svg"
import Button from "../../../../components/Button/Button"
import Card from "../../../../components/Card/Card"
import EmptyExperience from "../../../../components/EmptyExperience/EmptyExperience"
//Constants
import fileLimits from "../../../../const/fileLimits"
import useScrollLock from "../../../../hooks/useScrollLock"
import { actions } from "../../../../store"
import { ReduxState } from "../../../../store/types"
import { ProfileTranscript } from "../../../../store/types/profile"
import getScoreFromGrade from "../../../../utils/getScoreFromGrade"
import { AddSubjectModal } from "./AddSubjectModal"
import { LetterGradingScaleModal } from "./LetterGradingScaleModal"
import { SubjectSeeMoreModal } from "./SubjectSeeMoreModal"

interface TranscriptAtGlanceProps {
  transcript: ProfileTranscript | null
}

export const TranscriptAtGlance: React.FC<TranscriptAtGlanceProps> = ({
  transcript,
}) => {
  const params = useParams<{ id?: string }>()
  const id = params.id ? parseInt(params.id) : null
  const isViewingOwnProfile = !id

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isTranscriptAtGlanceModalOpen } = useSelector((state: any) =>
    state.profile.transcript ? state.profile.transcript : ``,
  )
  const { isAddTranscriptAtGlanceModalOpen } = useSelector((state: any) =>
    state.profile.transcript ? state.profile.transcript : ``,
  )
  const { fullTranscript } = useSelector((state: any) =>
    id ? state.student.transcript : state.profile.transcript,
  )
  const isTokenLoaded = useSelector<ReduxState, boolean>(
    (state) => !!state.auth.tokenType && !!state.auth.accessToken,
  )

  const initialTranscript = [
    {
      name: `MATH`,
      title: t(`profile.student.transcriptScreen.math`),
      parts: [],
    },
    {
      name: `ENGLISH`,
      title: t(`profile.student.transcriptScreen.english`),
      parts: [],
    },
    {
      name: `SCIENCE`,
      title: t(`profile.student.transcriptScreen.science`),
      parts: [],
    },
    {
      name: `SOCIAL_STUDIES`,
      title: t(`profile.student.transcriptScreen.socialStudies`),
      parts: [],
    },
    {
      name: `ELECTIVES`,
      title: t(`profile.student.transcriptScreen.electives`),
      parts: [],
    },
  ]

  const [
    isLetterGradingScaleModalOpen,
    toggleLetterGradingScaleModal,
  ] = useState(false)

  const [_isScrollLocked, setScrollLocked] = useScrollLock(false)

  const { getRootProps, getInputProps } = useDropzone({
    accept: `.pdf`,
    multiple: false,
    onDropAccepted: (acceptedFiles) => {
      acceptedFiles.length > 0 &&
        acceptedFiles.map(async (acceptedFile) => {
          if (acceptedFile.size > fileLimits.transcript) {
            toast.error(
              t(`errors:fileIsTooBig`, {
                limit: fileLimits.transcript,
              }),
            )
            return
          }

          const reader: any = new FileReader()
          await reader.readAsBinaryString(acceptedFile)
          reader.onloadend = async function () {
            const formData = new FormData()
            formData.append(`transcript`, acceptedFile)
            dispatch(actions.uploadFullTranscript({ data: formData }))
          }
        })
    },
  })

  useEffect(() => {
    if (!isTokenLoaded) {
      return
    }

    dispatch(actions.getFullTranscript(id))
  }, [dispatch, isTokenLoaded])

  useEffect(() => {
    setScrollLocked(
      !!isTranscriptAtGlanceModalOpen?.length ||
        !!isAddTranscriptAtGlanceModalOpen?.length,
    )
  }, [
    setScrollLocked,
    isTranscriptAtGlanceModalOpen,
    isAddTranscriptAtGlanceModalOpen,
  ])

  if (
    !transcript?.transcript?.length &&
    !fullTranscript &&
    !isViewingOwnProfile
  ) {
    return null
  }

  return (
    <div className="student-profile-tab-item">
      <div className="student-profile-tab-item-title">
        <div>
          {t(`profile.student.transcriptScreen.transcriptAtGlance`)}

          <button
            className={`p-0 m-0 ml-4 border-0 bg-transparent outline-none`}
            onClick={() => toggleLetterGradingScaleModal(true)}
          >
            <QuestionMarkIcon />
          </button>
        </div>
      </div>
      <div className="transcript-at-glance">
        {!!transcript?.transcript?.length
          ? initialTranscript.map((it: any) => {
              const subjectItem: any =
                transcript.transcript &&
                transcript.transcript.find((item) => item.name === it.name)

              if (!!subjectItem?.parts.length) {
                return (
                  <>
                    <Card
                      title={it.title}
                      key={it.name}
                      subtitle={t(`common:composite`, {
                        score: subjectItem
                          ? subjectItem?.parts?.filter(
                              (it: any) =>
                                it.grade !== `Fail` && it.grade !== `Pass`,
                            ).length > 0
                            ? Math.round(
                                (subjectItem?.parts.reduce(
                                  (total: number, { grade }: any) =>
                                    total + getScoreFromGrade(grade),
                                  0,
                                ) /
                                  subjectItem?.parts?.filter(
                                    (it: any) =>
                                      it.grade !== `Fail` &&
                                      it.grade !== `Pass`,
                                  ).length) *
                                  100,
                              ) / 100
                            : 0
                          : 0,
                      })}
                      body={_.take(
                        subjectItem?.parts.sort((a: any, b: any) => {
                          return a.order - b.order
                        }),
                        4,
                      ).map((part: any, index: number) => (
                        <div
                          className="transcript-at-glance-grade-container"
                          key={index}
                        >
                          <div className="transcript-at-glance-grade-subject">
                            {part.name}
                          </div>
                          <div className="transcript-at-glance-grade-mark">
                            {part.grade}
                          </div>
                        </div>
                      ))}
                      footer={t(`common:seeMore`)}
                      toggleFooterModal={() =>
                        dispatch(actions.toggleGlanceModal(it.title))
                      }
                      toggleModal={() =>
                        dispatch(actions.toggleGlanceModal(it.title))
                      }
                      hideEditIcon={!isViewingOwnProfile}
                    />
                    {isTranscriptAtGlanceModalOpen ? (
                      <SubjectSeeMoreModal
                        isOpen={isTranscriptAtGlanceModalOpen}
                        toggle={() => dispatch(actions.toggleGlanceModal(``))}
                        category={it.name}
                        title={it.title}
                        GPA={
                          subjectItem?.parts?.filter(
                            (it: any) =>
                              it.grade !== `Fail` && it.grade !== `Pass`,
                          ).length > 0
                            ? Math.round(
                                (subjectItem?.parts.reduce(
                                  (total: number, { grade }: any) =>
                                    total + getScoreFromGrade(grade),
                                  0,
                                ) /
                                  subjectItem?.parts?.filter(
                                    (it: any) =>
                                      it.grade !== `Fail` &&
                                      it.grade !== `Pass`,
                                  ).length) *
                                  100,
                              ) / 100
                            : 0
                        }
                        courses={subjectItem?.parts || []}
                        openLetterGradingScaleModal={() =>
                          toggleLetterGradingScaleModal(true)
                        }
                      />
                    ) : null}
                    {isAddTranscriptAtGlanceModalOpen ? (
                      <AddSubjectModal
                        isOpen={isAddTranscriptAtGlanceModalOpen}
                        toggle={() =>
                          dispatch(actions.toggleAddGlanceModal(``))
                        }
                        category={it.name}
                        title={it.title}
                        openLetterGradingScaleModal={() =>
                          toggleLetterGradingScaleModal(true)
                        }
                      />
                    ) : null}
                  </>
                )
              }

              if (!isViewingOwnProfile) {
                return null
              }

              return (
                <>
                  <Card
                    body={
                      <EmptyExperience
                        wholeTitle={t(
                          `profile.student.transcriptScreen.addXCourse`,
                          { title: it.title },
                        )}
                        wholeDescription={t(
                          `profile.student.transcriptScreen.clickHereToAddAnyCourse`,
                          { title: it.title.toLowerCase() },
                        )}
                        toggleModal={() =>
                          dispatch(actions.toggleAddGlanceModal(it.title))
                        }
                      />
                    }
                    hideEditIcon
                  />

                  {isTranscriptAtGlanceModalOpen ? (
                    <SubjectSeeMoreModal
                      isOpen={isTranscriptAtGlanceModalOpen}
                      toggle={() => dispatch(actions.toggleGlanceModal(``))}
                      category={it.name}
                      title={it.title}
                      GPA={0}
                      courses={subjectItem?.parts || []}
                      openLetterGradingScaleModal={() =>
                        toggleLetterGradingScaleModal(true)
                      }
                    />
                  ) : null}
                  {isAddTranscriptAtGlanceModalOpen ? (
                    <AddSubjectModal
                      isOpen={isAddTranscriptAtGlanceModalOpen}
                      toggle={() => dispatch(actions.toggleAddGlanceModal(``))}
                      category={it.name}
                      title={it.title}
                      openLetterGradingScaleModal={() =>
                        toggleLetterGradingScaleModal(true)
                      }
                    />
                  ) : null}
                </>
              )
            })
          : initialTranscript.map(
              (it) =>
                isViewingOwnProfile && (
                  <>
                    <Card
                      body={
                        <EmptyExperience
                          wholeTitle={t(
                            `profile.student.transcriptScreen.addXCourse`,
                            { title: it.title },
                          )}
                          wholeDescription={t(
                            `profile.student.transcriptScreen.clickHereToAddAnyCourse`,
                            { title: it.title.toLowerCase() },
                          )}
                          toggleModal={() =>
                            dispatch(actions.toggleAddGlanceModal(it.title))
                          }
                        />
                      }
                      hideEditIcon
                    />
                    {isTranscriptAtGlanceModalOpen ? (
                      <SubjectSeeMoreModal
                        isOpen={isTranscriptAtGlanceModalOpen}
                        toggle={() => dispatch(actions.toggleGlanceModal(``))}
                        category={it.name}
                        title={it.title}
                        GPA={0}
                        courses={[]}
                        openLetterGradingScaleModal={() =>
                          toggleLetterGradingScaleModal(true)
                        }
                      />
                    ) : null}
                    {isAddTranscriptAtGlanceModalOpen ? (
                      <AddSubjectModal
                        isOpen={isAddTranscriptAtGlanceModalOpen}
                        toggle={() =>
                          dispatch(actions.toggleAddGlanceModal(``))
                        }
                        category={it.name}
                        title={it.title}
                        openLetterGradingScaleModal={() =>
                          toggleLetterGradingScaleModal(true)
                        }
                      />
                    ) : null}
                  </>
                ),
            )}
        <LetterGradingScaleModal
          isOpen={isLetterGradingScaleModalOpen}
          toggle={() => toggleLetterGradingScaleModal(false)}
        />
      </div>
      <div style={{ textAlign: `center` }}>
        {isViewingOwnProfile && !fullTranscript?.size && (
          <div className="upload-full-transcript-container" {...getRootProps()}>
            <div className="d-flex justify-content-center dropzone">
              <input {...getInputProps()} />
              <Button size="md" style={{ zIndex: 1 }}>
                {t(`profile.student.transcriptScreen.uploadFullTranscript`)}
              </Button>
            </div>
          </div>
        )}

        {!!fullTranscript?.size && (
          <div className={`d-flex justify-content-center`}>
            <Button
              size="md"
              onClick={() => {
                const blob = new Blob([fullTranscript], {
                  type: `application/pdf`,
                })
                const a = document.createElement(`a`)
                a.href = window.URL.createObjectURL(blob)
                a.target = `_blank`
                a.click()
              }}
            >
              {t(`profile.student.transcriptScreen.seeFullTranscript`)}
            </Button>
          </div>
        )}

        {isViewingOwnProfile && !!fullTranscript?.size && (
          <div className="upload-full-transcript-container" {...getRootProps()}>
            <div className="d-flex justify-content-center dropzone">
              <input {...getInputProps()} />
              <div className="transcript-at-glance-replace-button">
                {t(`profile.student.transcriptScreen.replaceTranscript`)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
