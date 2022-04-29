import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import ProductList from '../components/ProductList'
import { observer } from 'mobx-react-lite'
import Pages from "../components/Pages"
import useFetchInfo from '../hooks/useFetchInfo'


const Shop = observer(() => {

    useFetchInfo()

    return (
        <Container style={{ maxWidth: '87%' }}>
            <Row className="pt-3">
                <Col md={2}>
                    <TypeBar />
                </Col>
                <Col md={8} >
                    <ProductList />
                    <Pages />
                </Col>
                <Col md={2}>
                    <BrandBar />
                </Col>
            </Row>
        </Container>
    )
})
export default Shop