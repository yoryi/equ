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
import { ChangeEvent,useCallback, useEffect, useRef, useState  } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { NavLink, Redirect, Route, Switch } from "react-router-dom"

import { ReactComponent as Camera } from "../../assets/camera.svg"
import CloseIcon from "../../assets/close-icon.svg"
import { ReactComponent as OverviewIcon } from "../../assets/overview.svg"
import { ReactComponent as SpiritIcon } from "../../assets/spirit.svg"
import Badge from "../../components/Badge"
import Button from "../../components/Button/Button"
import ClaimSchoolModal from "../../components/ClaimSchoolModal"
import CropImageModal, {
  CropImageModalRef,
} from "../../components/CropImageModal"
import FollowConfirmationModal from "../../components/FollowConfirmationModal"
import NavIcon from "../../components/NavIcon"
import fileLimits from "../../const/fileLimits"
import { MATCH_LEVELS } from "../../const/matchLevels"
import useLoader from "../../hooks/useLoader"
import * as actions from "../../store/actions"
import { CroppedImage, ReduxState, Role, University } from "../../store/types"
import { formatMatchingScoreLabel } from "../../utils/matchingScore"
import { nameAbbreviation } from "../../utils/nameAbbreviation"
import MissionStatement, {
  MissionStatementTypes,
} from "../StudentProfile/MissionStatement/MissionStatement"
import Styles from "./index.module.scss"
import Overview from "./Overview"
import Spirit from "./Spirit"

