import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"
import { createType } from "../../http/productAPI";

const CreateType = ({show, onHide}) => {

    const [file, setFile] = useState(null)
    const [type, setType] = useState('')

    const addType = async () => {
        try {
            const formData = new FormData()
            formData.append('name', type)
            formData.append('img', file)
            await createType(formData).then(data => {
                setType('')
                onHide()
            })
        } catch (e) {
            alert(e.response.data.message)
        }
        
    }

    const selectFile = e => {
        setFile(e.target.files[0])
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
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateType