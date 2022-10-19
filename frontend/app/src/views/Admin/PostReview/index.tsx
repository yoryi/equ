//Utils
import classNames from "classnames"
import * as _ from "lodash"
//Components
import { MDBCard, MDBCardBody, MDBCol, MDBDataTableV5, MDBRow } from "mdbreact"
import moment from "moment"
import * as React from "react"
//Hooks
import { useMemo } from "react"
import { useEffect, useState } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import Button from "../../../components/Button/Button"
import JourneyModal from "../../../components/JourneyModal"
import MessageModal from "../../../components/MessageModal"
import Modal from "../../../components/Modal/Modal"
import ReferenceModal from "../../../components/ReferenceModal"
import SelectField from "../../../components/SelectField/SelectField"
import TextArea from "../../../components/TextField/TextArea"
import TextField from "../../../components/TextField/TextField"
import useLoader from "../../../hooks/useLoader"
import { actions } from "../../../store"
import { ReduxState } from "../../../store/types"
import { ActivityMedia } from "../../Activity/ActivityMedia"
//Styles
import Styles from "./index.module.scss"

interface Sort {
  field: "poster" | "postType" | "reviewed" | "delete" | "email"
  order: "asc" | "desc"
}

const formatPostType = (postType: number): string => {
  switch (postType) {
    case 1:
    case 2:
    case 3:
      return `Extracurricular activity`
    case 4:
    case 5:
      return `Professional activity`
    case 6:
    case 7:
      return `Service activity`
    case 8:
    case 9:
      return `Recognition award`
    case 10:
      return `Scholarship award`
    default:
      return ``
  }
}

