import React, { useState, useContext } from 'react'
import { ADMIN_EDIT_ROUTE } from '../utils/consts'
import { Button, Col, Row, Table } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons';
import CreateType from '../components/modals/CreateType'
import { deleteType } from '../http/productAPI'
import { Context } from '../index'
import { useNavigate } from "react-router-dom"
import { observer } from 'mobx-react-lite'
import "../styles/admin.css"

const TypeInfo = observer(() => {
    const { product } = useContext(Context)
    const navigate = useNavigate()

    let types = []
    product.types.forEach(type => {
        types.push(type)
    })
    types.sort((a, b) => {
        return 1 * String(a.id).localeCompare(String(b.id))
    })

    const [typeVisible, setTypeVisible] = useState(false)

    const removeType = async (name) => {
        try {
            await deleteType({ name: name }).then(
                alert(`Раздел '${name}' был успешно удален`)
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
                        onClick={() => setTypeVisible(true)}
                    >
                        Добавить раздел <Icon.ListNested />
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
                            {types.map(type =>
                                <tr
                                    md="auto"
                                    key={type.id}
                                >
                                    <th style={{ width: '10%' }}>
                                        {type.id}
                                    </th>
                                    <th style={{ width: '50%' }}>
                                        {type.name}
                                    </th>
                                    <th>
                                        <Row>
                                            <Col className="d-grid">
                                                <Button
                                                    onClick={() => {
                                                        navigate(ADMIN_EDIT_ROUTE + '/type/' + type.id)
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
                                                        if (window.confirm(`Вы действительно хотите удалить производителя '${type.name}'?`)) {
                                                            removeType(type.name)
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
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        </div>
    )
})

export default TypeInfo