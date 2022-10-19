import * as mui from "@material-ui/core"
import classNames from "classnames"
import {
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBPopover,
  MDBPopoverBody,
} from "mdbreact"
import * as React from "react"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom"

import AcademicProfileIcon from "../../assets/academic-profile.svg"
import ActivismIcon from "../../assets/activism-icon.svg"
import ActivismProfileIcon from "../../assets/activism-profile.svg"
import { ReactComponent as Camera } from "../../assets/camera.svg"
import CloseIcon from "../../assets/close-icon.svg"
import EllipseIcon from "../../assets/ellipse-big.svg"
import ExtracurricularIcon from "../../assets/extracurricular-icon.svg"
import ExtracurricularProfileIcon from "../../assets/extracurricular-profile.svg"
import { ReactComponent as Lock } from "../../assets/lock.svg"
import ProfessionalIcon from "../../assets/professional-icon.svg"
import ProfessionalProfileIcon from "../../assets/professional-profile.svg"
import RecognitionIcon from "../../assets/recognition-icon.svg"
import RecognitionProfileIcon from "../../assets/recognition-profile.svg"
import TranscriptIcon from "../../assets/transcript-icon.svg"
import Badge from "../../components/Badge"
import Button from "../../components/Button/Button"
import CropImageModal, {
  CropImageModalRef,
} from "../../components/CropImageModal"
import FollowConfirmationModal from "../../components/FollowConfirmationModal"
import fileLimits from "../../const/fileLimits"
import { MATCH_LEVELS } from "../../const/matchLevels"
import useLoader from "../../hooks/useLoader"
import useWindowDimensions from "../../hooks/UseWindowDimensions"
import * as actions from "../../store/actions"
import {
  CompletionStatus,
  CroppedImage,
  FollowRequestStatus,
  Interest,
  Profile,
  ReduxState,
  Role,
} from "../../store/types"
import getAvatar from "../../utils/getAvatar"
import { formatMatchingScoreLabel } from "../../utils/matchingScore"
import { Banner } from "./Banner/Banner"
import BuildYourProfile from "./BuildYourProfile/BuildYourProfile"
import { Extracurricular } from "./Extracurricular/Extracurricular"
import MissionStatement, {
  MissionStatementTypes,
} from "./MissionStatement/MissionStatement"
import { Professional } from "./Professional/Professional"
import { Recognition } from "./Recognition/Recognition"
import { Service } from "./Service/Service"
import Styles from "./StudentProfile.module.scss"
import { Transcript } from "./Transcript/Transcript"

const MOBILE_HEADER_HEIGHT = 80

