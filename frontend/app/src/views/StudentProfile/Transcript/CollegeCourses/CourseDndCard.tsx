import { XYCoord } from "dnd-core"
import moment from "moment"
import React, { useRef } from "react"
import { DropTargetMonitor,useDrag, useDrop } from "react-dnd"
import { useDispatch, useSelector } from "react-redux"

import EditIcon from "../../../../assets/edit.svg"
import HamburgerIcon from "../../../../assets/hamburger-gray-icon.svg"
import { actions } from "../../../../store"
import { Course } from "../../../../store/types"
import { EditCollegeCourseModal } from "./EditCollegeCourseModal"

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
  course: Course
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}
export const CourseDndCard: React.FC<CardProps> = ({
  course,
  index,
  moveCard,
}) => {
  const dispatch = useDispatch()
  const { isEditCollegeCourseModalOpen } = useSelector((state: any) =>
    state.profile.transcript ? state.profile.transcript : false,
  )
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
    item: { type: `card`, id: course.id, index },
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
        <div>
          {course.gpa || course.name}
          <div className="college-courses-table-date">
            {course.date
              ? moment(course.date).format(`MMMM YYYY`)
              : moment(course.year).format(`MMMM YYYY`)}
          </div>
        </div>
        <div>{course.grade}</div>
        <img
          src={EditIcon}
          alt="hamburger-icon"
          onClick={() =>
            dispatch(actions.toggleEditCollegeCourseModal(course.id))
          }
        />
      </div>
      <EditCollegeCourseModal
        id={course.id}
        toggle={() => dispatch(actions.toggleEditCollegeCourseModal(0))}
        isOpen={isEditCollegeCourseModalOpen}
        course={course}
      />
    </>
  )
}
