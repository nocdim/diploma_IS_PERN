import React, { useState, useContext } from 'react'
import { Button, Col, Container, Row, Card, Image } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateProduct from '../components/modals/CreateProduct'
import CreateType from '../components/modals/CreateType'
import { Context } from '../index'
import ProductItem from "../components/ProductItem"

const Admin = () => {
    const { product } = useContext(Context)

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
                        Добавить раздел
                    </Button>
                </Col>
                <Col className="d-flex flex-column">
                    <Button
                        variant={"outline-dark"}
                        className="mt-4 p-2"
                        onClick={() => setBrandVisible(true)}
                    >
                        Добавить производителя
                    </Button>
                </Col>
                <Col className="d-flex flex-column">
                    <Button
                        variant={"outline-dark"}
                        className="mt-4 p-2"
                        onClick={() => setProductVisible(true)}
                    >
                        Добавить продукт
                    </Button>
                </Col>
            </Row>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <Row>
                <Col className="d-flex flex-column">
                    <h2 style={{ margin: '0 auto', padding: '30px' }}>
                        Производители
                    </h2>
                </Col>
            </Row>
            <Row>
                {product.brands.map(brand =>
                    <Col className="d-flex flex-column"
                        key={brand.id}
                    >
                        <Card
                            style={{ cursor: 'pointer' }}
                            key={brand.id}
                            className="p-3"
                            border={'danger'}
                        >
                            {brand.name}
                        </Card>
                    </Col>
                )}
            </Row>
            <Row>
                <Col className="d-flex flex-column">
                    <h2 style={{ margin: '0 auto', padding: '30px' }}>
                        Разделы
                    </h2>
                </Col>
            </Row>
            <Row>
                {product.types.map(type =>
                    <Col className="d-flex flex-column"
                        key={type.id}
                    >
                        <Card
                            style={{ cursor: 'pointer' }}
                            key={type.id}
                            className="p-3"
                            border={'danger'}
                        >
                            {type.name}
                            <Image width={150} height={150} src={process.env.REACT_APP_API_URL + type.img} />
                        </Card>
                    </Col>
                )}
            </Row>
            <Row>
                <Col className="d-flex flex-column">
                    <h2 style={{ margin: '0 auto', padding: '30px' }}>
                        Продукты
                    </h2>
                </Col>
            </Row>
            <Row>
                {product.products.map(product =>
                    <Col
                        key={product.id}
                    >
                        <Card
                            style={{ cursor: 'pointer' }}
                            key={product.id}
                            className="p-3"
                            border={'danger'}
                        >
                            <Image width={150} height={150} src={process.env.REACT_APP_API_URL + product.img} />
                            <div>{product.name}</div>
                        </Card>
                    </Col>

                )}
            </Row>
        </Container>
    )
}
export default Admin