import React, { useState, useContext } from 'react'
import { ADMIN_EDIT_ROUTE } from '../utils/consts'
import { useNavigate } from "react-router-dom"
import { Col, Row, Table, Button } from 'react-bootstrap'
import { deleteProduct } from '../http/productAPI'
import * as Icon from 'react-bootstrap-icons'
import { Context } from '../index'
import useLocalImgStorageStates from '../hooks/useLocalStorageImgStates'
import CreateProduct from '../components/modals/CreateProduct'
import ShowImg from './modals/ShowImg'
import { observer } from 'mobx-react-lite'

const ProductInfo = observer(() => {
    const { product } = useContext(Context)
    const navigate = useNavigate()

    let products = []
    product.products.forEach(product => {
        products.push(product)
    })
    products.sort((a, b) => {
        return 1 * String(a.id).localeCompare(String(b.id))
    })

    const [productVisible, setProductVisible] = useState(false)
    const [showImage, setShowImage] = useLocalImgStorageStates('imgStates', {})

    let typesObj = {}
    for (let type of product.types) {
        typesObj[type.id] = type.name
    }
    let brandsObj = {}
    for (let brand of product.brands) {
        brandsObj[brand.id] = brand.name
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
        <div>
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
                            {products.map(product =>
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
                                                    setShowImage({ ...showImage, [product.id]: true })
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
                                                onHide={() => setShowImage({ ...showImage, [product.id]: false })}
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
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)} />
        </div>
    )
})

export default ProductInfo