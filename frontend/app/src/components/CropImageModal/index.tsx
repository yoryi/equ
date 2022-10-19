import "react-image-crop/dist/ReactCrop.css"

//Components
import {
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
} from "mdbreact"
import * as React from "react"
//Hooks
import { useImperativeHandle,useState } from "react"
import Cropper from "react-easy-crop"
//Types
import { Area } from "react-easy-crop/types"
import { useTranslation } from "react-i18next"

import { getCroppedImage } from "../../utils/cropImage"
//Utils
import { readFile } from "../../utils/readFile"
import Button from "../Button/Button"
//Styles
import Styles from "./index.module.scss"

export interface CropImageModalRef {
  load: (file: File) => void
}

interface CropImageModalProps {
  type: "avatar" | "cover"
  onChange: ({ blob, filename }: { blob: Blob; filename: string }) => void
}

const CropImageModal = React.forwardRef<CropImageModalRef, CropImageModalProps>(
  ({ onChange }, ref) => {
    const [isModalVisible, setModalVisible] = useState(false)

    const [filename, setFilename] = useState<string | null>(null)
    const [src, setSrc] = useState<string | undefined>(undefined)
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
      null,
    )

    useImperativeHandle(ref, () => ({
      load: async (file: File) => onLoad(file),
    }))

    const onLoad = async (file: File) => {
      const imageDataUrl = (await readFile(file)) as string
      setFilename(file.name)
      setSrc(imageDataUrl)
      setModalVisible(true)
    }

    const handleDone = async () => {
      if (!filename || !croppedAreaPixels || !src) {
        return
      }

      const blob = await getCroppedImage(src, croppedAreaPixels, rotation)
      if (blob) {
        onChange({ blob, filename })
      }
      setModalVisible(false)
    }

    const handleCancel = () => {
      setModalVisible(false)
    }

    const { t } = useTranslation(`common`)

    return (
      <MDBModal
        className={Styles.modal}
        isOpen={isModalVisible}
        toggle={() => setModalVisible(false)}
        inline={false}
        overflowScroll={false}
        noClickableBodyWithoutBackdrop={false}
      >
        <MDBModalHeader className={Styles.header}>
          {t(`cropImage`)}
        </MDBModalHeader>

        <MDBModalBody className={Styles.body}>
          <Cropper
            image={src}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={(_, croppedAreaPixels) =>
              setCroppedAreaPixels(croppedAreaPixels)
            }
            onZoomChange={setZoom}
            cropShape={`round`}
          />
        </MDBModalBody>

        <MDBModalFooter className={Styles.footer}>
          <div>
            <Button
              className={Styles.cancel}
              onClick={handleCancel}
              size={`auto`}
              deleteButton
            >
              {t(`cancel`)}
            </Button>
          </div>

          <div>
            <Button size={`auto`} onClick={handleDone}>
              {t(`done`)}
            </Button>
          </div>
        </MDBModalFooter>
      </MDBModal>
    )
  },
)

export default CropImageModal
