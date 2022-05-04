import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Spinner, Table } from 'react-bootstrap'
import AdminLoader from '../components/AdminLoader'
import { Empty, Header, InvisibleDiv, SumDiv } from '../components/styled/Basket'
import { fetchOrders } from '../http/productAPI'
import { Context } from '../index'

const Orders = () => {
    let i = 0
    let sum = 0
    const { product } = useContext(Context)
    const userId = localStorage.getItem('userId')
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        fetchOrders(userId).then(data => {
            product.setOrders(data)
            setOrders(data)
        }).finally(() => setLoading(false))
    }, [userId])


    console.log(product.orders)
    if (loading) {
        return (
            <AdminLoader />
        )
    }

    if (orders.length === 0) {
        return (
            <Empty>
                <Spinner
                    style={{ margin: '30px' }}
                    animation="grow" /> Вы ещё не делали покупок! <Spinner
                    style={{ margin: '30px' }}
                    animation="grow" />
            </Empty>
        )
    }

    return (
        <Container>
            <Row>
                <Header>Ваши покупки!</Header>
            </Row>
            <hr />
            <Row className="d-flex">
                <Col className="d-flex flex-column mt-4">
                    <Table bordered hover >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Продукты</th>
                                <th>Оплата</th>
                                <th>Дата покупки</th>
                                <th>Сумма</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.orders.map(order =>
                                <tr
                                    md="auto"
                                    key={order.id}
                                >
                                    <th style={{ width: '5%' }}>
                                        {++i}
                                    </th>
                                    <th style={{ width: '40%' }}>
                                        {order.products}
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        {order.payType}
                                    </th>
                                    <th style={{ width: '15%' }}>
                                        {order.createdAt.substr(0, 10)}
                                    </th>
                                    <th style={{ width: '10%' }}>
                                    <InvisibleDiv>
                                        {sum += order.sum}
                                    </InvisibleDiv>
                                        {order.sum} ₽
                                    </th>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <hr />
                    <Row>
                        <SumDiv>
                            В сумме вы потратили: {sum} ₽
                        </SumDiv>
                    </Row>
                    
                </Col>
            </Row>
        </Container>
    )
}

export default Orders