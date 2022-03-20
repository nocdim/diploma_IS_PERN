import React from 'react'
import { Container, Col, Image, Row, Card, Button } from "react-bootstrap"
import bigStar from "../assets/bigStar.png"

const ProductPage = () => {
    const product = { id: 1, name: 'BRUH', price: 500, rating: 3, img: `https://sun9-37.userapi.com/impg/5kBjH-GnXeTXH9qLjHhOSS752woFZZxl3K6sKg/eeQbZw3y0Xs.jpg?size=1079x1080&quality=96&sign=fbce729e08bd4adaa6686fe8053b9186&c_uniq_tag=PEMR2ROfSsbsFiJTHq6-Zsl4Rt_b2rIUw5nU5qoNZ9M&type=album` }
    const description = [

    ]
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={product.img}></Image>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{product.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
                        >
                            {product.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{product.price} руб.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Описание</h1>
                {description.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>    
                )}
            </Row>
        </Container>
    )
}
export default ProductPage