const PostReview: React.FC = () => {
  const isTokenLoaded = useSelector<ReduxState, boolean>(
    (state) => !!state.auth.tokenType && !!state.auth.accessToken,
  )
  const { postReviewList, postPreview } = useSelector<ReduxState, any | null>(
    (state) => state.admin,
  )
  const { postReviewDeletionReasons } = useSelector<ReduxState, any | null>(
    (state) => state.shared,
  )
  const dispatch = useDispatch()

  const [isPreviewPostVisible, setPreviewPostVisible] = useState(false)
  const [isDeleteModalVisible, setDeleteModalVisible] = useState<{
    id: number
    type: number
  } | null>(null)
  const [isEditModalVisible, setEditModalVisible] = useState(``)
  const [isJourneyModalOpen, toggleJourneyModal] = useState(0)
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)
  const [
    isEmailSentSuccessModalVisible,
    setEmailSentSuccessModalVisible,
  ] = useState(false)
  const [validationError, setValidationError] = useState(``)
  const [
    isAcademicReferencesModalOpen,
    toggleAcademicReferencesModal,
  ] = useState(0)

  const [deleteReason, setDeleteReason] = useState(``)
  const [deleteMessage, setDeleteMessage] = useState(``)
  const [mailMessage, setMailMessage] = useState(``)

  const [sort, setSort] = useState<Sort>({
    field: `poster`,
    order: `asc`,
  })
  const [query, setQuery] = useState(``)

  const { onLoadComplete } = useLoader()

  useEffect(() => {
    setValidationError(``)
  }, [deleteMessage, mailMessage])

  const postReviewDeletionReasonsMapped = postReviewDeletionReasons
    ? Object.values(postReviewDeletionReasons).map((it: any, index: number) => {
        return {
          id: index + 1,
          name: it,
        }
      })
    : []

  const pickedDeletionReason =
    postReviewDeletionReasonsMapped.length > 0
      ? postReviewDeletionReasonsMapped.find(
          (item) => item.name === deleteReason,
        )
      : { id: 0, name: `` }
  const isDeletingReviewed =
    postReviewList && postReviewList.posts.length > 0
      ? postReviewList.posts.find(
          (it: any) => it.id === isDeleteModalVisible,
        ) &&
        postReviewList.posts.find((it: any) => it.id === isDeleteModalVisible)
          .isReviewed
      : false

  useEffect(() => {
    if (!!postReviewList) {
      onLoadComplete()
      return
    }

    dispatch(actions.getPostReviewList())
    dispatch(actions.getPostReviewDeletionReasons())
  }, [isTokenLoaded, postReviewList, dispatch, onLoadComplete])

  const { t } = useTranslation()

  const columns = useMemo(
    () =>
      [
        { label: t(`postReview.poster`), field: `poster` },
        { label: t(`postReview.postType`), field: `postType` },
        { label: t(`postReview.reviewed`), field: `reviewed` },
        {
          label: t(`postReview.deleteAndEmail`),
          field: `delete`,
          sort: `disabled`,
        },
        {
          label: t(`postReview.suggestEdit`),
          field: `email`,
          sort: `disabled`,
        },
      ].map((column) => {
        if (column.sort === `disabled`) {
          return column
        }

        if (column.field === sort.field) {
          return {
            ...column,
            sort: sort.order,
          }
        }

        return {
          ...column,
          sort: undefined,
        }
      }),
    [sort],
  )
  const rows = useMemo(
    () =>
      postReviewList?.posts
        .map((postReview: any) => {
          return {
            ...postReview,
            postId: postReview.postId,
            poster:
              (postReview.user[`__getStudent__`].firstName &&
                postReview.user[`__getStudent__`].lastName &&
                `${postReview.user[`__getStudent__`].firstName} ${postReview.user[`__getStudent__`].lastName}`) ??
              ``,
            postType: postReview.postType,
            reviewed: postReview.isReviewed,
          }
        })
        .filter(
          (postReview: any) =>
            !query.length ||
            postReview.poster.toLowerCase().indexOf(query.toLowerCase()) !==
              -1 ||
            formatPostType(postReview.postType)
              .toLowerCase()
              .includes(query.toLowerCase()),
        )
        .sort(
          (a: any, b: any) =>
            ((a[sort.field] ?? `z`) > (b[sort.field] ?? `z`) ? 1 : -1) *
            (sort.order === `asc` ? 1 : -1),
        )
        .map((postReview: any) => ({
          ...postReview,
          poster: (
            <div
              style={{
                color: postReview.poster ? `#005dcc` : `#1f242b`,
                cursor: postReview.poster ? `pointer` : `default`,
              }}
              onClick={() =>
                window.open(
                  `/student/${postReview.user[`__getStudent__`].id}`,
                  `_blank`,
                )
              }
            >
              {postReview.poster}
            </div>
          ),
          postType: (
            <div
              style={{
                cursor: `pointer`,
                color: `#005dcc`,
              }}
              onClick={() => {
                dispatch(
                  actions.getPostPreview({
                    id: postReview.postId,
                    type: postReview.postType,
                  }),
                )
                setPreviewPostVisible(true)
              }}
            >
              {formatPostType(postReview.postType)}
            </div>
          ),
          reviewed: (
            <div
              style={{
                color: postReview.isReviewed ? `#00AC58` : `#C91C0D`,
                cursor: `pointer`,
              }}
              onClick={() =>
                dispatch(
                  actions.toggleReviewPost({
                    id: postReview.postId,
                    type: postReview.postType,
                  }),
                )
              }
            >
              {postReview.isReviewed
                ? t(`postReview.approved`)
                : t(`postReview.notReviewed`)}
            </div>
          ),
          delete: (
            <div
              style={{
                color: `#C91C0D`,
                cursor: `pointer`,
              }}
              onClick={() =>
                setDeleteModalVisible({
                  id: postReview.postId,
                  type: postReview.postType,
                })
              }
            >
              {t(`postReview.delete`)}
            </div>
          ),
          email: (
            <div
              style={{
                cursor: `pointer`,
                color: `#005dcc`,
              }}
              onClick={() => setEditModalVisible(postReview.user.email)}
            >
              {t(`postReview.email`)}
            </div>
          ),
        })) ?? [],
    [postReviewList, query, sort],
  )

  const handleSort = ({
    column: field,
    direction: order,
  }: {
    column: Sort["field"]
    direction: Sort["order"]
  }) =>
    setSort({
      field: field ?? sort.field,
      order:
        sort.field === field ? (sort.order === `desc` ? `asc` : `desc`) : order,
    })

  return (
    <div>
      <h1 className={Styles.studentPostReviewListTitle}>
        {t(`postReview.postReview`)}
      </h1>
      <MDBRow className={`mt-5 ${Styles.cardsRow}`} around>
        <MDBCol md={`3`}>
          <MDBCard className={`align-items-center py-4`}>
            <h2 className={`font-family-normal mb-2`}>
              {postReviewList?.postsQty.toLocaleString(`en-US`)}
            </h2>
            <h3 className={`mb-0`}>{t(`postReview.posts`)}</h3>
          </MDBCard>
        </MDBCol>

        <MDBCol md={`3`}>
          <MDBCard className={`align-items-center py-4`}>
            <h2 className={`font-family-normal mb-2`}>
              {postReviewList?.postsReviewedQty.toLocaleString(`en-US`)}
            </h2>
            <h3 className={`mb-0`}>{t(`postReview.reviewed`)}</h3>
          </MDBCard>
        </MDBCol>

        <MDBCol md={`3`}>
          <MDBCard className={`align-items-center py-4`}>
            <h2 className={`font-family-normal mb-2`}>
              {postReviewList?.postsQty.toLocaleString(`en-US`) &&
              postReviewList?.postsReviewedQty.toLocaleString(`en-US`)
                ? `${Math.round(
                    (postReviewList.postsReviewedQty /
                      postReviewList.postsQty) *
                      100,
                  )}%`
                : ``}
            </h2>
            <h3 className={`mb-0`}>
              {t(`postReview.posts`)} {t(`postReview.reviewed`)}
            </h3>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBCard className={Styles.card}>
        <MDBCardBody className={`d-flex flex-column`}>
          <TextField
            className={classNames(Styles.searchInput, `align-self-end m-0`)}
            value={query}
            onChange={(e: any) => setQuery(e.target.value)}
            placeholder={t(`common:searchForPosts`)}
          />

          <MDBDataTableV5
            data={{
              columns,
              rows,
            }}
            noBottomColumns={true}
            className={Styles.table}
            displayEntries={false}
            searching={false}
            disableRetreatAfterSorting={true}
            onSort={
              handleSort as ({
                column,
                direction,
              }: {
                column: string
                direction: string
              }) => void
            }
            searchBottom={false}
            searchTop
          />
        </MDBCardBody>
      </MDBCard>
      <Modal
        title=""
        isOpen={isPreviewPostVisible}
        body={
          postPreview ? (
            postPreview.postType === `Award` ? (
              <div className={Styles.awards}>
                <div className={Styles.awardsTableRow}>
                  <div className={Styles.awardsTableName}>
                    {postPreview.post.name}
                  </div>
                  <div className={Styles.awardsTableOrganisation}>
                    {postPreview.post.organisation}
                  </div>
                  <div className={Styles.awardsTableDate}>
                    {postPreview.post.date
                      ? moment(postPreview.post.date).format(`MMMM YYYY`)
                      : ``}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="activity-main-info">
                  {postPreview.post.logo && (
                    <ActivityMedia
                      path={postPreview.post.logo.path}
                      className="card-body-image"
                    />
                  )}
                  <div className="activity-data-container">
                    <div className="activity-title">
                      {postPreview.post.title}
                    </div>
                    {postPreview.post.company && (
                      <div className="activity-company">
                        {postPreview.post.company}
                      </div>
                    )}
                    {postPreview.post.startDate && (
                      <div className="activity-date">{`${
                        moment(postPreview.post.startDate).month() === 0
                          ? Number(
                              moment(postPreview.post.startDate).format(`YYYY`),
                            ) - 1
                          : moment(postPreview.post.startDate).format(`YYYY`)
                      } - ${
                        postPreview.post.endDate
                          ? moment(postPreview.post.endDate).month() === 0
                            ? Number(
                                moment(postPreview.post.endDate).format(`YYYY`),
                              ) - 1
                            : moment(postPreview.post.endDate).format(`YYYY`)
                          : t(`common:present`).toLocaleLowerCase()
                      }`}</div>
                    )}
                  </div>
                </div>
                <div style={{ whiteSpace: `pre-wrap`, marginTop: 20 }}>
                  {postPreview.post.description}
                </div>
                {postPreview.post.journeys &&
                  postPreview.post.journeys.length > 0 && (
                    <div
                      style={{ display: `flex`, justifyContent: `center` }}
                      onClick={() => toggleJourneyModal(postPreview.post.id)}
                    >
                      <ActivityMedia
                        path={
                          postPreview.post.journeys.sort((a: any, b: any) => {
                            return a.order - b.order
                          })[0].media.path
                        }
                        className="card-body-image"
                      />
                    </div>
                  )}
                {postPreview.post.referenceLink && (
                  <div
                    onClick={() =>
                      toggleAcademicReferencesModal(
                        postPreview.post.referenceLink.id,
                      )
                    }
                    style={{
                      textAlign: `center`,
                      color: `#005dcc`,
                      marginBottom: 20,
                      cursor: `pointer`,
                    }}
                  >
                    {t(`common:readReference`)}
                  </div>
                )}
                {postPreview &&
                  postPreview.post.referenceLink &&
                  postPreview.post.referenceLink.reference &&
                  !!isAcademicReferencesModalOpen && (
                    <ReferenceModal
                      reference={postPreview.post.referenceLink.reference}
                      visible={!!isAcademicReferencesModalOpen}
                      onToggleVisibility={() => {
                        toggleAcademicReferencesModal(0)
                      }}
                      onDelete={async () => {
                        await dispatch(
                          actions.deletePostReference({
                            userId: postPreview.post.student.user.id,
                            reference: postPreview.post.referenceLink.reference,
                          }),
                        )
                        setPreviewPostVisible(false)
                      }}
                      viewType={`view`}
                      className="activity-reference-admin"
                    />
                  )}
              </div>
            )
          ) : null
        }
        toggle={() => setPreviewPostVisible(false)}
      />
      <Modal
        title={t(`postReview.whyIsThisBeingDeleted`)}
        subtitle={t(`postReview.selectAnOptionBelow`)}
        closeIcon
        isOpen={!!isDeleteModalVisible}
        body={
          <div className={Styles.deleteModalContainer}>
            <SelectField
              onChange={(option: any) => {
                setDeleteReason(option.value)
              }}
              value={deleteReason}
              items={postReviewDeletionReasonsMapped}
              title={t(`postReview.reasonForDeletion`)}
              placeholder={t(`postReview.selectReason`)}
            />
            <TextArea
              value={deleteMessage}
              onChange={(e: any) => setDeleteMessage(e.target.value)}
              title={t(`postReview.personalMessage`)}
              placeholder={t(`postReview.message`)}
              error={validationError}
            />
            <div
              style={{
                display: `flex`,
                justifyContent: `center`,
                marginTop: 32,
                marginBottom: 20,
              }}
            >
              <Button
                removeButton
                onClick={async () => {
                  if (deleteMessage.length < 20) {
                    return setValidationError(
                      t(`errors:minNumberOfCharacters`, { count: 20 }),
                    )
                  }

                  try {
                    await dispatch(
                      actions.deletePostByAdmin({
                        id: isDeleteModalVisible!.id,
                        type: isDeleteModalVisible!.type,
                        message: deleteMessage,
                        reason: String(pickedDeletionReason?.id || 0),
                        isReviewed: isDeletingReviewed,
                      }),
                    )
                    setDeleteModalVisible(null)
                    setDeleteReason(``)
                    setValidationError(``)
                    setDeleteMessage(``)
                    setSuccessModalVisible(true)
                  } catch (err) {
                    if (err.message) {
                      toast.error(err.message)
                    }
                  }
                }}
              >
                {t(`postReview.deleteAndEmail`)}
              </Button>
            </div>
          </div>
        }
        toggle={() => {
          setDeleteModalVisible(null)
          setDeleteReason(``)
          setValidationError(``)
          setDeleteMessage(``)
        }}
      />
      <Modal
        title={t(`postReview.suggestEdit`)}
        closeIcon
        isOpen={!!isEditModalVisible}
        body={
          <div className={Styles.emailModalContainer}>
            <TextArea
              value={mailMessage}
              onChange={(e: any) => setMailMessage(e.target.value)}
              title={t(`postReview.personalMessage`)}
              placeholder={t(`postReview.message`)}
              error={validationError}
            />
            <div
              style={{
                display: `flex`,
                justifyContent: `center`,
                marginTop: 32,
                marginBottom: 20,
              }}
            >
              <Button
                onClick={async () => {
                  if (mailMessage.length < 10) {
                    return setValidationError(
                      t(`errors:minNumberOfCharacters`, { count: 10 }),
                    )
                  }

                  try {
                    await dispatch(
                      actions.mailStudentByAdmin({
                        email: isEditModalVisible,
                        message: mailMessage,
                      }),
                    )
                    setEditModalVisible(``)
                    setValidationError(``)
                    setMailMessage(``)
                    setEmailSentSuccessModalVisible(true)
                  } catch (err) {
                    if (err.message) {
                      toast.error(err.message)
                    }
                  }
                }}
              >
                {t(`postReview.sendEmail`)}
              </Button>
            </div>
          </div>
        }
        toggle={() => {
          setEditModalVisible(``)
          setValidationError(``)
          setMailMessage(``)
        }}
      />
      <MessageModal
        title={t(`common:success`)}
        message={t(`postReview.postHasBeenDeleted`)}
        visible={isSuccessModalVisible}
        onClose={() => setSuccessModalVisible(false)}
      />
      <MessageModal
        title={t(`common:success`)}
        message={t(`postReview.emailHasBeenSent`)}
        visible={isEmailSentSuccessModalVisible}
        onClose={() => setEmailSentSuccessModalVisible(false)}
      />

      <JourneyModal
        visible={postPreview?.post?.id === isJourneyModalOpen}
        onClose={() => toggleJourneyModal(0)}
        activity={postPreview?.post}
      />
    </div>
  )
}

export default PostReview
