import React from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom'
import "../styles/admin.css"
import EditTypePage from '../components/EditTypePage';
import EditBrandPage from '../components/EditBrandPage';
import EditProductPage from '../components/EditProductPage';

const AdminEditPage = () => {
    let { subject } = useParams()

    return (
        <Container>
            {subject === 'type'
                ?
                <EditTypePage />
                :
                subject === 'brand'
                    ?
                    <EditBrandPage />
                    :
                    subject === 'product'
                        ?
                        <EditProductPage />
                        :
                        <div>
                            <Row >
                                <Col>
                                    <h2 className="mt-4 ">Что-то пошло не так...</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-4">
                                    <Button
                                        onClick={() => {window.history.go(-1); return false}}
                                        size="lg"
                                    >
                                        Назад <Icon.ArrowReturnLeft />
                                    </Button>
                                </Col>
                            </Row>
                        </div>
            }
        </Container>
    )
}

export default AdminEditPage