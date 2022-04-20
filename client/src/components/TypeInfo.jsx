import React, { useState, useContext } from 'react'
import { ADMIN_EDIT_ROUTE } from '../utils/consts'
import { Button, Col, Row, Card } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons';
import CreateType from '../components/modals/CreateType'
import { deleteType } from '../http/productAPI'
import { Context } from '../index'
import { useNavigate } from "react-router-dom"

const TypeInfo = () => {
    const { product } = useContext(Context)
    const navigate = useNavigate()

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
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        </div>
    )
}

export default TypeInfo