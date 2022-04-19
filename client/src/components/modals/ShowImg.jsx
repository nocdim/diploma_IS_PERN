import React from "react";
import { Image, Modal } from "react-bootstrap"
import "../../styles/admin.css"

const CreateBrand = ({show, onHide, imgSrc}) => {

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="sm"
            centered
            dialogClassName="modalImg"
        >
            <Modal.Body className="d-flex justify-content-center">
                <Image 
                    className="imgModal"
                    src={imgSrc}
                />
            </Modal.Body>
        </Modal>
    )
}

export default CreateBrand