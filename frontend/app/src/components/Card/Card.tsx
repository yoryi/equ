import { MDBCard, MDBCardBody, MDBCardText,MDBCardTitle } from "mdbreact"
import React from "react"

import EditIcon from "../../assets/edit.svg"

interface CardProps {
  title?: any
  subtitle?: any
  body?: any
  dangerousBody?: string
  footer?: string
  style?: any
  className?: string
  id?: string
  hideEditIcon?: boolean
  toggleModal?: () => void
  toggleFooterModal?: () => void
  children?: React.ReactNode
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  body,
  footer,
  style,
  className,
  id,
  dangerousBody,
  hideEditIcon,
  toggleModal,
  toggleFooterModal,
  children,
}) => (
  <MDBCard style={style} className={className} id={id}>
    <MDBCardBody>
      <MDBCardTitle className={`${title ? `` : `no-title`}`}>
        {title}
        {!hideEditIcon && (
          <img src={EditIcon} alt="edit-icon" onClick={toggleModal} />
        )}
      </MDBCardTitle>
      {subtitle && <div className="card-subtitle">{subtitle}</div>}
      <MDBCardText className={`mt-0`}>
        {body ?? children}
        {dangerousBody && (
          <div
            key={dangerousBody}
            dangerouslySetInnerHTML={{
              __html: dangerousBody
                .replace(`<strong>`, `<b>`)
                .replace(`</strong>`, `</b>`),
            }}
          />
        )}
      </MDBCardText>
    </MDBCardBody>
    {footer && (
      <div className="card-footer" onClick={toggleFooterModal}>
        {footer}
      </div>
    )}
  </MDBCard>
)

export default Card
