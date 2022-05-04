import React, { useContext } from 'react'
import { Context } from '../index'
import { Col, Row, Table } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

const OrdersInfo = observer(() => {
    let i = 0
    const { product, user } = useContext(Context)
    let usersObj = {}
    for (let usr of user.users) {
        usersObj[usr.id] = usr.email
    }
    return (
        <div>
            <Row>
                <div style={{display: 'flex', justifyContent: 'center', fontSize:'40px'}}>
                Заказы покупателей
                </div>
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
                                    Email покупателя
                                </th>
                                <th>Продукты</th>
                                <th>Дата покупки</th>
                                <th>Сумма покупки</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.allOrders.map(order =>
                                <tr
                                    md="auto"
                                    key={order.id}
                                >
                                    <th style={{ width: '5%' }}>
                                        {++i}
                                    </th>
                                    <th style={{ width: '20%' }}>
                                        {Object.keys(usersObj).includes(String(order.userId)) ? usersObj[order.userId] : '-'}
                                    </th>
                                    <th style={{ width: '40%' }}>
                                        {order.products}
                                    </th>
                                    <th style={{ width: '20%' }}>
                                        {order.createdAt.substr(0, 10)}
                                    </th>
                                    <th style={{ width: '15%' }}>
                                        {order.sum}
                                    </th>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
})

export default OrdersInfo