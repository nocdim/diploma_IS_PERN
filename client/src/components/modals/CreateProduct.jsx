import React, { useContext, useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Dropdown, Col, Row, Table } from "react-bootstrap"
import { Context } from "../../index"
import { createProduct } from "../../http/productAPI"
import { observer } from "mobx-react-lite";
import "../../styles/admin.css"


const CreateProduct = observer(({ show, onHide }) => {
    const { product } = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState('')
    const [info, setInfo] = useState([])
    const fileInputRef = useRef()

    let types = []
    product.types.forEach(type => {
        types.push(type)
    })
    types.sort((a, b) => {
        return 1 * String(a.id).localeCompare(String(b.id))
    })
    let brands = []
    product.brands.forEach(brand => {
        brands.push(brand)
    })
    brands.sort((a, b) => {
        return 1 * String(a.id).localeCompare(String(b.id))
    })

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

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

    const addProduct = async () => {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('price', `${price}`)
            formData.append('img', image)
            formData.append('brandId', product.selectedBrand.id)
            formData.append('typeId', product.selectedType.id)
            formData.append('info', JSON.stringify(info))
            await createProduct(formData)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Добавить продукт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Row style={{ margin: 'auto', display: 'flex' }}>
                        <Col
                            className="d-flex justify-content-center"
                            style={{ marginRight: '-20px' }}
                            md={{ span: 4 }}
                        >
                            {preview ?
                                <img
                                    className="img"
                                    src={preview}
                                    alt={preview}
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
                        </Col>
                        <Col md={{ span: 8 }} style={{ margin: 'auto' }}>
                            <Table
                                style={{ tableLayout: 'fixed' }}
                                size="sm"
                                borderless>
                                <tbody >
                                    <tr>
                                        <td >
                                            <Dropdown className="d-grid mt-2">
                                                <Dropdown.Toggle>{product.selectedType.name || "Выберите раздел"}</Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {types.map(type =>
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
                                        </td>
                                        <td style={{ tableLayout: 'fixed' }}>
                                            <Dropdown className="d-grid mt-2">
                                                <Dropdown.Toggle>{product.selectedBrand.name || "Выберите производителя"}</Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {brands.map(brand =>
                                                        <Dropdown.Item
                                                            onClick={() => product.setSelectedBrand(brand)}
                                                            key={brand.id}
                                                        >
                                                            {brand.name}
                                                        </Dropdown.Item>
                                                    )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <Form.Control
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                className="mt-3"
                                                placeholder="Введите название продукта"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <Form.Control
                                                value={price}
                                                onChange={e => setPrice(e.target.value)}
                                                className="mt-3"
                                                placeholder="Введите стоимость продукта"
                                                type="number"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <hr />
                    <Row className="d-grid" style={{ margin: '5px' }}>
                        <Button
                            style={{ marginTop: '10px' }}
                            variant={"outline-dark"}
                            onClick={addInfo}
                        >
                            Добавить новое свойство
                        </Button>
                    </Row>

                    {info.map(i =>
                        <Row className="mt-3" key={i.number} style={{ margin: '0px 5px 0px 20px' }}>
                            <Col md={{ span: 5 }}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={{ span: 5 }}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={{ span: 2 }}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addProduct}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct