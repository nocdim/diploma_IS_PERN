import React from 'react';
import { Col } from "react-bootstrap"
import star from "../assets/star.png";
import { useNavigate } from "react-router-dom"
import { PRODUCT_ROUTE } from '../utils/consts';
import { Card, Image, Rating } from './styled/ProductItem';

const ProductItem = ({ product }) => {
    const navigate = useNavigate()
    return (
            <Card 
            style={{margin: '0 1rem 0 1rem'}}
            onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
                <Image src={process.env.REACT_APP_API_URL + product.img} alt="" />
                <Rating>
                    <div>Рейтинг</div>
                    <div className="rating">
                        <div>{product.rating.toFixed(1)}</div>
                        <img src={star} alt="" />
                    </div>
                </Rating>
                <div className="name">{product.name}</div>
            </Card>
    )
}

export default ProductItem