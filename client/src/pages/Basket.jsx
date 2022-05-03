import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Spinner, Table } from 'react-bootstrap'
import AdminLoader from '../components/AdminLoader'
import useFetchInfo from '../hooks/useFetchInfo'
import { fetchBasketItems } from '../http/productAPI'
import { Context } from '../index'
import * as Icon from 'react-bootstrap-icons';
import { DeleteBtn, SumDiv, Header, Image, InvisibleDiv, Purchase, TableDiv, TableDivH, EndDiv, Empty } from '../components/styled/Basket'
import ChangeBasketItems from '../components/modals/ChangeBasketItems'
import useItemMenuStorage from '../hooks/useItemMenuStorage'

const Basket = observer(() => {
    const { product } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const userId = localStorage.getItem('userId')
    const [showItemMenu, setShowItemMenu] = useItemMenuStorage('itemMenuStates', {})
    let sum = 0

    useFetchInfo()

    useEffect(() => {
        fetchBasketItems(userId).then(data => {
            product.setBasketItems(data)
            setItems(data)
        }).finally(() => setLoading(false))
    }, [userId])

    console.log(items)
    let prodObj = {}
    for (let prod of product.products) {
        prodObj[prod.id] = [prod.img, prod.name, prod.price]
    }
    if (loading) {
        return (
            <AdminLoader />
        )
    }

    if (items.length === 0) {
        return (
            <Empty>
                   <Spinner 
                   style={{margin: '30px'}}
                   animation="grow" /> Ваша корзина пуста! <Spinner 
                   style={{margin: '30px'}}
                   animation="grow" />
            </Empty>
        )
    }

    return (
        <Container style={{ maxWidth: '1100px' }}>
            <Row>
                <Header>Ваша корзина</Header>
            </Row>
            <hr />
            <Row style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                <Table bordered style={{ width: '1100px' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}></th>
                            <th style={{ width: '15%' }}></th>
                            <th style={{ width: '30%' }}>
                                <TableDivH>
                                    Продукт
                                </TableDivH>

                            </th>
                            <th style={{ width: '15%' }}>
                                <TableDivH>
                                    Цена за шт.
                                </TableDivH>

                            </th>
                            <th style={{ width: '15%' }}>
                                <TableDivH>
                                    Кол-во
                                </TableDivH>
                            </th>
                            <th style={{ width: '20%' }}>
                                <TableDivH>
                                    Сумма за продукт
                                </TableDivH>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.basketItems.map(item =>
                            <tr
                                md="auto"
                                key={item.id}
                            >
                                <th><DeleteBtn
                                    onClick={() => {
                                        setShowItemMenu({ ...showItemMenu, [item.productId]: true })
                                    }}
                                ><Icon.Gear /></DeleteBtn></th>
                                <ChangeBasketItems
                                    show={showItemMenu[item.productId]}
                                    onHide={() => setShowItemMenu({ ...showItemMenu, [item.productId]: false })}
                                    item={item}
                                >
                                </ChangeBasketItems>
                                <th style={{ display: 'flex', justifyContent: 'center' }}>
                                    {Object.keys(prodObj).includes(String(item.productId)) ?
                                        <Image
                                            src={process.env.REACT_APP_API_URL + prodObj[item.productId][0]}
                                            alt="" />
                                        : '-'}
                                </th>
                                <th>
                                    <TableDiv>
                                        {Object.keys(prodObj).includes(String(item.productId)) ? prodObj[item.productId][1] : '-'}
                                    </TableDiv>
                                </th>
                                <th>
                                    <TableDiv>
                                        {Object.keys(prodObj).includes(String(item.productId)) ? prodObj[item.productId][2] : '-'} ₽
                                    </TableDiv>
                                </th>
                                <th>
                                    <TableDiv>
                                        {item.quantity} шт.
                                    </TableDiv>
                                </th>
                                <th>
                                    <InvisibleDiv>
                                        {sum += item.price}
                                    </InvisibleDiv>
                                    <TableDiv>
                                        {item.price} ₽
                                    </TableDiv>
                                </th>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Row>
                    <SumDiv>
                        Итого: {sum} ₽
                    </SumDiv>
                </Row>
                <hr />
            </Row>
            <Row>
                <EndDiv>
                    <Purchase>Оформить заказ</Purchase>
                </EndDiv>
            </Row>

        </Container>
    )
})

export default Basket