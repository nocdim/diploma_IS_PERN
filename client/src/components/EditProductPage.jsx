import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container, Row, Button, Col, Form, Dropdown, InputGroup } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom'
import "../styles/admin.css"
import AdminLoader from './AdminLoader';
import { fetchOneProduct } from '../http/productAPI'
import { Context } from "../index.js"
import useFetchInfo from '../hooks/useFetchInfo';
import { observer } from 'mobx-react-lite';
import { ADMIN_ROUTE } from '../utils/consts';

const EditProductPage = observer(() => {
    const { product } = useContext(Context)
    useFetchInfo()

    const [loading, setLoading] = useState(true)
    const [productInfo, setProductInfo] = useState({ info: [] })
    const [info, setInfo] = useState([])
    const [preview, setPreview] = useState('')
    const [newName, setNewName] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [image, setImage] = useState(null)
    let { id } = useParams()
    const fileInputRef = useRef()
    const navigate = useNavigate()

    let typesObj = {}
    let brandsObj = {}
    for (let type of product.types) {
        typesObj[type.id] = type.name
    }
    for (let brand of product.brands) {
        brandsObj[brand.id] = brand.name
    }

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    useEffect(() => {
        fetchOneProduct(id).then(data => {
            setProductInfo(data)
            setPreview(process.env.REACT_APP_API_URL + data.img)
            setNewName(data.name)
            setNewPrice(data.price)
        }).finally(() => setLoading(false))
    }, [id])

    useEffect(() => {
        let count = 0
        productInfo.info.map((i) => {
            info.push({ title: i.title, description: i.description, number: Date.now() + count })
            count++
        })

    }, [productInfo])

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
        <div>
            <Row>
                <Col className="d-flex flex-column">
                    <h2 className="mt-4">Редактирование продукта "{productInfo.name}"</h2>
                </Col>
                <Col className="d-flex justify-content-end align-items-end">
                    Создан: {productInfo.createdAt.substr(0, 10)} Изменён: {productInfo.updatedAt.substr(0, 10)}
                </Col>
            </Row>
            <Form>
                <Row>
                    <Col className="d-flex flex-column" md={2}>
                        <div className="mt-2">
                            {preview ?
                                <img
                                    className="img"
                                    src={preview}
                                    alt="Кликните сюда, чтобы поменять изображение"
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
                    <Col style={{ margin: 'auto' }}>
                        <Row className="my-4">
                            <Col>
                                <Dropdown className="d-grid">
                                    <Dropdown.Toggle>
                                        {product.selectedType.name
                                            ? product.selectedType.name
                                            : Object.keys(typesObj).includes(String(productInfo.typeId))
                                                ? typesObj[productInfo.typeId]
                                                : '-'
                                        }
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {product.types.map(type =>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    product.setSelectedType(type)
                                                }}
                                                key={type.id}
                                            >
                                                {type.name}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Dropdown className="d-grid">
                                    <Dropdown.Toggle>
                                        {product.selectedBrand.name
                                            ? product.selectedBrand.name
                                            : Object.keys(brandsObj).includes(String(productInfo.brandId))
                                                ? brandsObj[productInfo.brandId]
                                                : '-'
                                        }
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {product.brands.map(brand =>
                                            <Dropdown.Item
                                                onClick={() => product.setSelectedBrand(brand)}
                                                key={brand.id}
                                            >
                                                {brand.name}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Название</InputGroup.Text>
                                    <Form.Control
                                        value={newName}
                                        onChange={(event) => { setNewName(event.target.value) }}
                                        placeholder="Введите название продукта"
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Стоимость</InputGroup.Text>
                                    <Form.Control
                                        value={newPrice}
                                        onChange={(event) => { setNewPrice(event.target.value) }}
                                        placeholder="Введите стоимость продукта"
                                        type="number"
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col className="d-flex flex-column">
                        <Button
                            style={{ width: '200px' }}
                            className="my-2"
                            variant={"outline-dark"}
                            onClick={addInfo}
                        >
                            Добавить свойство
                        </Button>
                    </Col>
                </Row>
                {info.map(i =>
                    <Row className="mt-3" key={i.number}>
                        <Col md={5}>
                            <Form.Control
                                value={i.title}
                                onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                placeholder="Введите название свойства"
                            />
                        </Col>
                        <Col md={5}>
                            <Form.Control
                                value={i.description}
                                onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                placeholder="Введите описание свойства"
                            />
                        </Col>
                        <Col className="d-grid">
                            <Button
                                onClick={() => {
                                    removeInfo(i.number)
                                }}
                                variant={"outline-danger"}
                            >
                                Удалить
                            </Button>
                        </Col>
                    </Row>
                )}
                <hr />
                <div className="d-flex justify-content-end">
                    <Button
                        style={{ width: '90px' }}
                        className="mx-2"
                        variant="outline-danger"
                        onClick={() => navigate(ADMIN_ROUTE)}
                    >
                        Назад
                    </Button>
                    <Button
                        variant="outline-success"

                    >
                        Изменить
                    </Button>
                </div>
            </Form>
        </div>
    )
})

export default EditProductPage