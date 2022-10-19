import { useFormik } from "formik"
import update from "immutability-helper"
import * as React from "react"
//Hooks
import { useCallback,useEffect, useMemo, useRef, useState } from "react"
import { DndProvider, DropTargetMonitor, useDrag, useDrop , XYCoord } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"

import HamburgerIcon from "../../../../assets/hamburger-gray-icon.svg"
import Button from "../../../../components/Button/Button"
//Components
import MessageModal from "../../../../components/MessageModal"
import useLoader from "../../../../hooks/useLoader"
import useWindowDimensions from "../../../../hooks/UseWindowDimensions"
//Actions
import * as actions from "../../../../store/actions"
//Types
import { ReduxState } from "../../../../store/types"
import { getTabInterestIcon, getTabInterestName } from "../../StudentProfile"

const navTabs = [1, 2, 3, 4, 5]

export const ChangeTabOrder = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { windowWidth } = useWindowDimensions()

  const profile = useSelector((state: ReduxState) => state.profile.profile)
  const [cards, setCards] = useState<any>(navTabs)

  useEffect(() => {
    setCards(navTabs)
  }, [navTabs])

  useEffect(() => {
    if (profile && profile.uiSettings) {
      setCards(profile.uiSettings.tabOrder)
    }
  }, [profile])

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)

  const initialValues = useMemo<any>(() => ({}), [navTabs])

  const { handleSubmit, isSubmitting } = useFormik<any>({
    initialValues,
    onSubmit: async (_payload, { setSubmitting, setErrors }) => {
      try {
        await dispatch(actions.updateNavTabsOrder({ tabOrder: cards }))
        setSuccessModalVisible(true)
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }

        setErrors(err.errors ?? { oldPassword: err.message })
      }

      setSubmitting(false)
    },
  })

  const { onLoadComplete } = useLoader()

  useEffect(onLoadComplete, [])

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

  const renderCard = (card: number, index: number) => {
    return (
      <InterestsOrderDnD
        key={card}
        index={index}
        interest={card}
        moveCard={moveCard}
      />
    )
  }

  const sortedCards = navTabs.sort((a: any, b: any) => {
    return a.order - b.order
  })

  return (
    <div className="change-password-container">
      <form onSubmit={handleSubmit}>
        <div className="change-password-title">
          {t(`changeTabsOrderScreen.changeTabsOrder`)}
        </div>
        <div className="change-password-row mx-n2 d-flex flex-column">
          <DndProvider
            backend={windowWidth > 1023 ? HTML5Backend : TouchBackend}
          >
            {sortedCards === cards
              ? sortedCards.map((card: any, i: number) => renderCard(card, i))
              : cards.map((card: any, i: number) => renderCard(card, i))}
          </DndProvider>
        </div>
        <div className="change-password-submit mx-auto mt-4 mb-0">
          <Button type={`submit`} disabled={isSubmitting}>
            {t(`common:saveChanges`)}
          </Button>
        </div>
      </form>
      <MessageModal
        title={t(`common:success`)}
        message={t(`common:tabsOrderSuccessfullyChanged`)}
        visible={isSuccessModalVisible}
        onClose={() => setSuccessModalVisible(false)}
      />
    </div>
  )
}

const style = {
  padding: `0.5rem 1rem`,
  marginBottom: `.5rem`,
  backgroundColor: `white`,
  display: `flex`,
  alignItems: `center`,
  height: `fit-content`,
}

const styleImg: any = {
  cursor: `move`,
  position: `relative`,
  top: `-2px`,
}

export interface CardProps {
  interest: number
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}
export const InterestsOrderDnD: React.FC<CardProps> = ({
  interest,
  index,
  moveCard,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: `card`,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: `card`, id: interest, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.3 : 1

  drag(drop(ref))

  return (
    <>
      <div
        style={{ ...style, opacity, position: `relative` }}
        className="college-course-modal-body-row"
      >
        <div ref={ref} style={styleImg}>
          <img src={HamburgerIcon} alt="hamburger-icon" />
        </div>
        <img
          key={interest}
          src={getTabInterestIcon(interest)}
          alt={`${interest}-icon`}
          style={{ marginLeft: 12, marginRight: 6 }}
        />
        <div>{getTabInterestName(interest)}</div>
      </div>
    </>
  )
}
