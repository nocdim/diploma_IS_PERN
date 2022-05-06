import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Row } from 'react-bootstrap';
import { Context } from '../index';
import ProductItem from "./ProductItem"

const ProductList = observer(() => {
    const { product } = useContext(Context)

    let products = []
    product.products.forEach(product => {
        products.push(product)
    })
    products.sort((a, b) => {
        return 1 * String(a.id).localeCompare(String(b.id))
    })

    return (
            <Row>
                {products.map(product =>
                    <ProductItem key={product.id} product={product} />
                )}
            </Row>
    )
})

export default ProductList