import React, { useState, useContext } from 'react'
import { ADMIN_EDIT_ROUTE } from '../utils/consts'
import { Button, Col, Row, Table } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { Context } from '../index'
import { useNavigate } from "react-router-dom"
import CreateBrand from '../components/modals/CreateBrand'
import { deleteBrand } from '../http/productAPI'
import { observer } from 'mobx-react-lite'

const BrandInfo = observer(() => {

    const { product } = useContext(Context)
    const navigate = useNavigate()
    let brands = [];
    product.brands.forEach(brand => {
        brands.push(brand)
    })
    brands.sort((a, b) => {
        return 1 * String(a.id).localeCompare(String(b.id))
    })

    const [brandVisible, setBrandVisible] = useState(false)

    const removeBrand = async (name) => {
        try {
            await deleteBrand({ name: name }).then(
                alert(`Производитель '${name}' был успешно удален`)
            ).finally(window.location.reload())
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div>
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
                                <th>
                                    #
                                </th>
                                <th>
                                    Название
                                </th>
                                <th>Опции</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.map(brand =>
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
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
        </div>
    )
})

export default BrandInfo