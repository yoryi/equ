import Chart from "chart.js"
//Components
import { MDBCard, MDBCardBody, MDBCardText,MDBCardTitle } from "mdbreact"
import * as React from "react"
//Hooks
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { ReactComponent as Edit } from "../../../../assets/edit.svg"
import { Color } from "../../../../const/colors"
//Types
import { ReduxState, Role } from "../../../../store/types"
//Styles
import Styles from "./index.module.scss"

Chart.defaults.doughnut.cutoutPercentage = 85
Chart.defaults.RoundedDoughnut = Chart.helpers.clone(Chart.defaults.doughnut)
Chart.controllers.RoundedDoughnut = Chart.controllers.doughnut.extend({
  draw: function (ease: any) {
    const ctx = this.chart.ctx
    const easingDecimal = ease || 1
    const arcs = this.getMeta().data
    Chart.helpers.each(arcs, function (arc: any, i: number) {
      arc.transition(easingDecimal).draw()

      const pArc = arcs[i === 0 ? arcs.length - 1 : i - 1]
      const pColor = pArc._view.backgroundColor

      const vm = arc._view
      const radius = (vm.outerRadius + vm.innerRadius) / 2
      const thickness = (vm.outerRadius - vm.innerRadius) / 2
      const startAngle = Math.PI - vm.startAngle - Math.PI / 2
      const angle = Math.PI - vm.endAngle - Math.PI / 2

      ctx.save()
      ctx.translate(vm.x, vm.y)

      ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor
      ctx.beginPath()
      ctx.arc(
        radius * Math.sin(startAngle),
        radius * Math.cos(startAngle),
        thickness,
        0,
        2 * Math.PI,
      )
      ctx.fill()

      ctx.fillStyle = vm.backgroundColor
      ctx.beginPath()
      ctx.arc(
        radius * Math.sin(angle),
        radius * Math.cos(angle),
        thickness,
        0,
        2 * Math.PI,
      )
      ctx.fill()

      ctx.restore()
    })
  },
})

interface SocioEconomicDiversityProps {
  socioEconomicDiversity: number | null | undefined
  onEdit?: () => void
}

const SocioEconomicDiversity: React.VFC<SocioEconomicDiversityProps> = ({
  socioEconomicDiversity,
  onEdit,
}) => {
  const isViewingOwnProfile = useSelector<ReduxState, boolean>(
    (state) => state.auth.user?.role === Role.University,
  )

  useEffect(() => {
    const ctx = document.getElementById(
      `socioEconomicDiversityChart`,
    ) as HTMLCanvasElement
    if (!socioEconomicDiversity || !ctx) {
      return
    }

    new Chart(ctx, {
      type: `RoundedDoughnut`,
      data: {
        datasets: [
          {
            data: [
              socioEconomicDiversity / 100,
              socioEconomicDiversity !== 100
                ? 1 - socioEconomicDiversity / 100
                : null,
            ].filter((number) => !!number),
            backgroundColor: [Color.EquediBlue, Color.EquediBlue10],
            hoverBackgroundColor: [Color.EquediBlue, Color.EquediBlue10],
            borderWidth: 0,
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
      },
    })
  }, [socioEconomicDiversity])

  const { t } = useTranslation()

  if (!socioEconomicDiversity) {
    return null
  }

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>
          {t(`profile.university.overviewScreen.socioEconomicDiversity`)}

          {isViewingOwnProfile && (
            <button
              className={
                `d-flex align-items-center bg-transparent border-0 outline-none p-0 px-1`
              }
              onClick={onEdit}
            >
              <Edit />
            </button>
          )}
        </MDBCardTitle>

        <MDBCardText>
          <div className={Styles.container}>
            <canvas id={`socioEconomicDiversityChart`} />

            <h3 className={Styles.label}>
              {Math.floor(socioEconomicDiversity ?? 0).toFixed(0)}%
            </h3>
          </div>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  )
}

export default SocioEconomicDiversity
