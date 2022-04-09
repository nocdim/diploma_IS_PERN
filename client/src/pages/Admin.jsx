import React, { useState, useContext, useEffect } from 'react'
import { Button, Col, Container, Row, Card, Image, Tabs, Tab, Table } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateProduct from '../components/modals/CreateProduct'
import CreateType from '../components/modals/CreateType'
import { deleteBrand, deleteType } from '../http/productAPI'
import { Context } from '../index'
import * as Icon from 'react-bootstrap-icons';
import { observer } from 'mobx-react-lite'

const Admin = observer(() => {
    const { product } = useContext(Context)

    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)

    const storedTabKey = sessionStorage.getItem('storedTabKey')
    const [tabKey, setTabKey] = useState(
        (storedTabKey) ? storedTabKey : 'types'
    )

    useEffect(() => {
        sessionStorage.setItem('storedTabKey', tabKey)
    }, [tabKey])

    const removeType = async (name) => {
        try {
            await deleteType({ name: name }).then(
                alert(`Раздел '${name}' был успешно удален`)
            ).then(window.location.reload())
        } catch (e) {
            alert(e)
        }
    }

    const removeBrand = async (name) => {
        try {
            await deleteBrand({ name: name }).then(
                alert(`Производитель '${name}' был успешно удален`)
            ).then(window.location.reload())
        } catch (e) {
            alert(e)
        }
    }

    return (
        <Container>
            <Row className="mt-3">
                <Col className="d-flex flex-column">
                    <Tabs
                        className="mb-3"
                        activeKey={tabKey}
                        onSelect={(k) => setTabKey(k)}
                    >
                        <Tab eventKey="types" title="Разделы">
                            <Row>
                                <Col className="d-flex flex-column" md={{ span: 2 }}>
                                    <Button
                                        variant={"outline-primary"}
                                        className="mt-4 p-2"
                                        onClick={() => setTypeVisible(true)}
                                    >
                                        Добавить раздел <Icon.FlagFill />
                                    </Button>
                                </Col>
                            </Row>
                            <Row >
                                {product.types.map(type =>
                                    <Col className="d-flex flex-column mt-4 "
                                        md="auto"
                                        key={type.id}

                                    >
                                        <Card
                                            style={{ cursor: 'pointer', width: '196px' }}
                                            key={type.id}
                                            border={'white'}

                                        >
                                            <Card.Title>
                                                {type.name}
                                            </Card.Title>
                                            <Card.Img
                                                variant="top"
                                                src={process.env.REACT_APP_API_URL + type.img}
                                            />
                                            <Card.Body >
                                                <Row>
                                                    <Col className="d-flex flex-column">
                                                        <Button variant="outline-dark" key={type.id}>
                                                            <Icon.PenFill />
                                                        </Button>

                                                    </Col>
                                                    <Col className="d-flex flex-column">
                                                        <Button
                                                            variant="outline-danger"
                                                            key={type.id}
                                                            onClick={() => {
                                                                if (window.confirm(`Вы действительно хотите удалить раздел '${type.name}'?`)) {
                                                                    removeType(type.name)
                                                                }
                                                            }}
                                                        >
                                                            <Icon.Trash3 />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )}
                            </Row>
                        </Tab>
                        <Tab eventKey="brands" title="Производители">
                            <Row>
                                <Col className="d-flex flex-column" md={{ span: 3 }}>
                                    <Button
                                        variant={"outline-primary"}
                                        className="mt-4 p-2"
                                        onClick={() => setBrandVisible(true)}
                                    >
                                        Добавить производителя <Icon.LayersHalf />
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-flex flex-column mt-4" >
                                    <Table bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Название</th>
                                                <th>Опции</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.brands.map(brand =>
                                                <tr
                                                    md="auto"
                                                    key={brand.id}
                                                >
                                                    <th style={{ width: '10%' }}>
                                                        {brand.id}
                                                    </th>
                                                    <th style={{ width: '50%' }}>
                                                        {brand.name}
                                                    </th>
                                                    <th>
                                                        <Row>
                                                            <Col className="d-grid">
                                                                <Button variant="outline-dark" size="sm">
                                                                    Изменить <Icon.PenFill />
                                                                </Button>

                                                            </Col>
                                                            <Col className="d-grid">
                                                                <Button
                                                                    variant="outline-danger"
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        if (window.confirm(`Вы действительно хотите удалить производителя '${brand.name}'?`)) {
                                                                            removeBrand(brand.name)
                                                                        }
                                                                    }}
                                                                >
                                                                    Удалить <Icon.Trash3 />
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </th>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="products" title="Продукты">
                            <Row>
                                <Col className="d-flex flex-column" md={{ span: 2 }}>
                                    <Button
                                        variant={"outline-primary"}
                                        className="mt-4 p-2"
                                        onClick={() => setProductVisible(true)}
                                    >
                                        Добавить продукт <Icon.EggFried />
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                {product.products.map(product =>
                                    <Col
                                        key={product.id}
                                        md="auto"
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
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        </Container>
    )
})

export default Admin