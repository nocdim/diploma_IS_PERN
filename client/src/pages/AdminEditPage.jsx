import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Form, Button, Col, InputGroup, Image } from 'react-bootstrap';
import AdminLoader from '../components/AdminLoader'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchOneBrand, fetchOneType, updateBrand, updateType } from '../http/productAPI';
import { ADMIN_ROUTE } from '../utils/consts';
import "../styles/admin.css"

const AdminEditPage = () => {
    const [loading, setLoading] = useState(true)
    let { subject } = useParams()
    let { id } = useParams()
    const fileInputRef = useRef()
    const navigate = useNavigate()

    const [type, setType] = useState({ name: '' })
    const [brand, setBrand] = useState({ name: '' })
    const [newName, setNewName] = useState('')
    const [preview, setPreview] = useState('')
    const [image, setImage] = useState(null)

    useEffect(() => {
        if (subject === 'type') {
            fetchOneType(id).then(data => {
                setType(data)
                setPreview(process.env.REACT_APP_API_URL + data.img)
                setNewName(data.name)
            }).finally(() => setLoading(false))
            return
        } else if (subject === 'brand') {
            fetchOneBrand(id).then(data => {
                setBrand(data)
                setNewName(data.name)
            }).finally(() => setLoading(false))
            return
        } else if (subject === 'product') {
            console.log(subject)
            return
        }
    }, [subject, id])

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

    const changeType = async () => {
        try {
            const formData = new FormData()
            formData.append('name', newName)
            formData.append('oldName', type.name)
            formData.append('img', image)
            await updateType(formData)
            alert(`Раздел '${newName}' был успешно обновлён`)
            navigate(ADMIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const changeBrand = async () => {
        try {
            const formData = new FormData()
            formData.append('name', newName)
            formData.append('oldName', brand.name)
            await updateBrand(formData)
            alert(`Производитель '${newName}' был успешно обновлён`)
            navigate(ADMIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

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

    if (loading) {
        return (
            <AdminLoader />
        )
    }

    return (
        <Container>
            {subject === 'type'
                ?
                <div>
                    <Row>
                        <Col className="d-flex flex-column">
                            <h2 className="mt-4">Редактирование раздела "{type.name}"</h2>
                        </Col>
                        <Col className="d-flex justify-content-end align-items-end">
                            Создан: {type.createdAt.substr(0, 10)} Изменён: {type.updatedAt.substr(0, 10)}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex flex-column" md={2}>
                            <div className="mt-2">
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
                        </Col>
                        <Col className="d-flex flex-column" md={10}>
                            <Form className="mt-2">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Название</InputGroup.Text>
                                    <Form.Control
                                        value={newName}
                                        onChange={(event) => { setNewName(event.target.value) }}
                                        placeholder={"Введите название раздела"}
                                    />
                                </InputGroup>
                                <hr />
                                <div className="d-flex justify-content-end">
                                    <Button
                                        className="mx-2"
                                        variant="outline-danger"
                                        onClick={() => navigate(ADMIN_ROUTE)}
                                    >
                                        Назад
                                    </Button>
                                    <Button
                                        variant="outline-success"
                                        onClick={changeType}
                                    >
                                        Изменить
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
                :
                subject === 'brand'
                    ?
                    <div>
                        <Row>
                            <Col className="d-flex flex-column">
                                <h2 className="mt-4">Редактирование брэнда "{brand.name}"</h2>
                            </Col>
                            <Col className="d-flex justify-content-end align-items-end">
                                Создан: {brand.createdAt.substr(0, 10)} Изменён: {brand.updatedAt.substr(0, 10)}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex flex-column">
                                <Form className="mt-2">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>Название</InputGroup.Text>
                                        <Form.Control
                                            value={newName}
                                            onChange={(event) => { setNewName(event.target.value) }}
                                            placeholder={"Введите название производителя"}
                                        />
                                    </InputGroup>
                                    <hr />
                                </Form>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end">
                            <Button
                                className="mx-2"
                                variant="outline-danger"
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Назад
                            </Button>
                            <Button
                                variant="outline-success"
                                onClick={changeBrand}
                            >
                                Изменить
                            </Button>
                        </div>
                    </div>
                    :
                    <h2>Редактирование продукта</h2>
            }
        </Container>
    )
}

export default AdminEditPage