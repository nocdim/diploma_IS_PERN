import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Row } from 'react-bootstrap';
import { Context } from '../index';
import ProductItem from "./ProductItem"

const ProductList = observer(() => {
    const {product} = useContext(Context)
    return (
        <Row style={{marginLeft: '30px'}}>
            {product.products.map(product => 
                <ProductItem key ={product.id} product={product} />
            )}
        </Row>
    )
})

export default ProductList