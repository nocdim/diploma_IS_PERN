import React, { useState, useEffect, useContext } from 'react'
import { Container, Col, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { addToBasket, createComment, fetchComments, fetchOneProduct } from '../http/productAPI'
import star from "../assets/star.png";
import { BottomDiv, BtnContainer, Button, CommentDiv, CommentHeader, ImgDiv, Rating, TopDiv } from '../components/styled/ProductPage'
import GiveRating from "../components/modals/GiveRating"
import AdminLoader from '../components/AdminLoader';
import styled from 'styled-components';
import Input from '../components/Input';
import { Context } from '../index';
import { fetchUsers } from '../http/userAPI';

const ProductPage = () => {
    const { product, user } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const productId = useParams('productId')
    const [quantity, setQuantity] = useState(1)
    const [ratingVisible, setRatingVisible] = useState(false)
    const [comment, setComment] = useState('')
    let link = window.location.href.substring(21)
    const [inProduct, setInProduct] = useState({ info: [] })
    const { id } = useParams()
    
    let usersObj = {}
    for (let usr of user.users) {
        usersObj[usr.id] = usr.email
    }
    useEffect(() => {
        fetchComments(id).then(data => product.setComments(data))
        fetchOneProduct(id).then(data => setInProduct(data)).finally(() => setLoading(false))
        fetchUsers().then(data => user.setUsers(data))
    }, [id])

    const toBasket = async () => {
        try {
            const formData = new FormData()
            formData.append('productId', inProduct.id)
            formData.append('userId', localStorage.getItem('userId'))
            formData.append('quantity', quantity)
            await addToBasket(formData)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const makeComment = async () => {
        try {
            const formData = new FormData()
            formData.append('comment', comment)
            formData.append('userId', localStorage.getItem('userId'))
            formData.append('productId', productId.id)
            await createComment(formData)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    if (loading) {
        return (
            <AdminLoader />
        )
    }

    return (
        <Container>
            <Row className="mt-4">
                <TopDiv>
                    <h2>
                        {inProduct.name}
                    </h2>
                    {localStorage.getItem('userRole') === 'USER' ?
                        <Rating userRole={localStorage.getItem('userRole')} onClick={() => setRatingVisible(true)}>
                            <h3>Рейтинг {inProduct.rating.toFixed(1)}<img src={star} alt="" /></h3>
                        </Rating>
                        :
                        <Rating userRole={localStorage.getItem('userRole')}>
                            <h3>Рейтинг {inProduct.rating.toFixed(1)}<img src={star} alt="" /></h3>
                        </Rating>
                    }
                </TopDiv>
                <hr />
            </Row>

            <Row>
                <Col md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                    <ImgDiv>
                        <img src={process.env.REACT_APP_API_URL + inProduct.img} alt="" />
                    </ImgDiv>
                </Col>
                <Col md={8} style={{ display: 'grid', alignItems: 'center' }}>
                    <div>
                        <Row style={{ background: 'transparent', padding: 12, fontSize: 30 }}>
                            Стоимость: {inProduct.price} ₽
                        </Row>
                        {inProduct.info.map((info, index) =>
                            <Row key={info.id} style={{ background: index % 2 === 0 ? '#3a305525' : 'transparent', padding: 12 }}>
                                {info.title}: {info.description}
                            </Row>
                        )}
                    </div>
                </Col>
            </Row>
            <hr />
            {localStorage.getItem('userRole') === 'USER' ?
                <div>
                    <BottomDiv>
                        <div>Количество: </div>
                        <BtnContainer>
                            <button onClick={() => setQuantity(Math.max(quantity - 1, 1))}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </BtnContainer>
                        <Button onClick={() => toBasket()}>В корзину!</Button>
                    </BottomDiv>
                    <hr />
                </div>
                :
                <></>
            }
            <CommentHeader>
                <h3>Комментарии:</h3>
            </CommentHeader>
            {localStorage.getItem('userRole') === 'USER' ?
                <div>
                    <Input
                        link={link}
                        placeholder="Оставьте комментарий :)"
                        value={comment}
                        onChange={value => setComment(value)}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={() => makeComment()}>Прокомментировать</Button>
                    </div>
                    <hr />
                </div>
                :
                <></>
            }
            {product.comments.map(comment =>
                <div key={comment.id} style={{display: 'flex', justifyContent: 'center'}}>
                    <CommentDiv key={comment.id}>
                        <div>{Object.keys(usersObj).includes(String(comment.userId)) ? usersObj[comment.userId] : '-'}</div>
                        <div>{comment.text}</div>
                    </CommentDiv>
                </div>

            )}
            <GiveRating show={ratingVisible} onHide={() => setRatingVisible(false)} />
        </Container>
    )
}

export default ProductPage

