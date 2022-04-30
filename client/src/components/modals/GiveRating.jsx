import React from "react";
import { Modal } from "react-bootstrap"
import { observer } from "mobx-react-lite";
import styled from "styled-components";

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
                    <Btn>{i}</Btn>
                    )}
            </Modal.Body>
        </Modal>
    )
})

const Btn = styled.button`
    max-width: 150px;
    min-width: 100px;
    height: 40px;
    border: none;
    outline: none;
    margin: 1rem 0.5rem;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #3a3055;
    color: white;
    cursor: pointer;

    transition: all 0.2s ease-in;

    &:hover {
        transform: translateY(-3px);
        background-color: #7b7fda;
        color: black;
    }
`

export default CreateType