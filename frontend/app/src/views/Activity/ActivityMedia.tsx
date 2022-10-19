//Utils
import cx from "classnames"
import * as React from "react"
//Hooks
import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux"

//Actions
import * as actions from "../../store/actions"
//Types
import { ReduxState } from "../../store/types"
//Styles
import Styles from "./ActivityMedia.module.scss"

interface GetMedia {
  path: string
  className?: string
  publicMedia?: boolean
}

export const ActivityMedia: React.FC<GetMedia> = ({
  path,
  className,
  publicMedia = false,
}) => {
  const dispatch = useDispatch()
  const [mediaError, setError] = useState(``)
  const { mediaToken } = useSelector((state: ReduxState) => state.media)

  useEffect(() => {
    if (!publicMedia && mediaError === `error`) {
      dispatch(actions.refreshMediaToken())
    }
  }, [publicMedia, mediaError])

  const type = path?.split(`.`)?.[path.split(`.`).length - 1]

  return type === `mp4` ? (
    <video
      className={cx(Styles.media, className)}
      src={`${process.env.REACT_APP_API_URL}/${
        publicMedia ? `` : `media/`
      }${path}${publicMedia ? `` : `?eqmt=${mediaToken}`}`}
      onError={(e) => setError(e.type)}
      onLoad={(e) => setError(e.type)}
    />
  ) : (
    <img
      className={cx(Styles.media, className)}
      src={`${process.env.REACT_APP_API_URL}/${
        publicMedia ? `` : `media/`
      }${path}${publicMedia ? `` : `?eqmt=${mediaToken}`}`}
      onError={(e) => setError(e.type)}
      onLoad={(e) => setError(e.type)}
      alt="media"
    />
  )
}
