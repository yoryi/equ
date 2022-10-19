import { FormikErrors,useFormik } from "formik"
import update from "immutability-helper"
import React, { useCallback, useEffect,useMemo, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import Modal from "../../../../components/Modal/Modal"
import useWindowDimensions from "../../../../hooks/UseWindowDimensions"
import { actions } from "../../../../store"
import { Course, CourseType } from "../../../../store/types"
import { CourseDndCard } from "./CourseDndCard"

interface CollegeCoursesModalProps {
  isOpen: boolean
  toggle: () => void
  courses: Course[] | []
}

export const CollegeCoursesModal: React.FC<CollegeCoursesModalProps> = ({
  isOpen,
  toggle,
  courses,
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { windowWidth } = useWindowDimensions()
  const [cards, setCards] = useState<any>(courses)
  const { isEditCollegeCourseModalOpen } = useSelector((state: any) =>
    state.profile.transcript ? state.profile.transcript : false,
  )

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
          gpa: card.gpa,
          grade: card.grade,
          date: card.date,
          order: index,
        }
      })
      dispatch(
        actions.updateCourseOrder({
          type: CourseType.College,
          courses: updatedCards,
        }),
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

  const renderCard = (
    card: {
      id: number
      gpa: string
      grade: string
      date: string
      order: number
    },
    index: number,
  ) => {
    return (
      <CourseDndCard
        key={card.id}
        index={index}
        course={card}
        moveCard={moveCard}
      />
    )
  }

  const sortedCards = courses.sort((a: any, b: any) => {
    return a.order - b.order
  })

  useEffect(() => {
    if (isOpen) {
      document.body.className = `modal-open overflow-hidden`
    }
    if (!isEditCollegeCourseModalOpen && isOpen) {
      setTimeout(() => {
        document.body.className = `modal-open overflow-hidden`
      }, 100)
    }
  }, [isOpen, isEditCollegeCourseModalOpen])

  useEffect(() => {
    document.body.className = cards.length ? `modal-open overflow-hidden` : ``

    return () => {
      document.body.className = ``
    }
  }, [cards])

  return (
    <Modal
      title={t(`profile.student.transcriptScreen.yourCollegeCourses`)}
      subtitle={t(
        `profile.student.transcriptScreen.yourCollegeCoursesSubtitle`,
      )}
      isOpen={isOpen}
      toggle={() => {
        toggle()
        document.body.className = ``
      }}
      body={
        <div className="college-course-modal-body">
          <div className="college-course-modal-body-header">
            <div className="college-course-modal-body-header-item">
              {t(`profile.student.transcriptScreen.courseName`)}
            </div>
            <div className="college-course-modal-body-header-grade">
              {t(`common:credits`)}
            </div>
          </div>
          <DndProvider
            backend={windowWidth > 1023 ? HTML5Backend : TouchBackend}
          >
            {sortedCards === cards
              ? sortedCards.map((card: any, i: number) => renderCard(card, i))
              : cards.map((card: any, i: number) => renderCard(card, i))}
          </DndProvider>
          <div
            className="college-course-modal-body-footer"
            onClick={() => {
              dispatch(actions.toggleAddCollegeCourseModal(true))
              toggle()
            }}
          >
            {t(`profile.student.transcriptScreen.addMoreCollegeCourses`)}
          </div>
        </div>
      }
      footer={t(`common:saveChanges`)}
      footerAction={() => handleSubmit()}
      closeIcon
    />
  )
}