const StudentProfile = () => {
  const params = useParams<{ id?: string }>()
  const id = params.id ? parseInt(params.id) : null

  const isTokenLoaded = useSelector<ReduxState, boolean>(
    (state) => state.auth.isTokenLoaded,
  )
  const { user } = useSelector((state: ReduxState) => state.auth)
  const isProfileLoaded = useSelector<ReduxState, boolean>((state) =>
    id ? state.student.isProfileLoaded : state.profile.isProfileLoaded,
  )
  const profile = useSelector<ReduxState, Profile | null>((state) =>
    id ? state.student.profile : state.profile.profile,
  )

  const mediaToken = useSelector<ReduxState, string | null>(
    (state) => state.media.mediaToken,
  )

  const dispatch = useDispatch()

  const [navClass, setNavClass] = useState(`student-profile-nav-container`)
  const [tabClass, setTabClass] = useState(`student-profile-tab-container`)

  const [isAvatarPopoverVisible, setAvatarPopoverVisible] = useState(false)
  const [isAvatarUpdating, setAvatarUpdating] = useState(false)
  const [isCoverPopoverVisible, setCoverPopoverVisible] = useState(false)
  const [_isCoverUpdating, setCoverUpdating] = useState(false)

  const [isDeleteModalVisible, setDeleteModalVisible] = useState<
    "avatar" | "cover" | null
  >(null)
  const [isFollowConfirmationModalVisible, setFollowConfirmationModalVisible] =
    useState(false)

  const profileViewRef = useRef<HTMLDivElement>(null)
  const profilePhotoDropdownRef = useRef<HTMLDivElement>(null)
  const coverPhotoDropdownRef = useRef<HTMLDivElement>(null)
  const cropImageRef = useRef<CropImageModalRef>(null)

  const { onLoadComplete } = useLoader()

  const isTranscriptTabVisible =
    !id || profile?.interests?.indexOf(Interest.Academic) !== -1
  const isExtracurricularsTabVisible =
    !id || profile?.interests?.indexOf(Interest.Extracurricular) !== -1
  const isProfessionalTabVisible =
    !id || profile?.interests?.indexOf(Interest.Professional) !== -1
  const isServiceTabVisible =
    !id || profile?.interests?.indexOf(Interest.Service) !== -1
  const isRecognitionTabVisible =
    !id || profile?.interests?.indexOf(Interest.Recognition) !== -1

  const firstTabInOrder = profile?.uiSettings
    ? profile?.uiSettings.tabOrder[0]
    : undefined

  const redirectRoute =
    Object.entries({
      [id ? `/student/${id}` : `/`]: isTranscriptTabVisible,
      [id ? `/student/${id}/transcript` : `/transcript`]:
        isTranscriptTabVisible,
      [id ? `/student/${id}/extracurriculars` : `/extracurriculars`]:
        isExtracurricularsTabVisible,
      [id ? `/student/${id}/professional` : `/professional`]:
        isProfessionalTabVisible,
      [id ? `/student/${id}/service` : `/service`]: isServiceTabVisible,
      [id ? `/student/${id}/recognition` : `/recognition`]:
        isRecognitionTabVisible,
    }).find(([, canRedirect]) => canRedirect)?.[0] ??
    (id ? `/student/${id}` : `/`)

  useEffect(() => {
    if (!isTokenLoaded || !id) {
      return
    }

    dispatch(actions.getStudentProfile(id))
  }, [isTokenLoaded, id])

  useEffect(() => {
    if (!isProfileLoaded) {
      return
    }

    onLoadComplete()
  }, [isProfileLoaded, onLoadComplete])

  const { windowWidth } = useWindowDimensions()

  const { t } = useTranslation()

  const handleAvatarUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.files?.[0]
    if (!avatar) {
      return
    }

    if (avatar.size > fileLimits.profilePhoto) {
      toast.error(t(`errors:fileIsTooBig`, { limit: fileLimits.profilePhoto }))
      setAvatarPopoverVisible(false)
      return
    }

    cropImageRef.current?.load(avatar)
  }

  const handleAvatarUpload = async ({ blob, filename }: CroppedImage) => {
    setAvatarUpdating(true)
    try {
      await dispatch(actions.updateStudentAvatar({ blob, filename }))
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
    setAvatarUpdating(false)
    setAvatarPopoverVisible(false)
  }

  const handleAvatarDelete = async () => {
    setAvatarUpdating(true)
    try {
      await dispatch(actions.deleteStudentAvatar())
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
    setAvatarUpdating(false)
    setAvatarPopoverVisible(false)
    setDeleteModalVisible(null)
  }

  const handleCoverUpdate = async (e: ChangeEvent<HTMLInputElement>) => {
    const cover = e.target.files?.[0]
    if (!cover) {
      return
    }

    if (cover.size > fileLimits.coverPhoto) {
      toast.error(t(`errors:fileIsTooBig`, { limit: fileLimits.coverPhoto }))
      setCoverPopoverVisible(false)
      return
    }

    setCoverUpdating(true)
    try {
      await dispatch(actions.updateStudentCover(cover))
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
    setCoverUpdating(false)
    setCoverPopoverVisible(false)
  }

  const handleCoverDelete = async () => {
    setCoverUpdating(true)
    try {
      await dispatch(actions.deleteStudentCover())
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
    setCoverUpdating(false)
    setCoverPopoverVisible(false)
    setDeleteModalVisible(null)
  }

  const handleNavLinkClick = () =>
    window.scrollTo(0, (profileViewRef.current?.clientHeight ?? 0) + 43)

  useEffect(() => {
    window.addEventListener(`scroll`, () => {
      const missionStatement = document.getElementById(`mission-statement`)
      const missionStatementRect =
        missionStatement && missionStatement.getBoundingClientRect()
      const secondFixedHeader = document.getElementById(`student-profile-nav`)
      const rect2 =
        secondFixedHeader && secondFixedHeader.getBoundingClientRect()
      const firstFixedHeader = document.getElementById(`fixed-header`)
      const rect1 = firstFixedHeader && firstFixedHeader.getBoundingClientRect()
      if (windowWidth > 1023) {
        if (
          missionStatementRect &&
          rect2 &&
          rect1 &&
          missionStatementRect?.bottom - rect1.height + 40 > 0
        ) {
          setNavClass(`student-profile-nav-container`)
          setTabClass(`student-profile-tab-container`)
        } else if (
          missionStatementRect &&
          rect2 &&
          rect1 &&
          missionStatementRect?.bottom - rect1.height + 40 <= 0
        ) {
          setNavClass(`student-profile-nav-container fixed`)
          setTabClass(`student-profile-tab-container fixed`)
        }
      } else {
        if (
          missionStatementRect &&
          rect2 &&
          missionStatementRect?.bottom - MOBILE_HEADER_HEIGHT > 40
        ) {
          setNavClass(`student-profile-nav-container`)
          setTabClass(`student-profile-tab-container`)
        } else if (
          missionStatementRect &&
          rect2 &&
          missionStatementRect?.bottom - MOBILE_HEADER_HEIGHT <= 40
        ) {
          setNavClass(`student-profile-nav-container fixed`)
          setTabClass(`student-profile-tab-container fixed`)
        }
      }
    })
  }, [])

  const handleDocumentClick = useCallback((e: MouseEvent) => {
    if (!profilePhotoDropdownRef.current?.contains(e.target as Node)) {
      setAvatarPopoverVisible(false)
    }

    if (!coverPhotoDropdownRef.current?.contains(e.target as Node)) {
      setCoverPopoverVisible(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener(`click`, handleDocumentClick)

    return () => document.removeEventListener(`click`, handleDocumentClick)
  }, [handleDocumentClick])

  if (id && isProfileLoaded && !profile) {
    return (
      <div
        className={`flex-grow-1 d-flex flex-column justify-content-center align-items-center`}
      >
        <h1 className={`mb-5`}>{t(`common:thisPageIsPrivate`)}</h1>

        <Lock width={45} height={60} />

        <Button className={`mt-5`} to={`/`}>
          {t(`common:goBack`)}
        </Button>
      </div>
    )
  }

  const matchLevel = profile?.score
    ? MATCH_LEVELS.find(
        ({ min, max }) => profile.score! >= min && profile.score! < max,
      )
    : undefined

  let followRequestState:
    | "notFollowed"
    | "followPending"
    | "followDeclined" = `notFollowed`
  if (
    !profile?.isFollowed &&
    profile?.followRequestStatus === FollowRequestStatus.Pending
  ) {
    followRequestState = `followPending`
  } else if (
    !profile?.isFollowed &&
    profile?.followRequestStatus === FollowRequestStatus.Declined
  ) {
    followRequestState = `followDeclined`
  }

  const getOrderedTabs = () => {
    return profile && profile.uiSettings ? (
      profile.uiSettings.tabOrder.map((tab: number) => {
        if (tab === 1) {
          return (
            isTranscriptTabVisible && (
              <NavLink
                to={
                  profile.uiSettings.tabOrder[0] === 1
                    ? id
                      ? `/student/${id}`
                      : `/`
                    : id
                    ? `/student/${id}/transcript`
                    : `/transcript`
                }
                className={`student-profile-nav-item transcript`}
                activeClassName={`student-profile-nav-item-active`}
                onClick={handleNavLinkClick}
                exact
              >
                <img src={TranscriptIcon} alt={`Transcript`} />
                {t(`common:navigation.transcript`)}
              </NavLink>
            )
          )
        } else if (tab === 2) {
          return (
            isExtracurricularsTabVisible && (
              <NavLink
                to={
                  profile.uiSettings.tabOrder[0] === 2
                    ? id
                      ? `/student/${id}`
                      : `/`
                    : id
                    ? `/student/${id}/extracurriculars`
                    : `/extracurriculars`
                }
                className={`student-profile-nav-item extracurricular`}
                activeClassName={`student-profile-nav-item-active`}
                onClick={handleNavLinkClick}
                exact
              >
                <img src={ExtracurricularIcon} alt={`Extracurriculars`} />
                {t(`common:navigation.extracurriculars`)}
              </NavLink>
            )
          )
        } else if (tab === 3) {
          return (
            isProfessionalTabVisible && (
              <NavLink
                to={
                  profile.uiSettings.tabOrder[0] === 3
                    ? id
                      ? `/student/${id}`
                      : `/`
                    : id
                    ? `/student/${id}/professional`
                    : `/professional`
                }
                className={`student-profile-nav-item professional`}
                activeClassName={`student-profile-nav-item-active`}
                onClick={handleNavLinkClick}
                exact
              >
                <img src={ProfessionalIcon} alt={`Professional`} />
                {t(`common:navigation.professional`)}
              </NavLink>
            )
          )
        } else if (tab === 4) {
          return (
            isServiceTabVisible && (
              <NavLink
                to={
                  profile.uiSettings.tabOrder[0] === 4
                    ? id
                      ? `/student/${id}`
                      : `/`
                    : id
                    ? `/student/${id}/service`
                    : `/service`
                }
                className={`student-profile-nav-item activism`}
                activeClassName={`student-profile-nav-item-active`}
                onClick={handleNavLinkClick}
                exact
              >
                <img src={ActivismIcon} alt={`Service`} />
                {t(`common:navigation.service`)}
              </NavLink>
            )
          )
        } else if (tab === 5) {
          return (
            isRecognitionTabVisible && (
              <NavLink
                to={
                  profile.uiSettings.tabOrder[0] === 5
                    ? id
                      ? `/student/${id}`
                      : `/`
                    : id
                    ? `/student/${id}/recognition`
                    : `/recognition`
                }
                className={`student-profile-nav-item recognition`}
                activeClassName={`student-profile-nav-item-active`}
                onClick={handleNavLinkClick}
                exact
              >
                <img src={RecognitionIcon} alt={`Recognition`} />
                {t(`common:navigation.recognition`)}
              </NavLink>
            )
          )
        } else {
          return (
            isTranscriptTabVisible && (
              <NavLink
                to={
                  profile.uiSettings.tabOrder[0] === 1
                    ? id
                      ? `/student/${id}`
                      : `/`
                    : id
                    ? `/student/${id}/transcript`
                    : `/transcript`
                }
                className={`student-profile-nav-item transcript`}
                activeClassName={`student-profile-nav-item-active`}
                onClick={handleNavLinkClick}
                exact
              >
                <img src={TranscriptIcon} alt={`Transcript`} />
                {t(`common:navigation.transcript`)}
              </NavLink>
            )
          )
        }
      })
    ) : (
      <>
        {isTranscriptTabVisible && (
          <NavLink
            to={id ? `/student/${id}` : `/`}
            className={`student-profile-nav-item transcript`}
            activeClassName={`student-profile-nav-item-active`}
            onClick={handleNavLinkClick}
            exact
          >
            <img src={TranscriptIcon} alt={`Transcript`} />
            {t(`common:navigation.transcript`)}
          </NavLink>
        )}
        {isExtracurricularsTabVisible && (
          <NavLink
            to={id ? `/student/${id}/extracurriculars` : `/extracurriculars`}
            className={`student-profile-nav-item extracurricular`}
            activeClassName={`student-profile-nav-item-active`}
            onClick={handleNavLinkClick}
          >
            <img src={ExtracurricularIcon} alt={`Extracurriculars`} />
            {t(`common:navigation.extracurriculars`)}
          </NavLink>
        )}
        {isProfessionalTabVisible && (
          <NavLink
            to={id ? `/student/${id}/professional` : `/professional`}
            className={`student-profile-nav-item professional`}
            activeClassName={`student-profile-nav-item-active`}
            onClick={handleNavLinkClick}
          >
            <img src={ProfessionalIcon} alt={`Professional`} />
            {t(`common:navigation.professional`)}
          </NavLink>
        )}
        {isServiceTabVisible && (
          <NavLink
            to={id ? `/student/${id}/service` : `/service`}
            className={`student-profile-nav-item activism`}
            activeClassName={`student-profile-nav-item-active`}
            onClick={handleNavLinkClick}
          >
            <img src={ActivismIcon} alt={`Service`} />
            {t(`common:navigation.service`)}
          </NavLink>
        )}
        {isRecognitionTabVisible && (
          <NavLink
            to={id ? `/student/${id}/recognition` : `/recognition`}
            className={`student-profile-nav-item recognition`}
            activeClassName={`student-profile-nav-item-active`}
            onClick={handleNavLinkClick}
          >
            <img src={RecognitionIcon} alt={`Recognition`} />
            {t(`common:navigation.recognition`)}
          </NavLink>
        )}
      </>
    )
  }

  return (
    <>
      <div className="student-profile">
        <div ref={profileViewRef}>
          <div className={`position-relative`}>
            {profile?.cover?.path && (
              <img
                className="student-profile-cover-img"
                src={`${process.env.REACT_APP_API_URL}/media/${profile?.cover.path}?eqmt=${mediaToken}`}
                alt="cover-img"
              />
            )}
            {profile && !profile.cover?.path && (
              <div className={`position-relative student-profile-cover-banner`}>
                {profile.interests?.length ? (
                  <Banner interests={profile.interests} />
                ) : (
                  <div
                    className={`w-100 h-100`}
                    style={{ background: `#eee` }}
                  />
                )}
              </div>
            )}

            {!id && (
              <div
                className={classNames(
                  Styles.bannerContainer,
                  `position-absolute d-flex align-items-center bg-transparent border-0 p-0`,
                )}
              >
                <div ref={coverPhotoDropdownRef} className={Styles.banner}>
                  <MDBPopover
                    className={Styles.popover}
                    isVisible={isCoverPopoverVisible}
                    onChange={
                      ((visible: boolean) =>
                        setCoverPopoverVisible(visible)) as any
                    }
                    placement={`bottom`}
                    clickable
                  >
                    <div className={Styles.button}>
                      <Camera />
                    </div>

                    <MDBPopoverBody className={Styles.body}>
                      <div className={`text-center`}>
                        {t(
                          `common:${
                            profile?.cover ? `changeBanner` : `uploadPhoto`
                          }`,
                        )}

                        <input
                          className={Styles.input}
                          type={`file`}
                          accept={`image/png, image/jpeg`}
                          onChange={handleCoverUpdate}
                        />
                      </div>

                      {profile?.cover && (
                        <button
                          className={Styles.destructive}
                          onClick={() => setDeleteModalVisible(`cover`)}
                        >
                          {t(`common:removeBanner`)}
                        </button>
                      )}
                    </MDBPopoverBody>
                  </MDBPopover>
                </div>
              </div>
            )}
          </div>

          {!profile && <mui.Skeleton width={`100%`} height={310} />}

          <div className="student-profile-ellipse-container">
            <img
              className="student-profile-ellipse-img"
              src={EllipseIcon}
              alt="ellipse-icon"
            />
            <div className="student-profile-ellipse-avatar">
              {profile && (
                <img
                  className={`position-absolute w-100 h-100 m-0`}
                  style={{ top: 0, left: 0 }}
                  src={
                    profile.avatar?.path
                      ? `${process.env.REACT_APP_API_URL}/media/${profile.avatar.path}?eqmt=${mediaToken}`
                      : getAvatar(profile.privateAvatar!)
                  }
                  alt=""
                />
              )}

              {profile && (
                <div
                  style={{
                    display: `flex`,
                    justifyContent: `center`,
                    alignItems: `flex-end`,
                  }}
                >
                  {profile?.interests?.length
                    ? profile?.interests.map((interest, i) => (
                        <img
                          key={i}
                          src={getInterestIcon(interest)}
                          alt={`${interest}-icon`}
                          className={`ring-${profile.interests?.length}-${i}`}
                        />
                      ))
                    : null}
                </div>
              )}
              {!profile && (
                <div className={`w-100 h-100`}>
                  <mui.Skeleton
                    className={`position-relative`}
                    style={{ top: -4 }}
                    width={`100%`}
                    height={`100%`}
                    variant="circular"
                  />
                </div>
              )}

              {!id && (
                <div className={Styles.updateAvatar}>
                  <div ref={profilePhotoDropdownRef} className={Styles.overlay}>
                    <MDBPopover
                      className={Styles.popover}
                      isVisible={isAvatarPopoverVisible}
                      onChange={
                        ((visible: boolean) =>
                          setAvatarPopoverVisible(visible)) as any
                      }
                      placement={`bottom`}
                      clickable
                    >
                      <div className={Styles.container}>
                        {!isAvatarUpdating && (
                          <Camera className={Styles.icon} />
                        )}

                        {isAvatarUpdating && (
                          <span className={Styles.label}>
                            {t(`common:loading`)}
                          </span>
                        )}
                      </div>

                      <MDBPopoverBody className={Styles.body}>
                        <div className={`position-relative text-center`}>
                          {t(
                            `common:${
                              profile?.avatar
                                ? `changeProfilePhoto`
                                : `uploadPhoto`
                            }`,
                          )}

                          <input
                            className={Styles.input}
                            type={`file`}
                            accept={`image/png, image/jpeg`}
                            onChange={handleAvatarUpdate}
                          />
                        </div>

                        {profile?.avatar && (
                          <button
                            className={Styles.destructive}
                            onClick={() => setDeleteModalVisible(`avatar`)}
                          >
                            {t(`common:removeProfilePhoto`)}
                          </button>
                        )}
                      </MDBPopoverBody>
                    </MDBPopover>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="student-profile-title-container">
            <div className="student-profile-title">
              {profile && profile.name}
              {!profile && <mui.Skeleton width={250} />}
            </div>
            <div className="d-flex flex-column flex-sm-row align-items-center student-profile-title-subtitle">
              {profile &&
                `${profile.school?.name} • ${t(`common:classOf`, {
                  year: profile?.graduation,
                })}`}

              {!!id && (
                <span className={`mt-2 mt-sm-0`}>
                  <span
                    className={`d-none d-sm-inline-block ml-sm-1`}
                  >{` • `}</span>

                  <Badge
                    className={`mx-1`}
                    variant={matchLevel?.color ?? `gray`}
                  >
                    {profile?.score &&
                      matchLevel &&
                      formatMatchingScoreLabel(profile.score, t)}

                    {profile && !profile.score && t(`common:surveyNeeded`)}
                  </Badge>
                </span>
              )}

              {!profile && (
                <div className={`mx-n1`}>
                  {Array.from({ length: 3 }, (_, index) => (
                    <mui.Skeleton
                      key={index}
                      className={`mx-1`}
                      width={150}
                      {...(index && { style: { marginTop: `8px` } })}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {id &&
            user &&
            user.role !== Role.Admin &&
            user.role !== Role.Program &&
            profile &&
            !profile?.isFollowed && (
              <Button
                className={Styles.followButton}
                size={`xs`}
                onClick={() => setFollowConfirmationModalVisible(true)}
                variant={
                  {
                    notFollowed: `blue`,
                    followPending: `green`,
                    followDeclined: `yellow`,
                  }[followRequestState] as "blue" | "green" | "yellow"
                }
                light={profile.followRequestStatus !== undefined}
                disabled={followRequestState !== `notFollowed`}
              >
                {t(
                  `common:${
                    {
                      notFollowed: `follow`,
                      followPending: `requestPending`,
                      followDeclined: `requestDeclined`,
                    }[followRequestState]
                  }`,
                )}
              </Button>
            )}

          {!profile && !!id && (
            <mui.Skeleton
              className={classNames(Styles.followButton, `d-block`)}
              width={125}
              height={40}
            />
          )}

          {((profile && !id) || (id && profile && profile.mission)) && (
            <MissionStatement
              mission={profile.mission ?? ``}
              type={MissionStatementTypes.Student}
              readMore={true}
            />
          )}
          {!profile && (
            <mui.Skeleton
              className={`d-block mx-auto mt-5`}
              width={634}
              height={190}
            />
          )}

          {!id &&
            profile?.completion &&
            !!Object.values(profile.completion).find(
              (status) => status !== CompletionStatus.Completed,
            ) && (
              <BuildYourProfile
                handleAvatarUpdate={handleAvatarUpdate}
                handleCoverUpdate={handleCoverUpdate}
              />
            )}
        </div>
        <div className={navClass} id="student-profile-nav">
          {getOrderedTabs()}
        </div>
        <div className={tabClass}>
          <Switch>
            {isTranscriptTabVisible && (
              <Route
                path={
                  !profile?.uiSettings || firstTabInOrder === 1
                    ? [`/`, `/student/:id`]
                    : [`/transcript`, `/student/:id/transcript`]
                }
                component={Transcript}
                exact
              />
            )}

            {isExtracurricularsTabVisible && (
              <Route
                path={
                  firstTabInOrder === 2
                    ? [`/`, `/student/:id`]
                    : [`/extracurriculars`, `/student/:id/extracurriculars`]
                }
                component={Extracurricular}
                exact
              />
            )}

            {isProfessionalTabVisible && (
              <Route
                path={
                  firstTabInOrder === 3
                    ? [`/`, `/student/:id`]
                    : [`/professional`, `/student/:id/professional`]
                }
                component={Professional}
                exact
              />
            )}

            {isServiceTabVisible && (
              <Route
                path={
                  firstTabInOrder === 4
                    ? [`/`, `/student/:id`]
                    : [`/service`, `/student/:id/service`]
                }
                component={Service}
                exact
              />
            )}

            {isRecognitionTabVisible && (
              <Route
                path={
                  firstTabInOrder === 5
                    ? [`/`, `/student/:id`]
                    : [`/recognition`, `/student/:id/recognition`]
                }
                component={Recognition}
                exact
              />
            )}

            <Redirect to={redirectRoute} />
          </Switch>
        </div>
      </div>

      <CropImageModal
        ref={cropImageRef}
        type={`avatar`}
        onChange={handleAvatarUpload}
      />

      {profile && (
        <FollowConfirmationModal
          student={profile}
          visible={isFollowConfirmationModalVisible}
          onClose={() => setFollowConfirmationModalVisible(false)}
        />
      )}

      <MDBModal
        isOpen={!!isDeleteModalVisible}
        toggle={() => setDeleteModalVisible(null)}
        size={`sm`}
        inline={false}
        noClickableBodyWithoutBackdrop={false}
        overflowScroll={false}
        centered
      >
        <MDBModalHeader titleClass={`w-100 d-flex`} tag={`div`}>
          <div style={{ width: 14 }} />

          <h3 className={`flex-grow-1`}>
            {t(`common:confirmDeletionModalTitle`)}
          </h3>

          <button
            onClick={() => setDeleteModalVisible(null)}
            className={classNames(
              Styles.closeButton,
              `p-0 border-0 bg-transparent`,
            )}
          >
            <img src={CloseIcon} alt="close-icon" />
          </button>
        </MDBModalHeader>

        <MDBModalBody>
          <p className={`text-center`}>
            {t(`common:areYouSureYouWantToDelete`)}
          </p>
        </MDBModalBody>

        <MDBModalFooter>
          <Button
            size={`auto`}
            onClick={
              isDeleteModalVisible === `avatar`
                ? handleAvatarDelete
                : handleCoverDelete
            }
            removeButton
          >
            {t(`common:delete`)}
          </Button>
        </MDBModalFooter>
      </MDBModal>
    </>
  )
}

export default StudentProfile

const getInterestIcon = (id: number) => {
  switch (id) {
    case 1:
      return AcademicProfileIcon
    case 2:
      return ExtracurricularProfileIcon
    case 3:
      return ProfessionalProfileIcon
    case 4:
      return ActivismProfileIcon
    case 5:
      return RecognitionProfileIcon
    default:
      return AcademicProfileIcon
  }
}

export const getTabInterestIcon = (id: number) => {
  switch (id) {
    case 1:
      return TranscriptIcon
    case 2:
      return ExtracurricularIcon
    case 3:
      return ProfessionalIcon
    case 4:
      return ActivismIcon
    case 5:
      return RecognitionIcon
    default:
      return TranscriptIcon
  }
}

export const getTabInterestName = (id: number) => {
  switch (id) {
    case 1:
      return `Transcript`
    case 2:
      return `Extracurricular`
    case 3:
      return `Professional`
    case 4:
      return `Service`
    case 5:
      return `Recognition`
    default:
      return `Transcript`
  }
}
