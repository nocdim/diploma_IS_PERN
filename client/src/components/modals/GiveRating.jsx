import React, { useState } from "react";
import { Modal } from "react-bootstrap"
import { observer } from "mobx-react-lite";
import { Btn } from "../styled/GiveRating";
import { giveRating } from "../../http/productAPI";
import { useParams } from "react-router-dom";

const CreateType = observer(({ show, onHide }) => {

    let arr = [1,2,3,4,5]
    const productId = useParams('id')

    const rate = async (rating) => {
            try {
                const formData = new FormData()
                formData.append('rating', rating)
                formData.append('userId', localStorage.getItem('userId'))
                formData.append('productId', productId.id)
                await giveRating(formData)
                alert('Спасибо за ваш отзыв!')
                window.location.reload()
            } catch (e) {
                alert(e.response.data.message)
            }
    }

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
                    <Btn key={i} onClick={() => rate(i)}>{i}</Btn>
                    )}
            </Modal.Body>
        </Modal>
    )
})

export default CreateType