import React, { useState, useEffect } from 'react'
import { Container, Col, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { addToBasket, fetchOneProduct } from '../http/productAPI'
import star from "../assets/star.png";
import { BottomDiv, BtnContainer, Button, ImgDiv, Rating, TopDiv } from '../components/styled/ProductPage'
import GiveRating from "../components/modals/GiveRating"
import AdminLoader from '../components/AdminLoader';

const ProductPage = () => {
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [ratingVisible, setRatingVisible] = useState(false)
    const [product, setProduct] = useState({ info: [] })
    const { id } = useParams()
    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data)).finally(() => setLoading(false))
    }, [id])

    const toBasket = async () => {
        try {
            const formData = new FormData()
            formData.append('productId', product.id)
            formData.append('userId', localStorage.getItem('userId'))
            formData.append('quantity', quantity)
            await addToBasket(formData)
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
                        {product.name}
                    </h2>
                    {localStorage.getItem('userRole') === 'USER' ?
                        <Rating userRole={localStorage.getItem('userRole')} onClick={() => setRatingVisible(true)}>
                            <h3>Рейтинг {product.rating.toFixed(1)}<img src={star} alt="" /></h3>
                        </Rating>
                        :
                        <Rating userRole={localStorage.getItem('userRole')}>
                            <h3>Рейтинг {product.rating.toFixed(1)}<img src={star} alt="" /></h3>
                        </Rating>
                    }
                </TopDiv>
                <hr />
            </Row>

            <Row>
                <Col md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                    <ImgDiv>
                        <img src={process.env.REACT_APP_API_URL + product.img} alt="" />
                    </ImgDiv>
                </Col>
                <Col md={8} style={{ display: 'grid', alignItems: 'center' }}>
                    <div>
                        <Row style={{ background: 'transparent', padding: 12, fontSize: 30 }}>
                            Стоимость: {product.price} ₽
                        </Row>
                        {product.info.map((info, index) =>
                            <Row key={info.id} style={{ background: index % 2 === 0 ? '#3a305525' : 'transparent', padding: 12 }}>
                                {info.title}: {info.description}
                            </Row>
                        )}
                    </div>
                </Col>
            </Row>
            <hr />
            {localStorage.getItem('userRole') === 'USER' ?
                <BottomDiv>
                    <div>Количество: </div>
                    <BtnContainer>
                        <button onClick={() => setQuantity(Math.max(quantity - 1, 1))}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </BtnContainer>
                    <Button onClick={() => toBasket()}>В корзину!</Button>
                </BottomDiv>
                :
                <></>
            }
            <GiveRating show={ratingVisible} onHide={() => setRatingVisible(false)} />
        </Container>
    )
}

export default ProductPage

