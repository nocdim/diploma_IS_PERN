import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import ProductList from '../components/ProductList'
import { observer } from 'mobx-react-lite'
import Pages from "../components/Pages"
import useFetchInfo from '../hooks/useFetchInfo'
import Background from '../components/styled/Background'


const Shop = observer(() => {

    useFetchInfo()

    return (
        <Background>
            <Container>
                <Row className="mt-2">
                    <Col md={3}>
                        <TypeBar />
                    </Col>
                    <Col md={9}>
                        <BrandBar />
                        <ProductList />
                        <Pages />
                    </Col>
                </Row>
            </Container>
        </Background>
    )
})
export default Shop