import Chart from "chart.js"
import moment from "moment"
import React, { useEffect,useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
//Hooks
import { useParams } from "react-router"

import AddIcon from "../../../../assets/add-icon.svg"
import EditIcon from "../../../../assets/edit.svg"
import Card from "../../../../components/Card/Card"
import EmptyExperience from "../../../../components/EmptyExperience/EmptyExperience"
import useWindowDimensions from "../../../../hooks/UseWindowDimensions"
import { actions } from "../../../../store"
import { ProfileTranscript } from "../../../../store/types/profile"
import { AddYourSatScoreModal } from "./AddYourSatScoreModal"
import { StandarizedTestsModal } from "./StandarizedTestsModal"

interface StandarizedTestsProps {
  transcript: ProfileTranscript | null
}

let standarizedChart1: any
let standarizedChart2: any

export const StandarizedTests: React.FC<StandarizedTestsProps> = ({
  transcript,
}) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { windowWidth } = useWindowDimensions()
  const { isStandardizedTestModalOpen } = useSelector((state: any) =>
    state.profile.transcript ? state.profile.transcript : false,
  )
  const [isSecondStepModalVisible, setSecondStepModalVisible] = useState(false)
  const [
    isEditStandardizedTestModalOpen,
    toggleEditStandardizedTestModal,
  ] = useState(``)
  const [date, setDate] = useState<Date | null>(null)

  const options = {
    animation: {
      duration: 0,
    },
    title: {
      display: true,
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: false,
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: false,
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
  }

  Chart.defaults.doughnut.cutoutPercentage = 85
  Chart.defaults.RoundedDoughnut = Chart.helpers.clone(Chart.defaults.doughnut)
  Chart.controllers.RoundedDoughnut = Chart.controllers.doughnut.extend({
    draw: function (ease: any) {
      const ctx = this.chart.ctx
      const easingDecimal = ease || 1
      const arcs = this.getMeta().data
      Chart.helpers.each(arcs, function (arc: any) {
        arc.transition(easingDecimal).draw()
        const vm = arc._view
        ctx.save()
        ctx.translate(vm.x, vm.y)
        ctx.restore()
      })
    },
  })

  useEffect(() => {
    const ctx: any = document.getElementById(`standarizedChart1`)
    if (ctx) {
      const context = ctx.getContext(`2d`)
      if (standarizedChart1) {
        standarizedChart1.destroy()
      }
      standarizedChart1 =
        transcript &&
        transcript.standardizedTests &&
        new Chart(context, {
          type: `RoundedDoughnut`,
          data: {
            datasets: [
              {
                data: [
                  transcript.standardizedTests.sat.english,
                  800 - (transcript.standardizedTests.sat.english ?? 0),
                  800 - (transcript.standardizedTests.sat.math ?? 0),
                  transcript.standardizedTests.sat.math,
                ],
                backgroundColor: [
                  `#005DCC`,
                  `transparent`,
                  `transparent`,
                  `#E5EFFA`,
                ],
                hoverBackgroundColor: [
                  `#005DCC`,
                  `transparent`,
                  `transparent`,
                  `#E5EFFA`,
                ],
                borderWidth: 0,
              },
            ],
          },
          options,
        })
    }

    const ctx2: any = document.getElementById(`standarizedChart2`)
    if (ctx2 && transcript && transcript.standardizedTests) {
      const context2 = ctx2.getContext(`2d`)
      if (standarizedChart2) {
        standarizedChart2.destroy()
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      standarizedChart2 = new Chart(context2, {
        type: `RoundedDoughnut`,
        data: {
          datasets: [
            {
              data: [
                36 - (transcript.standardizedTests.act.math ?? 0),
                transcript.standardizedTests.act.math,
                transcript.standardizedTests.act.science,
                36 - (transcript.standardizedTests.act.science ?? 0),
                36 - (transcript.standardizedTests.act.reading ?? 0),
                transcript.standardizedTests.act.reading,
                transcript.standardizedTests.act.english,
                36 - (transcript.standardizedTests.act.english ?? 0),
              ],
              backgroundColor: [
                `transparent`,
                `#E5EFFA`,
                `#99BEEB`,
                `transparent`,
                `transparent`,
                `#005DCC`,
                `#003778`,
                `transparent`,
              ],
              hoverBackgroundColor: [
                `transparent`,
                `#E5EFFA`,
                `#99BEEB`,
                `transparent`,
                `transparent`,
                `#005DCC`,
                `#003778`,
                `transparent`,
              ],
              borderWidth: 0,
            },
          ],
        },
        options,
      })
    }
  }, [transcript])

  if (
    !transcript?.standardizedTests?.act &&
    !transcript?.standardizedTests?.sat &&
    !isViewingOwnProfile
  ) {
    return null
  }

  return (
    <div className="student-profile-tab-item">
      <div className="student-profile-tab-item-title">
        {t(`profile.student.transcriptScreen.standardizedTests`)}
        {isViewingOwnProfile &&
        transcript &&
        transcript.standardizedTests &&
        ((transcript && transcript.standardizedTests.sat) ||
          (transcript && transcript.standardizedTests.act)) ? (
          transcript.standardizedTests.act &&
          transcript.standardizedTests.sat ? null : (
            <img
              src={AddIcon}
              alt="add-icon"
              onClick={() =>
                dispatch(actions.toggleStandardizedTestModal(true))
              }
            />
          )
        ) : null}
      </div>
      {transcript &&
      transcript.standardizedTests &&
      ((transcript && transcript.standardizedTests.sat) ||
        (transcript && transcript.standardizedTests.act)) ? (
        <Card
          body={
            <div
              style={{
                display: `flex`,
                justifyContent: `space-around`,
                flexDirection: windowWidth > 1023 ? `row` : `column`,
              }}
            >
              {transcript.standardizedTests.sat && (
                <div>
                  {isViewingOwnProfile && (
                    <div className="standarized-edit-icon">
                      <img
                        src={EditIcon}
                        alt="edit-icon"
                        onClick={() => toggleEditStandardizedTestModal(`SAT`)}
                      />
                    </div>
                  )}
                  <div className="standarized-chart-title">
                    {transcript.standardizedTests.sat.date
                      ? moment(transcript.standardizedTests.sat.date).format(
                          `MM.YYYY`,
                        )
                      : null}
                  </div>
                  <div className="standarized-chart-label-container">
                    <div style={{ position: `absolute` }}>
                      <div className="standarized-chart-label-title">
                        {t(`common:sat`)}
                      </div>
                      <div className="standarized-chart-label-subtitle">
                        {transcript.standardizedTests.sat.english &&
                          transcript.standardizedTests.sat.math &&
                          t(`common:composite`, {
                            score:
                              transcript.standardizedTests.sat.english +
                              transcript.standardizedTests.sat.math,
                          })}
                      </div>
                    </div>
                    {transcript.standardizedTests.sat.math &&
                      renderSublabel(
                        `right`,
                        t(`profile.student.transcriptScreen.math`),
                        t(`common:score`, {
                          score: transcript.standardizedTests.sat.math,
                        }),
                      )}
                    <canvas
                      id="standarizedChart1"
                      width="280"
                      height="280"
                      className="standarized-chart"
                      style={{ position: `relative` }}
                    />
                    {transcript.standardizedTests.sat.english &&
                      renderSublabel(
                        `left`,
                        t(`profile.student.transcriptScreen.reading`),
                        t(`common:score`, {
                          score: transcript.standardizedTests.sat.english,
                        }),
                      )}
                  </div>
                  {(transcript.standardizedTests.sat.writing !== null ||
                    transcript.standardizedTests.sat.reading !== null ||
                    transcript.standardizedTests.sat.science !== null) && (
                    <div
                      style={{
                        borderTop: `1px solid #000`,
                        width: 80,
                        margin: `auto`,
                        marginTop: windowWidth > 1023 ? 39 : 24,
                        marginBottom: windowWidth > 1023 ? 0 : 24,
                        textAlign: `center`,
                      }}
                    >
                      <div
                        className="standarized-chart-sublabel-title"
                        style={{ marginTop: 10 }}
                      >
                        {t(`profile.student.transcriptScreen.writing`)}
                      </div>
                      <div className="standarized-chart-sublabel-subtitle">
                        {transcript.standardizedTests.sat.reading ?? `-`}/
                        {transcript.standardizedTests.sat.science ?? `-`}/
                        {transcript.standardizedTests.sat.writing ?? `-`}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {transcript.standardizedTests.act && (
                <div>
                  {isViewingOwnProfile && (
                    <div className="standarized-edit-icon">
                      <img
                        src={EditIcon}
                        alt="edit-icon"
                        onClick={() => toggleEditStandardizedTestModal(`ACT`)}
                      />
                    </div>
                  )}
                  <div className="standarized-chart-title">
                    {transcript.standardizedTests.act.date
                      ? moment(transcript.standardizedTests.act.date).format(
                          `MM.YYYY`,
                        )
                      : null}
                  </div>
                  <div className="standarized-chart-label-container">
                    <div style={{ position: `absolute` }}>
                      <div className="standarized-chart-label-title">
                        {t(`common:act`)}
                      </div>
                      <div className="standarized-chart-label-subtitle">
                        {transcript.standardizedTests.act.composite
                          ? t(`common:score`, {
                              score: transcript.standardizedTests.act.composite,
                            })
                          : t(`common:score`, { score: 0 })}
                      </div>
                    </div>
                    {transcript.standardizedTests.act.english &&
                      renderSublabel(
                        `top-left`,
                        t(`profile.student.transcriptScreen.english`),
                        t(`common:score`, {
                          score: transcript.standardizedTests.act.english,
                        }),
                      )}
                    <canvas
                      id="standarizedChart2"
                      width="280"
                      height="280"
                      className="standarized-chart"
                      style={{ position: `relative`, right: 8 }}
                    />
                    {transcript.standardizedTests.act.math &&
                      renderSublabel(
                        `top-right`,
                        t(`profile.student.transcriptScreen.math`),
                        t(`common:score`, {
                          score: transcript.standardizedTests.act.math,
                        }),
                      )}
                  </div>
                  <div
                    style={{
                      display: `flex`,
                      justifyContent: `space-between`,
                    }}
                  >
                    {transcript.standardizedTests.act.reading &&
                      renderSublabel(
                        `bottom-left`,
                        t(`profile.student.transcriptScreen.reading`),
                        t(`common:score`, {
                          score: transcript.standardizedTests.act.reading,
                        }),
                      )}
                    {transcript.standardizedTests.act.science &&
                      renderSublabel(
                        `bottom-right`,
                        t(`profile.student.transcriptScreen.science`),
                        t(`common:score`, {
                          score: transcript.standardizedTests.act.science,
                        }),
                      )}
                  </div>
                  {transcript.standardizedTests.act.writing && (
                    <div
                      style={{
                        borderTop: `1px solid #000`,
                        width: 70,
                        margin: `auto`,
                        textAlign: `center`,
                      }}
                    >
                      <div
                        className="standarized-chart-sublabel-title"
                        style={{ marginTop: 10 }}
                      >
                        {t(`profile.student.transcriptScreen.writing`)}
                      </div>
                      <div className="standarized-chart-sublabel-subtitle">
                        {transcript.standardizedTests.act.writing}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          }
          hideEditIcon={true}
        />
      ) : (
        <EmptyExperience
          title={t(`profile.student.transcriptScreen.standardizedTests`)}
          toggleModal={() =>
            dispatch(actions.toggleStandardizedTestModal(true))
          }
        />
      )}

      <StandarizedTestsModal
        isOpen={
          isStandardizedTestModalOpen &&
          !isEditStandardizedTestModalOpen &&
          !isSecondStepModalVisible
        }
        toggle={() => dispatch(actions.toggleStandardizedTestModal(false))}
        date={date}
        setDate={setDate}
        data={transcript?.standardizedTests}
        toggleAddScore={() => {
          dispatch(actions.toggleStandardizedTestModal(true))
          setSecondStepModalVisible(true)
        }}
      />

      {(!!isEditStandardizedTestModalOpen.length ||
        isSecondStepModalVisible) && (
        <AddYourSatScoreModal
          isOpen={
            !!isEditStandardizedTestModalOpen.length || isSecondStepModalVisible
          }
          toggle={() => {
            dispatch(actions.toggleStandardizedTestModal(false))
            toggleEditStandardizedTestModal(``)
            setSecondStepModalVisible(false)
            document.body.className = ``
          }}
          isEditModal={isEditStandardizedTestModalOpen}
        />
      )}
    </div>
  )
}

const renderSublabel = (
  variant:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "right"
    | "left",
  title: string,
  subtitle: string,
) => (
  <div
    style={{
      position: `relative`,
      textAlign:
        variant === `top-left` ||
        variant === `bottom-left` ||
        variant === `left`
          ? `left`
          : `right`,
      top:
        variant === `top-left` ||
        variant === `top-right` ||
        variant === `bottom-left` ||
        variant === `bottom-right`
          ? `-65px`
          : `0`,
    }}
  >
    <div className="standarized-chart-sublabel-title">{title}</div>
    <div className="standarized-chart-sublabel-subtitle">{subtitle}</div>
  </div>
)
