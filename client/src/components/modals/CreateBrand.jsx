import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"
import { createBrand } from "../../http/productAPI";

const CreateBrand = ({show, onHide}) => {

    const [brand, setBrand] = useState('')
    const addBrand = async () => {
        try {
            await createBrand({name: brand}).then(data => {
                setBrand('')
                onHide()
                window.location.reload()
            })
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
                    Добавить производителя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                        placeholder={"Введите название производителя"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBrand