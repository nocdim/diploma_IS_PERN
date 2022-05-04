import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import useFetchInfo from '../hooks/useFetchInfo'
import TypeInfo from '../components/TypeInfo'
import BrandInfo from '../components/BrandInfo'
import ProductInfo from '../components/ProductInfo'
import AdminInfo from '../components/AdminInfo'
import OrdersInfo from '../components/OrdersInfo'

const Admin = observer(() => {

    useFetchInfo()
    
    const storedTabKey = sessionStorage.getItem('storedTabKey')
    const [tabKey, setTabKey] = useState(
        (storedTabKey) ? storedTabKey : 'types'
    )

    useEffect(() => {
        sessionStorage.setItem('storedTabKey', tabKey)
    }, [tabKey])

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
                            <TypeInfo />
                        </Tab>
                        <Tab eventKey="brands" title="Производители">
                            <BrandInfo />
                        </Tab>
                        <Tab eventKey="products" title="Продукты">
                            <ProductInfo />
                        </Tab>
                        <Tab eventKey="orders" title="Заказы">
                            <OrdersInfo />
                        </Tab>
                        <Tab eventKey="admin" title="Администрирование">
                            <AdminInfo />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    )
})

export default Admin