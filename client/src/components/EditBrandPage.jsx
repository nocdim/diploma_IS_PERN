import React, { useState, useEffect } from 'react';
import { Row, Form, Button, Col, InputGroup } from 'react-bootstrap';
import AdminLoader from '../components/AdminLoader'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchOneBrand, updateBrand } from '../http/productAPI';
import { ADMIN_ROUTE } from '../utils/consts';
import "../styles/admin.css"

const EditBrandPage = () => {
    const [loading, setLoading] = useState(true)
    const [brand, setBrand] = useState({ name: '' })
    const [newName, setNewName] = useState('')
    const navigate = useNavigate()
    let { id } = useParams()

    useEffect(() => {
        fetchOneBrand(id).then(data => {
            setBrand(data)
            setNewName(data.name)
        }).finally(() => setLoading(false))
    }, [id])

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

    if (loading) {
        return (
            <AdminLoader />
        )
    }

    return (
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
    )
}

export default EditBrandPage