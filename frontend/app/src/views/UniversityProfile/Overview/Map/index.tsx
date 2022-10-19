//Utils
import classNames from "classnames"
//Components
import { MDBCard, MDBCardBody } from "mdbreact"
import * as React from "react"

//Types
import { Location } from "../../../../store/types"
//Styles
import Styles from "./index.module.scss"

interface MapProps {
  name: string | undefined
  location: Location | null | undefined
}

const Map: React.VFC<MapProps> = ({ name, location }) => {
  if (!name || !location) {
    return null
  }

  return (
    <MDBCard
      className={classNames(Styles.container, `h-100 p-0 overflow-hidden`)}
    >
      <MDBCardBody>
        <a
          href={`https://google.com/maps/search/?api=1&query=${name}&ll=${location.lat},${location.lng}`}
          target={`_blank`}
        >
          <img
            className={Styles.image}
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
              `${location.street},${location.city},${location.stateCode}`,
            )}&markers=color:0xc91c0d%7C${location.lat},${
              location.lng
            }&zoom=14&size=500x500&scale=2&key=${
              process.env.REACT_APP_GOOGLE_MAPS_API_KEY
            }`}
            alt=""
          />
        </a>
      </MDBCardBody>
    </MDBCard>
  )
}

export default Map
