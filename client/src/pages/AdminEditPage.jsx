import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button, Col, InputGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'
import { fetchOneBrand, updateBrand } from '../http/productAPI';
import { ADMIN_ROUTE } from '../utils/consts';

const AdminEditPage = () => {
    let { type } = useParams()
    let { id } = useParams()
    const navigate = useNavigate()

    const [brand, setBrand] = useState({ name: '' })
    const [newBrand, setNewBrand] = useState('')

    useEffect(() => {
        if (type === 'type') {
            console.log(type)
            return
        } else if (type === 'brand') {
            fetchOneBrand(id).then(data => {
                setBrand(data)
                setNewBrand(data.name)
            })
            return
        } else if (type === 'product') {
            console.log(type)
            return
        }
    }, [type, id])

    const changeBrand = async () => {
        try {
            await updateBrand({ oldName: brand.name, name: newBrand })
            alert(`Производитель '${newBrand}' был успешно обновлён`)
            navigate(ADMIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container>
            {type === 'type'
                ?
                <h2>Редактирование раздела</h2>
                :
                type === 'brand'
                    ?
                    <div>
                        <Row>
                            <Col className="d-flex flex-column">
                                <h2 className="mt-4">Редактирование брэнда "{brand.name}"</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex flex-column">
                                <Form className="mt-2">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>Название</InputGroup.Text>
                                        <Form.Control
                                            value={newBrand}
                                            onChange={(event) => { setNewBrand(event.target.value) }}
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