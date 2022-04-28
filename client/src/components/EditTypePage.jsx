import React, { useState, useEffect, useRef } from 'react';
import { Row, Form, Button, Col, InputGroup } from 'react-bootstrap';
import AdminLoader from '../components/AdminLoader'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchOneType, updateType } from '../http/productAPI';
import { ADMIN_ROUTE } from '../utils/consts';
import "../styles/admin.css"

const EditTypePage = () => {
    const [loading, setLoading] = useState(true)
    const [type, setType] = useState({ name: '' })
    const [newName, setNewName] = useState('')
    let { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchOneType(id).then(data => {
            setType(data)
            setNewName(data.name)
        }).finally(() => setLoading(false))
    }, [id])

    const changeType = async () => {
        try {
            const formData = new FormData()
            formData.append('name', newName)
            formData.append('oldName', type.name)
            await updateType(formData)
            alert(`Раздел '${newName}' был успешно обновлён`)
            navigate(ADMIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    if (loading) {
        return (
            <AdminLoader />
        )
    }

    return (
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
                    onClick={changeType}
                >
                    Изменить
                </Button>
            </div>
        </div>
    )
}

export default EditTypePage