import * as mui from "@material-ui/core"
import Chart from "chart.js"
import classNames from "classnames"
import _ from "lodash"
import React, { useEffect,useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

import EllipseChartIcon from "../../../../assets/ellipse-chart.svg"
import Card from "../../../../components/Card/Card"
import useWindowDimensions from "../../../../hooks/UseWindowDimensions"
import { actions } from "../../../../store"
import { ProfileTranscript } from "../../../../store/types/profile"
import Styles from "./GPA.module.scss"
import { GPAModal } from "./GPAModal"

interface GPAProps {
  transcript: ProfileTranscript | null
}

export const GPA: React.FC<GPAProps> = ({ transcript }) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const { isGPAModalOpen } = useSelector((state: any) =>
    state.profile.transcript ? state.profile.transcript : false,
  )
  const dispatch = useDispatch()

  const [chart, setChart] = useState<Chart | null>(null)

  const { windowWidth } = useWindowDimensions()

  const { t } = useTranslation()

  const ellipsePoint = (value: number, index: number) => (
    <div
      key={index}
      style={{
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        top:
          windowWidth > 1023 ? (5 - value) * 52.5 - 75 : 306 - value * 67 - 39,
        zIndex: 2,
      }}
    >
      <img
        src={EllipseChartIcon}
        alt="ellipse-icon"
        style={{
          width: 40,
          height: 40,
        }}
      />
      <span className="gpa-chart-ellipse-text">{value.toFixed(1)}</span>
    </div>
  )

  useEffect(() => {
    if (chart) {
      if ((transcript?.gpas?.length ?? 0) <= 1) {
        setChart(null)
      }
      return
    }

    const ctx: any = document.getElementById(`gpaChart`)

    if (transcript?.gpas && transcript.gpas.length > 1 && ctx) {
      const context = ctx.getContext(`2d`)

      const gradient =
        windowWidth > 1023
          ? context.createLinearGradient(
              ctx.width / 2,
              0,
              ctx.width / 2,
              ctx.height,
            )
          : context.createLinearGradient(327 / 2, 0, 327 / 2, 332)
      gradient.addColorStop(0, `rgba(0, 93, 204, 0.2)`)
      gradient.addColorStop(1, `rgba(0, 93, 204, 0)`)

      setChart(
        new Chart(context, {
          type: `line`,
          data: {
            labels: transcript.gpas
              .sort((a, b) => a.year - b.year)
              .map((it) => it.year),
            datasets: [
              {
                data: transcript.gpas
                  .sort((a, b) => a.year - b.year)
                  .map((it) => it.gpa),
                backgroundColor: gradient,
                borderWidth: 2,
                borderColor: `#005DCC`,
                pointBorderWidth: 0,
                lineTension: 0,
              },
            ],
          },
          options: {
            animation: {
              duration: 0,
            },
            title: {
              display: false,
            },
            tooltips: {
              enabled: false,
            },
            elements: {
              point: {
                radius: 0,
              },
            },
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                  },
                  ticks: {
                    stepSize: 1,
                    fontColor: `#707378`,
                    fontFamily: `Ilisarniq, sans-serif`,
                    fontSize: 16,
                    padding: windowWidth > 1023 ? 20 : 10,
                    beginAtZero: true,
                    suggestedMax: 4,
                  },
                  gridLines: {
                    color: `#EAEBEB`,
                    drawTicks: false,
                    drawBorder: false,
                    zeroLineColor: `#EAEBEB`,
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                  },
                  ticks: {
                    fontColor: `#707378`,
                    fontFamily: `Ilisarniq, sans-serif`,
                    fontSize: 16,
                    padding: windowWidth > 1023 ? 5 : -5,
                  },
                  gridLines: {
                    display: false,
                    lineWidth: 0,
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
          },
        }),
      )
    }
  }, [chart, transcript?.gpas, document.getElementById(`gpaChart`)])

  useEffect(() => {
    if (!chart || !transcript?.gpas) {
      return
    }

    const ctx: any = document.getElementById(`gpaChart`)
    if (!ctx) {
      return
    }

    const context = ctx.getContext(`2d`)

    const gradient =
      windowWidth > 1023
        ? context.createLinearGradient(
            ctx.width / 2,
            0,
            ctx.width / 2,
            ctx.height,
          )
        : context.createLinearGradient(327 / 2, 0, 327 / 2, 332)
    gradient.addColorStop(0, `rgba(0, 93, 204, 0.2)`)
    gradient.addColorStop(1, `rgba(0, 93, 204, 0)`)

    chart.data.labels = _.has(transcript.gpas[0], `gpa`)
      ? transcript.gpas.sort((a, b) => a.year - b.year).map((it) => it.year)
      : transcript.gpas.sort((a, b) => a.year - b.year).map((it) => it.year)
    chart.data.datasets = [
      {
        data: _.has(transcript.gpas[0], `gpa`)
          ? transcript.gpas.sort((a, b) => a.year - b.year).map((it) => it.gpa)
          : transcript.gpas
              .sort((a, b) => a.year - b.year)
              .map((it) => it.grade),
        backgroundColor: gradient,
        borderWidth: 2,
        borderColor: `#005DCC`,
        pointBorderWidth: 0,
        lineTension: 0,
      },
    ]
    chart.update()
  }, [chart, transcript?.gpas, document.getElementById(`gpaChart`)])

  if (!transcript) {
    return <mui.Skeleton width={`100%`} height={400} />
  }

  if (!transcript?.gpas?.length && !isViewingOwnProfile) {
    return null
  }

  const mean =
    transcript && transcript.gpas && _.has(transcript.gpas[0], `gpa`)
      ? _.meanBy(transcript.gpas, ({ gpa }) => gpa).toFixed(1)
      : transcript &&
        transcript.gpas &&
        _.meanBy(transcript.gpas, ({ grade }) => grade).toFixed(1)

  return (
    <div className="student-profile-tab-item" style={{ paddingTop: 10 }}>
      {transcript?.gpas?.length && transcript?.gpas?.length > 1 ? (
        <>
          <div
            className={classNames(
              Styles.title,
              `student-profile-tab-item-title`,
            )}
          >
            {t(`profile.student.transcriptScreen.gpaAtGlance`)}
          </div>
          <Card className="gpa-modal" hideEditIcon={true}>
            {windowWidth < 1023 && (
              <div className="gpa-chart-axis">
                <div className="gpa-chart-axis-title">{t(`common:gpa`)}</div>
                <div>
                  {t(`profile.student.transcriptScreen.overall`, {
                    count: mean,
                  } as any)}
                </div>
              </div>
            )}

            <div className={Styles.ellipseContainer}>
              {_.has(transcript.gpas[0], `gpa`)
                ? transcript.gpas
                    .sort((a, b) => a.year - b.year)
                    .map(
                      (it, index) =>
                        it &&
                        (!!it.gpa || it.gpa === 0) && (
                          <div>{ellipsePoint(it.gpa, index)}</div>
                        ),
                    )
                : transcript.gpas
                    .sort((a, b) => a.year - b.year)
                    .map(
                      (it, index) =>
                        it &&
                        (!!it.grade || it.grade === 0) && (
                          <div>{ellipsePoint(it.grade, index)}</div>
                        ),
                    )}
            </div>

            <div style={{ display: `flex`, alignItems: `center` }}>
              {windowWidth > 1023 && (
                <div className="gpa-chart-axis" style={{ marginBottom: 55 }}>
                  <div>{t(`common:gpa`)}</div>
                  {t(`profile.student.transcriptScreen.overall`, {
                    count: mean,
                  } as any)}
                </div>
              )}

              <div
                style={{
                  position: `relative`,
                  marginTop: windowWidth <= 1023 ? 16 : 0,
                  width: windowWidth > 1023 ? `100%` : 327,
                  height: windowWidth > 1023 ? 304 : 332,
                }}
              >
                <canvas
                  id="gpaChart"
                  className="gpa-chart"
                  style={{ marginLeft: `0px` }}
                />
              </div>
            </div>
            {windowWidth > 1023 && (
              <div className="gpa-chart-x-axis">{t(`common:years`)}</div>
            )}
          </Card>
        </>
      ) : null}

      {isGPAModalOpen ? (
        <GPAModal
          isOpen={isGPAModalOpen}
          toggle={() => dispatch(actions.toggleGPAModal(!isGPAModalOpen))}
        />
      ) : null}
    </div>
  )
}
