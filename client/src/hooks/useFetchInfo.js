import { useEffect, useContext } from 'react'
import { Context } from '../index'
import { fetchBrands, fetchProducts, fetchTypes } from "../http/productAPI"

const useFetchInfo = () => {
    const { product } = useContext(Context)
    
    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchBrands().then(data => product.setBrands(data))
        fetchProducts(null, null, 1, 2).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product])
}

export default useFetchInfo