import { XYCoord } from "dnd-core"
import moment from "moment"
import React, { useRef } from "react"
import { DropTargetMonitor,useDrag, useDrop } from "react-dnd"
import { useDispatch } from "react-redux"

import EditIcon from "../../../assets/edit.svg"
import HamburgerIcon from "../../../assets/hamburger-gray-icon.svg"
import { Award, AwardType } from "../../../store/types"
import { EditAwardModal } from "./EditAwardModal"

const style = {
  padding: `0.5rem 1rem`,
  marginBottom: `.5rem`,
  backgroundColor: `white`,
  display: `flex`,
  alignItems: `center`,
  height: `fit-content`,
}

const styleImg = {
  cursor: `move`,
}

export interface CardProps {
  award: Award
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  type: AwardType
  toggleEditModal: (id?: number) => void
  isEditModalOpen: number
}

interface DragItem {
  index: number
  id: string
  type: string
}
export const AwardsDndCard: React.FC<CardProps> = ({
  award,
  index,
  moveCard,
  type,
  toggleEditModal,
  isEditModalOpen,
}) => {
  const dispatch = useDispatch()

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
    item: { type: `card`, id: award.id, index },
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
        className="awards-modal-body-row"
      >
        <div ref={ref} style={styleImg}>
          <img src={HamburgerIcon} alt="hamburger-icon" />
        </div>
        <div className="awards-modal-body-row-name">{award.name}</div>
        <div className="awards-modal-body-row-organisation">
          {award.organisation}
        </div>
        <div className="awards-modal-body-row-date">
          {award.date ? moment(award.date).format(`MMMM YYYY`) : ``}
        </div>
        <img
          src={EditIcon}
          alt="hamburger-icon"
          onClick={() => dispatch(toggleEditModal(award.id))}
        />
      </div>
      <EditAwardModal
        type={type}
        toggle={() => dispatch(toggleEditModal(0))}
        isOpen={isEditModalOpen}
        award={award}
      />
    </>
  )
}
