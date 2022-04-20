import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { ADMIN_EDIT_ROUTE, ADMIN_ROUTE } from '../utils/consts'
import { Button, Col, Container, Row, Card, Tabs, Tab, Table } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateProduct from '../components/modals/CreateProduct'
import CreateType from '../components/modals/CreateType'
import ShowImg from '../components/modals/ShowImg'
import { deleteBrand, deleteType, deleteProduct, fetchProducts } from '../http/productAPI'
import { Context } from '../index'
import * as Icon from 'react-bootstrap-icons';
import { observer } from 'mobx-react-lite'
import useFetchInfo from '../hooks/useFetchInfo'
import useLocalImgStorageStates from '../hooks/useLocalStorageImgStates'

const Admin = observer(() => {
    const { product } = useContext(Context)

    useFetchInfo()

    const [showImage, setShowImage] = useLocalImgStorageStates('imgStates', {})

    let typesObj = {}
    for (let type of product.types) {
        typesObj[type.id] = type.name
    }
    let brandsObj = {}
    for (let brand of product.brands) {
        brandsObj[brand.id] = brand.name
    }

    const navigate = useNavigate()
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
            ).finally(window.location.reload())
        } catch (e) {
            alert(e)
        }
    }

    const removeBrand = async (name) => {
        try {
            await deleteBrand({ name: name }).then(
                alert(`Производитель '${name}' был успешно удален`)
            ).finally(window.location.reload())
        } catch (e) {
            alert(e)
        }
    }

    const removeProduct = async (name) => {
        try {
            await deleteProduct({ name: name }).then(
                alert(`Продукт '${name}' был успешно удален`)
            ).finally(window.location.reload())
        } catch (e) {
            alert(e)
        }
    }

    return (
        <Container >
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
                                    <Col className="d-flex flex-column mt-4"
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
                                                        <Button
                                                            onClick={() => {
                                                                navigate(ADMIN_EDIT_ROUTE + '/type/' + type.id)
                                                            }}
                                                            variant="outline-dark"
                                                        >
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
                                                                <Button
                                                                    onClick={() => {
                                                                        navigate(ADMIN_EDIT_ROUTE + '/brand/' + brand.id)
                                                                    }}
                                                                    variant="outline-dark"
                                                                    size="sm"
                                                                >
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
                            <Row className="d-flex">
                                <Col className="d-flex flex-column mt-4">
                                    <Table bordered hover >
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Название</th>
                                                <th>Цена</th>
                                                <th>Раздел</th>
                                                <th>Производитель</th>
                                                <th>Опции</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.products.map(product =>
                                                <tr
                                                    md="auto"
                                                    key={product.id}
                                                >
                                                    <th style={{ width: '5%' }}>
                                                        {product.id}
                                                    </th>
                                                    <th style={{ width: '30%' }}>
                                                        {product.name}
                                                    </th>
                                                    <th style={{ width: '10%' }}>
                                                        {product.price} ₽
                                                    </th>
                                                    <th style={{ width: '15%' }}>
                                                        {Object.keys(typesObj).includes(String(product.typeId)) ? typesObj[product.typeId] : '-'}
                                                    </th>
                                                    <th style={{ width: '20%' }}>
                                                        {Object.keys(brandsObj).includes(String(product.brandId)) ? brandsObj[product.brandId] : '-'}
                                                    </th>
                                                    <th style={{ width: '20%' }}>
                                                        <div className="d-flex justify-content-center">
                                                            <Button
                                                                className="mx-4"
                                                                variant="outline-primary"
                                                                onClick={() => {
                                                                    setShowImage({...showImage, [product.id]: true})
                                                                }}
                                                            >
                                                                <Icon.CameraFill />
                                                            </Button>
                                                            <Button
                                                                className="mx-4"
                                                                onClick={() => {
                                                                    navigate(ADMIN_EDIT_ROUTE + '/product/' + product.id)
                                                                }}
                                                                variant="outline-dark"
                                                            >
                                                                <Icon.PenFill />
                                                            </Button>
                                                            <Button
                                                                className="mx-4"
                                                                variant="outline-danger"
                                                                onClick={() => {
                                                                    if (window.confirm(`Вы действительно хотите удалить продукт '${product.name}'?`)) {
                                                                        removeProduct(product.name)
                                                                    }
                                                                }}
                                                            >
                                                                <Icon.Trash3 />
                                                            </Button>
                                                            <ShowImg
                                                                show={showImage[product.id]}
                                                                onHide={() => setShowImage({...showImage, [product.id]: false })}
                                                                imgSrc={process.env.REACT_APP_API_URL + product.img}
                                                            />
                                                        </div>
                                                    </th>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Col>
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