import * as React from "react"

//Types
import { Interest } from "../../../store/types"
//Styles
import Styles from "./Banner.module.scss"

interface BannerProps {
  interests: Interest[]
}

enum BannerColor {
  Blue = `#99BEEB`,
  Red = `#EAA49E`,
  Green = `#99DEBC`,
  Pink = `#EA9ED9`,
  Yellow = `#F7DE99`,
}

interface PartProps {
  color: BannerColor
}

const Part1: React.VFC<PartProps> = ({ color }) => (
  <div
    className={`position-absolute w-100 h-100`}
    style={{ backgroundColor: color }}
  />
)

const Part2: React.VFC<PartProps> = ({ color }) => (
  <svg
    className={Styles.part2}
    width="100%"
    height="100%"
    viewBox="0 0 810 310"
    fill="none"
  >
    <g>
      <path
        d="M42.1897 414.92C64.3041 523.932 326.666 718.539 342.783 731.595L1528.77 -39.179L1158.66 -512.11C1092.19 -492.997 909.872 -471.245 761.817 -268.456C584.859 -26.0785 607.634 -40.682 547.189 50.9202C466.384 173.377 236.87 62.7207 139.189 128.921C33.6893 200.42 17.9911 295.635 42.1897 414.92Z"
        fill={color}
      />
    </g>

    <rect width={`100%`} height={310} x={`100%`} fill={color} />
  </svg>
)

const Part3: React.VFC<PartProps> = ({ color }) => (
  <svg
    className={Styles.part3}
    width="100%"
    height="100%"
    viewBox="0 0 1045 310"
    fill="none"
  >
    <g>
      <path
        d="M891.615 -581.563C852.017 -685.508 561.428 -834.718 543.397 -844.971L-501 108.916L-58.7044 515.148C3.75671 485.45 130.502 502.222 243.5 278C378.557 10.0068 495.5 160 613.5 69.0001C729.68 -20.596 895.424 -162.755 981 -244C1073.43 -331.749 934.944 -467.822 891.615 -581.563Z"
        fill={color}
      />
    </g>

    <rect width={`100%`} height={310} x={`-100%`} fill={color} />
  </svg>
)

const Part4: React.VFC<PartProps> = ({ color }) => (
  <svg
    className={Styles.part4}
    width="100%"
    height="100%"
    viewBox="0 0 932 310"
    fill="none"
  >
    <g>
      <path
        d="M871.614 -781.563C832.017 -885.508 541.428 -1034.72 523.397 -1044.97L-521 -91.0844L-78.7045 315.149C-16.2435 285.45 160.083 234.254 273.081 10.0326C408.138 -257.961 388.049 -239.838 432.745 -340.072C492.495 -474.069 736.984 -402.327 822.56 -483.573C914.986 -571.322 914.944 -667.822 871.614 -781.563Z"
        fill={color}
      />
    </g>

    <rect width={`100%`} height={310} x={`-107%`} fill={color} />
  </svg>
)

const Part5: React.VFC<PartProps> = ({ color }) => (
  <svg
    className={Styles.part5}
    width="100%"
    height="100%"
    viewBox="0 0 290 310"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M522.462 -72.7512C324.461 -31.8136 351.962 150.249 223.461 192.249C-264.257 351.658 235.448 527.671 1129.95 568.187L1104.45 -31.8131C1039.28 -54.9798 768.347 -123.589 522.462 -72.7512Z"
        fill={color}
      />
    </g>
  </svg>
)

const order: { [interest: number]: number } = {
  [Interest.Academic]: 1,
  [Interest.Extracurricular]: 2,
  [Interest.Service]: 3,
  [Interest.Professional]: 4,
  [Interest.Recognition]: 5,
}

const colors: { [interest: number]: BannerColor } = {
  [Interest.Academic]: BannerColor.Blue,
  [Interest.Extracurricular]: BannerColor.Red,
  [Interest.Professional]: BannerColor.Green,
  [Interest.Service]: BannerColor.Pink,
  [Interest.Recognition]: BannerColor.Yellow,
}

export const Banner: React.FC<BannerProps> = ({ interests }) => {
  const parts = [
    (color: BannerColor) => <Part1 key={1} color={color} />,
    (color: BannerColor) => <Part2 key={2} color={color} />,
    (color: BannerColor) => <Part3 key={5} color={color} />,
    (color: BannerColor) => <Part4 key={3} color={color} />,
    (color: BannerColor) => <Part5 key={4} color={color} />,
  ]

  return (
    <div className={`position-relative w-100 h-100 overflow-hidden`}>
      {interests
        .sort((a, b) => order[a] - order[b])
        .map((interest, i) => parts[i](colors[interest]))}
    </div>
  )
}
