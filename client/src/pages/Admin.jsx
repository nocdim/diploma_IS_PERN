import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateProduct from '../components/modals/CreateProduct'
import CreateType from '../components/modals/CreateType'

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)
    return (
        <Container>
            <Row>
                <Col className="d-flex flex-column">
                    <Button
                        variant={"outline-dark"}
                        className="mt-4 p-2"
                        onClick={() => setTypeVisible(true)}
                    >
                        Добавить тип
                    </Button>
                </Col>
                <Col className="d-flex flex-column">
                    <Button
                        variant={"outline-danger"}
                        className="mt-4 p-2"
                        
                    >
                        Изменить/Удалить тип
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex flex-column">
                    <Button
                        variant={"outline-dark"}
                        className="mt-4 p-2"
                        onClick={() => setBrandVisible(true)}
                    >
                        Добавить брэнд
                    </Button>
                </Col>
                <Col className="d-flex flex-column">
                    <Button
                        variant={"outline-danger"}
                        className="mt-4 p-2"
                        
                    >
                        Изменить/Удалить брэнд
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex flex-column">
                    <Button
                        variant={"outline-dark"}
                        className="mt-4 p-2"
                        onClick={() => setProductVisible(true)}
                    >
                        Добавить продукт
                    </Button>
                </Col>
                <Col className="d-flex flex-column">
                    <Button
                        variant={"outline-danger"}
                        className="mt-4 p-2"
                        
                    >
                        Изменить/Удалить продукт
                    </Button>
                </Col>
            </Row>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        </Container>
    )
}
export default Admin