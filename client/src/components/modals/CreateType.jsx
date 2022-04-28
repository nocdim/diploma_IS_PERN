import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"
import { createType } from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import "../../styles/admin.css"

const CreateType = observer(({ show, onHide }) => {

    const [type, setType] = useState('')

    const addType = async () => {
        try {
            await createType({name: type}).then(data => {
                setType('')
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
                    Добавить раздел
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={type}
                        onChange={e => setType(e.target.value)}
                        placeholder={"Введите название раздела"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateType