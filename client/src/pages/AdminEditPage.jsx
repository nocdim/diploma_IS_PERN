import React, { useState, useEffect} from 'react';
import { Container, Row, Form, Button, Col, InputGroup } from 'react-bootstrap';
import AdminLoader from '../components/AdminLoader'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchOneBrand, fetchOneType, updateBrand } from '../http/productAPI';
import { ADMIN_ROUTE } from '../utils/consts';

const AdminEditPage = () => {
    const [loading, setLoading] = useState(true)
    let { subject } = useParams()
    let { id } = useParams()
    const navigate = useNavigate()

    const [type, setType] = useState({ name: '' })
    const [brand, setBrand] = useState({ name: '' })
    const [newBrand, setNewBrand] = useState('')

    useEffect(() => {
        if (subject === 'type') {
            fetchOneType(id).then(data => {
                setType(data)
            }).finally(() => setLoading(false))
            return
        } else if (subject === 'brand') {
            fetchOneBrand(id).then(data => {
                setBrand(data)
                setNewBrand(data.name)
            }).finally(() => setLoading(false))
            return
        } else if (subject === 'product') {
            console.log(subject)
            return
        }
    }, [subject, id])

    const changeBrand = async () => {
        try {
            await updateBrand({ oldName: brand.name, name: newBrand })
            alert(`Производитель '${newBrand}' был успешно обновлён`)
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
        <Container>
            {subject === 'type'
                ?
                <div>
                    <Row>
                        <Col className="d-flex flex-column">
                            <h2 className="mt-4">Редактирование раздела "{type.name}"</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        
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