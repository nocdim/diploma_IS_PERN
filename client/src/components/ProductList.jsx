import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Row } from 'react-bootstrap';
import { Context } from '../index';
import ProductItem from "./ProductItem"

const ProductList = observer(() => {
    const { product } = useContext(Context)
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Row style={{ marginLeft: '27px', display: 'inline-flex' }}>
                {product.products.map(product =>
                    <ProductItem key={product.id} product={product} />
                )}
            </Row>
        </div>
    )
})

export default ProductList