import React from "react";
import { Modal } from "react-bootstrap"
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { Btn } from "../styled/GiveRating";

const CreateType = observer(({ show, onHide }) => {

    let arr = [1,2,3,4,5]

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Поставьте оценку продукту!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{display: 'flex', justifyContent: 'center'}}>
                {arr.map(i =>
                    <Btn key={i}>{i}</Btn>
                    )}
            </Modal.Body>
        </Modal>
    )
})

export default CreateType