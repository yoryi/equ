import * as mui from "@material-ui/core"
import classNames from "classnames"
import * as React from "react"
import { useSelector } from "react-redux"

import { INTERESTS_COLOR } from "../../const/interests"
import {
  DreamSchoolNotification,
  FollowNotification,
  FollowRequestNotification,
  Profile,
  ReduxState,
  Reference,
  Role,
  StudentNotificationSender,
  StudentProfile,
  UnfollowRequestNotification,
  University,
  UniversityProfile,
} from "../../store/types"
import getAvatar from "../../utils/getAvatar"
import { nameAbbreviation } from "../../utils/nameAbbreviation"
import Styles from "./index.module.scss"

interface ProfilePhotoProps {
  profile: Profile
  student?: undefined
  university?: undefined
  notification?: undefined
  reference?: undefined
  loading?: undefined
}

interface StudentProfilePhotoProps {
  profile?: undefined
  student: StudentProfile
  university?: undefined
  notification?: undefined
  reference?: undefined
  loading?: undefined
}

interface UniversityProfilePhotoProps {
  profile?: undefined
  student?: undefined
  university: University | UniversityProfile
  notification?: undefined
  reference?: undefined
  loading?: undefined
}

interface NotificationProfilePhotoProps {
  profile?: undefined
  student?: undefined
  university?: undefined
  notification:
    | FollowRequestNotification
    | FollowNotification
    | UnfollowRequestNotification
    | DreamSchoolNotification
  reference?: undefined
  loading?: undefined
}

interface ReferenceProfilePhotoProps {
  profile?: undefined
  student?: undefined
  university?: undefined
  notification?: undefined
  reference: Reference
  loading?: undefined
}

interface LoadingProfilePhotoProps {
  profile?: undefined
  student?: undefined
  university?: undefined
  notification?: undefined
  reference?: undefined
  loading: true
}

const ProfilePhoto: React.FC<
  | ProfilePhotoProps
  | StudentProfilePhotoProps
  | UniversityProfilePhotoProps
  | NotificationProfilePhotoProps
  | ReferenceProfilePhotoProps
  | LoadingProfilePhotoProps
> = ({
  profile,
  student,
  university,
  notification,
  reference,
  loading = false,
}) => {
  const mediaToken = useSelector<ReduxState, string | null>(
    (state) => state.media.mediaToken,
  )

  let avatar: string | null
  if (
    (notification?.sender.role === Role.Student &&
      notification.sender.extraData.avatar) ||
    profile?.avatar?.path ||
    student?.avatar.path ||
    reference?.media?.path
  ) {
    avatar = `media/${
      notification?.sender.extraData.avatar ??
      profile?.avatar?.path ??
      student?.avatar?.path ??
      reference?.media?.path
    }?eqmt=${mediaToken}`
  } else {
    avatar = university?.avatar ?? notification?.sender.extraData.avatar ?? null
  }

  const interests =
    profile?.interests ??
    student?.interests ??
    notification?.sender.extraData.interests ??
    null

  const radius = 100 / (2 * Math.PI)
  const diameter = radius * 2

  if (loading) {
    return (
      <mui.Skeleton
        variant="circular"
        width={64}
        height={64}
        className={`rounded-circle`}
      />
    )
  }

  return (
    <div className={Styles.container}>
      {avatar && (
        <img
          className={classNames({ [Styles.border]: !!interests })}
          src={`${process.env.REACT_APP_API_URL}/${avatar}`}
          alt={``}
        />
      )}

      {(profile || student || notification?.sender.role === Role.Student) &&
        !avatar && (
          <img
            className={classNames({ [Styles.border]: !!interests })}
            src={getAvatar(
              profile?.privateAvatar ??
                student?.privateAvatar ??
                (notification?.sender as StudentNotificationSender | undefined)
                  ?.extraData.privateAvatar ??
                1,
            )}
            alt={``}
          />
        )}

      {!profile &&
        !student &&
        notification?.sender.role !== Role.Student &&
        !avatar && (
          <span className={Styles.initials}>
            {nameAbbreviation(
              university?.name ??
                notification?.sender.extraData.name ??
                `${reference?.firstName} ${reference?.lastName}`,
              !!university || notification?.sender.role === Role.University,
            )}
          </span>
        )}

      {interests && (
        <svg className={Styles.ring} viewBox={`0 0 33 33`}>
          {interests.map((interest, i) => (
            <g
              key={`ringColor-${interest}`}
              fill={`none`}
              strokeWidth={1}
              transform={`rotate(${(i / interests.length) * 360} 16.5 16.5)`}
            >
              <path
                d={`M16.5 ${
                  (33 - diameter) / 2
                } a ${radius} ${radius} 0 0 1 0 ${diameter} a ${radius} ${radius} 0 0 1 0 ${
                  diameter * -1
                }`}
                stroke={INTERESTS_COLOR[interest]}
                strokeLinecap={`round`}
                strokeDasharray={`${(1 / interests.length) * 100}, 100`}
              />
            </g>
          ))}
        </svg>
      )}
    </div>
  )
}

export default ProfilePhoto
