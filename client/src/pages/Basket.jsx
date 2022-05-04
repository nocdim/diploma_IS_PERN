import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Form, Row, Spinner, Table } from 'react-bootstrap'
import AdminLoader from '../components/AdminLoader'
import useFetchInfo from '../hooks/useFetchInfo'
import { fetchBasketItems, placeOrder } from '../http/productAPI'
import { Context } from '../index'
import * as Icon from 'react-bootstrap-icons';
import { DeleteBtn, SumDiv, Header, Image, InvisibleDiv, Purchase, TableDiv, TableDivH, EndDiv, Empty } from '../components/styled/Basket'
import ChangeBasketItems from '../components/modals/ChangeBasketItems'
import useItemMenuStorage from '../hooks/useItemMenuStorage'
import { useNavigate } from 'react-router-dom'
import { SUCCESS_ROUTE } from '../utils/consts'

const Basket = observer(() => {
    const { product } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [payType, setPayType] = useState('')
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [showItemMenu, setShowItemMenu] = useItemMenuStorage('itemMenuStates', {})
    let sum = 0

    useFetchInfo()

    useEffect(() => {
        fetchBasketItems(userId).then(data => {
            product.setBasketItems(data)
            setItems(data)
        }).finally(() => setLoading(false))
    }, [userId])

    let prodObj = {}
    for (let prod of product.products) {
        prodObj[prod.id] = [prod.img, prod.name, prod.price]
    }

    const makeOrder = async () => {
        try {
            if (payType === 'Выберите способ оплаты...' || payType === '') {
                alert('Выберите способ оплаты!')
            } else {
                const formData = new FormData()
                formData.append('userId', userId)
                formData.append('sum', sum)
                formData.append('payType', payType)
                await placeOrder(formData)
                navigate(SUCCESS_ROUTE)
            }
        } catch (e) {
            alert(e.response.data.message)
        }
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
                    style={{ margin: '30px' }}
                    animation="grow" /> Ваша корзина пуста! <Spinner
                    style={{ margin: '30px' }}
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
                    
                        <Form.Select 
                        onChange={(e) => setPayType(e.target.value)}
                        style={{ height: '40px', margin: '1rem 1rem 0rem 0rem' }} 
                        >
                            <option>Выберите способ оплаты...</option>
                            <option>Наличные</option>
                            <option>Карта</option>
                            <option>Карта-онлайн</option>
                        </Form.Select>
                    
                    <Purchase onClick={() => makeOrder()}>Оформить заказ</Purchase>
                </EndDiv>
            </Row>

        </Container>
    )
})

export default Basket