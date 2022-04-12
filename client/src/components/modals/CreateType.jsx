import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap"
import { createType } from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import "../../styles/admin.css"

const CreateType = observer(({ show, onHide }) => {

    const [type, setType] = useState('')
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState('')
    const fileInputRef = useRef()

    const imgUpload = (event) => {
        event.preventDefault()
        fileInputRef.current.click()
    }

    const selectImage = event => {
        const file = event.target.files[0]
        if (file && file.type.substr(0, 5) === "image") {
            setImage(file)
        } else {
            setImage(null)
        }
    }

    useEffect(() => {
        if (image) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(image)
        } else {
            setPreview('')
        }
    }, [image])

    const addType = async () => {
        try {
            const formData = new FormData()
            formData.append('name', type)
            formData.append('img', image)
            await createType(formData).then(data => {
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
            size="sm"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить раздел
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="d-flex justify-content-center mb-3">
                    {preview ?
                        <img
                            className="img"
                            src={preview}
                            alt={preview}
                            onClick={imgUpload}
                        />
                        :
                        <button
                            className="imgButton"
                            onClick={imgUpload}
                        >
                            Загрузите изображение
                        </button>
                    }
                    <Form.Control
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={selectImage}
                    />
                    </div>
                    
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