const UniversityProfile: React.FC = () => {
  const params = useParams<{ id: string | undefined }>()
  const id = params.id ? parseInt(params.id) : undefined

  const isTokenLoaded = useSelector<ReduxState, boolean>(
    (state) =>
      (state.auth.isTokenLoaded && !state.auth.refreshToken) ||
      (!!state.auth.tokenType && !!state.auth.accessToken),
  )
  const role = useSelector<ReduxState, Role | null>(
    (state) => state.auth.user?.role ?? null,
  )
  const university = useSelector<ReduxState, University | null>(
    (state) => state.university[id ? `university` : `profile`],
  )
  const isMatchingScoreLoaded = useSelector<ReduxState, boolean>(
    (state) => state.university.isMatchingScoreLoaded,
  )
  const matchingScore = useSelector<ReduxState, number | null>(
    (state) => state.university.matchingScore,
  )
  const isSpiritLoaded = useSelector<ReduxState, boolean>(
    (state) => state.university.isSpiritLoaded,
  )
  const spirit = useSelector<ReduxState, any>(
    (state) => state.university.spirit,
  )
  const universityDebugResponse: any = useSelector<any>(
    (state) => state.university.universityDebugResponse,
  )
  const dispatch = useDispatch()

  const { onLoadComplete } = useLoader()

  useEffect(() => {
    if (
      !isTokenLoaded ||
      (!id && university) ||
      (id && university?.id === id)
    ) {
      return
    }

    dispatch(actions.getUniversity(id))
  }, [isTokenLoaded, university, id])

  useEffect(() => {
    if (!isTokenLoaded || !id || role !== Role.Student) {
      return
    }

    dispatch(actions.getUniversityMatchingScore(id))
  }, [isTokenLoaded, id])

  useEffect(() => {
    if (!isTokenLoaded || spirit) {
      return
    }

    dispatch(actions.getUniversitySpirit(id))
  }, [isTokenLoaded, spirit, id])

  useEffect(() => {
    if (
      !university ||
      !isSpiritLoaded ||
      (!!id && role === Role.Student && !isMatchingScoreLoaded)
    ) {
      return
    }

    onLoadComplete()
  }, [university, isSpiritLoaded, isMatchingScoreLoaded])

  const [
    isProfilePhotoPopoverVisible,
    setProfilePhotoPopoverVisible,
  ] = useState(false)
  const [isCoverPopoverVisible, setCoverPopoverVisible] = useState(false)
  const [isProfilePhotoUpdating, setProfilePhotoUpdating] = useState(false)
  const [_isCoverUpdating, setCoverUpdating] = useState(false)

  const [deleteModalState, setDeleteModalState] = useState<
    "profilePhoto" | "cover" | null
  >(null)
  const [isFollowSchoolModalVisible, setFollowSchoolModalVisible] = useState(
    false,
  )
  const [isClaimSchoolModalVisible, setClaimSchoolModalVisible] = useState(
    false,
  )

  const profileViewRef = useRef<HTMLDivElement>(null)
  const profilePhotoDropdownRef = useRef<HTMLDivElement>(null)
  const coverPhotoDropdownRef = useRef<HTMLDivElement>(null)
  const cropImageRef = useRef<CropImageModalRef>(null)

  const isSpiritTabVisible = !id || !!spirit?.length

  const { t } = useTranslation()

  const handleProfilePhotoUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const profilePhoto = e.target.files?.[0]
    if (!profilePhoto) {
      return
    }

    if (profilePhoto.size > fileLimits.profilePhoto) {
      toast.error(t(`errors:fileIsTooBig`, { limit: fileLimits.profilePhoto }))
      setCoverPopoverVisible(false)
      return
    }

    cropImageRef.current?.load(profilePhoto)
  }

  const handleProfilePhotoUpload = async ({ blob, filename }: CroppedImage) => {
    setProfilePhotoUpdating(true)
    try {
      await dispatch(actions.updateUniversityAvatar({ blob, filename }))
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }

    setProfilePhotoUpdating(false)
    setProfilePhotoPopoverVisible(false)
  }

  const handleProfilePhotoDelete = async () => {
    setProfilePhotoUpdating(true)
    try {
      await dispatch(actions.deleteUniversityAvatar())
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
    setProfilePhotoUpdating(false)
    setProfilePhotoPopoverVisible(false)
    setDeleteModalState(null)
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
      await dispatch(actions.updateUniversityCover(cover))
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
      await dispatch(actions.deleteUniversityCover())
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
    setCoverUpdating(false)
    setCoverPopoverVisible(false)
    setDeleteModalState(null)
  }

  const handleNavLinkClick = () =>
    setTimeout(() =>
      window.scrollTo(0, (profileViewRef.current?.clientHeight ?? 0) + 48),
    )

  const handleDocumentClick = useCallback((e: MouseEvent) => {
    if (!profilePhotoDropdownRef.current?.contains(e.target as Node)) {
      setProfilePhotoPopoverVisible(false)
    }

    if (!coverPhotoDropdownRef.current?.contains(e.target as Node)) {
      setCoverPopoverVisible(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener(`click`, handleDocumentClick)

    return () => document.removeEventListener(`click`, handleDocumentClick)
  }, [handleDocumentClick])

  const matchLevel = MATCH_LEVELS.find(
    ({ min, max }) => matchingScore! >= min && matchingScore! < max,
  )

  process.env.REACT_APP_API_URL ===
    `https://equity-backend-dev.us-east-1.elasticbeanstalk.com` &&
    universityDebugResponse &&
    console.log(
      universityDebugResponse && universityDebugResponse.requester,
      universityDebugResponse &&
        universityDebugResponse.matchesInfo &&
        universityDebugResponse.matchesInfo.length > 0
        ? universityDebugResponse.matchesInfo.join()
        : null,
    )

  return (
    <>
      <div ref={profileViewRef} className={Styles.container}>
        <div className={Styles.cover}>
          {university && (
            <img
              src={
                university.cover
                  ? `${process.env.REACT_APP_API_URL}/${university.cover}`
                  : `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
                      `${university?.about.location.street},${university?.about.location.city},${university?.about.location.stateCode}`,
                    )}&zoom=15&size=3000x605&scale=2&key=${
                      process.env.REACT_APP_GOOGLE_MAPS_API_KEY
                    }`
              }
              alt=""
            />
          )}

          {!university && <mui.Skeleton width={`100%`} height={310} />}

          {!id && (
            <button
              className={classNames(
                Styles.banner,
                `position-absolute d-flex align-items-center bg-transparent border-0 p-0`,
              )}
            >
              <div ref={coverPhotoDropdownRef} className={`position-relative`}>
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
                    <button>
                      {t(
                        `common:${
                          university?.cover ? `changeBanner` : `uploadPhoto`
                        }`,
                      )}

                      <input
                        className={Styles.input}
                        type={`file`}
                        accept={`image/png, image/jpeg`}
                        onChange={handleCoverUpdate}
                      />
                    </button>

                    {university?.cover && (
                      <button
                        className={Styles.destructive}
                        onClick={() => setDeleteModalState(`cover`)}
                      >
                        {t(`common:removeBanner`)}
                      </button>
                    )}
                  </MDBPopoverBody>
                </MDBPopover>
              </div>
            </button>
          )}
        </div>

        <div className={`flex-grow-1 d-flex justify-content-center`}>
          <div className={Styles.avatar}>
            {university?.avatar && (
              <img
                src={`${process.env.REACT_APP_API_URL}/${university?.avatar}`}
                alt={university?.name}
                className={`w-100 h-100`}
              />
            )}

            {!university?.avatar && (
              <span>{nameAbbreviation(university?.name ?? ``, true)}</span>
            )}

            {!id && (
              <div ref={profilePhotoDropdownRef} className={Styles.overlay}>
                <MDBPopover
                  className={Styles.popover}
                  isVisible={isProfilePhotoPopoverVisible}
                  onChange={
                    ((visible: boolean) =>
                      setProfilePhotoPopoverVisible(visible)) as any
                  }
                  placement={`bottom`}
                  clickable
                >
                  <div className={Styles.button}>
                    {!isProfilePhotoUpdating && (
                      <Camera className={Styles.icon} />
                    )}

                    {isProfilePhotoUpdating && (
                      <span className={Styles.label}>
                        {t(`common:loading`)}
                      </span>
                    )}
                  </div>

                  <MDBPopoverBody className={Styles.body}>
                    <div className={`position-relative text-center`}>
                      {t(
                        `common:${
                          university?.avatar
                            ? `changeProfilePhoto`
                            : `uploadPhoto`
                        }`,
                      )}

                      <input
                        className={Styles.input}
                        type={`file`}
                        accept={`image/png, image/jpeg`}
                        onChange={handleProfilePhotoUpdate}
                      />
                    </div>

                    {university?.avatar && (
                      <button
                        className={Styles.destructive}
                        onClick={() => setDeleteModalState(`profilePhoto`)}
                      >
                        {t(`common:removeProfilePhoto`)}
                      </button>
                    )}
                  </MDBPopoverBody>
                </MDBPopover>
              </div>
            )}
          </div>
        </div>

        <div className={Styles.profile}>
          <h1 className={`text-center`}>
            {university?.name}

            {!university && <mui.Skeleton width={250} />}
          </h1>

          <div className={Styles.details}>
            <span className={`text-1`}>
              {university &&
                `${university?.about.location.city}, ${university?.about.location.stateCode}`}

              {!university && <mui.Skeleton width={125} />}
            </span>

            {role === Role.Student && (
              <Badge
                className={Styles.badge}
                variant={matchLevel?.color ?? `gray`}
              >
                {matchingScore && formatMatchingScoreLabel(matchingScore, t)}

                {!matchingScore && t(`common:surveyNeeded`)}
              </Badge>
            )}
          </div>

          <div className={`d-flex flex-column flex-md-row mx-n2`}>
            {role === Role.Student && university && !university?.isFollowed && (
              <Button
                className={classNames(Styles.followButton, `mx-2`)}
                size={`xs`}
                onClick={() => setFollowSchoolModalVisible(true)}
                hoverAnimation
              >
                {t(`profile.university.profileScreen.followSchool`)}
              </Button>
            )}

            {university?.website && (
              <Button
                className={classNames(Styles.followButton, `mx-2`)}
                size={`xs`}
                href={university.website}
                target={`_blank`}
                hoverAnimation
                light
              >
                {t(`profile.university.profileScreen.visitWebsite`)}
              </Button>
            )}
          </div>
        </div>

        {(role === Role.University ||
          (role !== Role.Student &&
            university?.mission &&
            university.mission.trim() !== `<p></p>`) ||
          (role === Role.Student &&
            university?.mission &&
            university.mission.trim() !== `<p></p>`)) && (
          <div className={Styles.missionStatement}>
            <MissionStatement
              mission={university?.mission ?? ``}
              type={MissionStatementTypes.University}
            />
          </div>
        )}
      </div>

      <nav
        className={classNames(Styles.navbar, {
          [`justify-content-center`]: !isSpiritTabVisible,
        })}
      >
        <NavLink
          onClick={handleNavLinkClick}
          to={id ? `/university/${id}` : `/`}
          exact
        >
          <NavIcon variant={`blue`} className={Styles.navIcon}>
            <OverviewIcon />
          </NavIcon>

          {t(`profile.university.profileScreen.overview`)}
        </NavLink>

        {isSpiritTabVisible && (
          <NavLink
            onClick={handleNavLinkClick}
            to={id ? `/university/${id}/spirit` : `/spirit`}
          >
            <NavIcon variant={`red`} className={Styles.navIcon}>
              <SpiritIcon />
            </NavIcon>

            {t(`profile.university.profileScreen.spirit`)}
          </NavLink>
        )}
      </nav>

      <Switch>
        {isSpiritTabVisible && (
          <Route
            path={[`/spirit`, `/university/:id/spirit`]}
            component={Spirit}
          />
        )}
        <Route
          path={[`/`, `/university/:id`]}
          exact
          render={() => (
            <Overview onClaimSchool={() => setClaimSchoolModalVisible(true)} />
          )}
        />

        {isSpiritLoaded && <Redirect to={id ? `/university/${id}` : `/`} />}
      </Switch>

      {university && (
        <FollowConfirmationModal
          university={university}
          visible={isFollowSchoolModalVisible}
          onClose={() => setFollowSchoolModalVisible(false)}
        />
      )}

      <ClaimSchoolModal
        visible={isClaimSchoolModalVisible}
        onClose={() => setClaimSchoolModalVisible(false)}
      />

      <CropImageModal
        ref={cropImageRef}
        type={`avatar`}
        onChange={handleProfilePhotoUpload}
      />

      <MDBModal
        isOpen={!!deleteModalState}
        toggle={() => setDeleteModalState(null)}
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
            onClick={() => setDeleteModalState(null)}
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
              deleteModalState === `profilePhoto`
                ? handleProfilePhotoDelete
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

export default UniversityProfile
