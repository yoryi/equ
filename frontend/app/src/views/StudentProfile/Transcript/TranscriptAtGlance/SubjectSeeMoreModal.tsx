import { FormikErrors,useFormik } from "formik"
import update from "immutability-helper"
import _ from "lodash"
import React, { useCallback, useEffect,useMemo, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
//Hooks
import { useParams } from "react-router"

import Modal from "../../../../components/Modal/Modal"
import useWindowDimensions from "../../../../hooks/UseWindowDimensions"
import { actions } from "../../../../store"
import { Glance, GlancePart } from "../../../../store/types"
import { CourseDndCard } from "./CourseDndCard"

interface SubjectSeeMoreModalProps {
  isOpen: string
  toggle: () => void
  title: string
  category: string
  GPA?: number
  courses: Glance[] | []
  openLetterGradingScaleModal: () => void
}

export const SubjectSeeMoreModal: React.FC<SubjectSeeMoreModalProps> = ({
  isOpen,
  toggle,
  title,
  GPA,
  courses,
  category,
  openLetterGradingScaleModal,
}) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { windowWidth } = useWindowDimensions()
  const [cards, setCards] = useState<any>(courses)
  useEffect(() => {
    setCards(courses)
  }, [courses])

  const initialValues = useMemo<any>(() => ({}), [courses])

  const { handleSubmit } = useFormik<any>({
    initialValues,
    onSubmit: ({}, { setErrors }) => {
      const updatedCards = cards.map((card: any, index: number) => {
        return {
          id: card.id,
          name: card.name,
          grade: card.grade,
          category,
          order: index,
          date: card.date,
        }
      })
      dispatch(
        actions.updateGlanceOrder({ category: title, parts: updatedCards }),
      )
        .then(() => {
          toggle()
          document.body.className = ``
        })
        .catch(({ errors }: { errors: FormikErrors<any> }) => setErrors(errors))
    },
  })

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
    },
    [cards],
  )

  const renderCard = (card: GlancePart, index: number) => {
    return (
      <CourseDndCard
        key={card.id}
        index={index}
        course={card}
        moveCard={moveCard}
        openLetterGradingScaleModal={openLetterGradingScaleModal}
        title={title}
        category={category}
        editable={isViewingOwnProfile}
      />
    )
  }

  return (
    <Modal
      title={t(`profile.student.transcriptScreen.courses`, { title })}
      subtitle={
        <div>
          {t(`profile.student.transcriptScreen.contentGpa`, { count: GPA })}
        </div>
      }
      isOpen={title ? isOpen === title : false}
      toggle={toggle}
      body={
        <div className="college-course-modal-body">
          <div className="college-course-modal-body-header">
            <div className="college-course-modal-body-header-item">
              {t(`common:course`)}
            </div>
            <div className="college-course-modal-body-header-grade">
              {t(`common:grade`)}
            </div>
          </div>
          <DndProvider
            backend={windowWidth > 1023 ? HTML5Backend : TouchBackend}
          >
            {cards.map((card: any, i: number) => renderCard(card, i))}
          </DndProvider>

          {isViewingOwnProfile && (
            <div
              className="college-course-modal-body-footer"
              onClick={() => {
                dispatch(actions.toggleAddGlanceModal(title))
                toggle()
              }}
            >
              {t(`profile.student.transcriptScreen.addCourse`)}
            </div>
          )}
        </div>
      }
      footer={isViewingOwnProfile ? t(`common:saveChanges`) : undefined}
      footerAction={isViewingOwnProfile ? () => handleSubmit() : undefined}
      closeIcon
    />
  )
}
