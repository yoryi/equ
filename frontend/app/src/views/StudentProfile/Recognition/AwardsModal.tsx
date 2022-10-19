import { FormikErrors,useFormik } from "formik"
import update from "immutability-helper"
import React, { useCallback, useEffect, useMemo,useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

import Modal from "../../../components/Modal/Modal"
import useWindowDimensions from "../../../hooks/UseWindowDimensions"
import { actions } from "../../../store"
import { Award, AwardType } from "../../../store/types"
import { AwardsDndCard } from "./AwardsDndCard"

export interface AwardsModalProps {
  awards: Award[] | []
  isOpen: boolean
  toggle: () => void
  toggleAddModal: () => void
  toggleEditModal: any
  type: AwardType
  isEditModalOpen: number
}

export const AwardsModal: React.FC<AwardsModalProps> = ({
  isOpen,
  toggle,
  toggleAddModal,
  toggleEditModal,
  awards,
  type,
  isEditModalOpen,
}) => {
  const { t } = useTranslation()
  const [cards, setCards] = useState<any>(awards)
  const dispatch = useDispatch()
  const { windowWidth } = useWindowDimensions()

  useEffect(() => {
    setCards(awards)
  }, [awards])

  const initialValues = useMemo<any>(() => ({}), [awards])

  const { handleSubmit } = useFormik<any>({
    initialValues,
    onSubmit: ({}, { setErrors, setSubmitting }) => {
      const updatedCards = cards.map((card: any, index: number) => {
        return {
          id: card.id,
          name: card.name,
          organisation: card.organisation,
          date: card.date,
          order: index,
        }
      })
      dispatch(actions.updateAwardOrder({ type, awards: updatedCards }))
        .then(() => {
          toggle()
          document.body.className = ``
        })
        .catch(({ errors }: { errors: FormikErrors<any> }) => setErrors(errors))
        .finally(() => setSubmitting(false))
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

  const renderCard = (card: Award, index: number) => {
    return (
      <AwardsDndCard
        key={card.id}
        index={index}
        award={card}
        moveCard={moveCard}
        type={type}
        toggleEditModal={toggleEditModal}
        isEditModalOpen={isEditModalOpen}
      />
    )
  }

  const sortedCards = awards.sort((a: any, b: any) => {
    return a.order - b.order
  })

  useEffect(() => {
    if (isOpen) {
      document.body.className = `modal-open overflow-hidden`
    }
    if (!isEditModalOpen && isOpen) {
      setTimeout(() => {
        document.body.className = `modal-open overflow-hidden`
      }, 100)
    }
  }, [isOpen, isEditModalOpen])

  return (
    <Modal
      title={t(`profile.student.recognitionScreen.yourAwards`, {
        name: t(
          `profile.student.recognitionScreen.awardTypes.${type.toLowerCase()}`,
        ),
      })}
      subtitle={t(
        `profile.student.recognitionScreen.updateYourAcademicAwardsToSaveThemYourProfile`,
        {
          name: t(
            `profile.student.recognitionScreen.awardTypes.${type.toLowerCase()}`,
          ),
        },
      )}
      isOpen={isOpen}
      toggle={() => {
        toggle()
        document.body.className = ``
      }}
      body={
        <div className="awards-modal-body">
          <div className="awards-modal-body-header">
            <div className="awards-modal-body-header-item">
              {t(`profile.student.recognitionScreen.award`)}
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
            className="awards-modal-body-footer"
            onClick={() => {
              toggleAddModal()
              toggle()
            }}
          >
            +{t(`profile.student.recognitionScreen.addAwards`)}
          </div>
        </div>
      }
      footer={t(`common:saveChanges`)}
      footerAction={() => handleSubmit()}
      closeIcon
    />
  )
}
