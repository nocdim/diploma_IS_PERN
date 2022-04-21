import { useEffect, useContext } from 'react'
import { Context } from '../index'
import { fetchBrands, fetchProducts, fetchTypes } from "../http/productAPI"
import { ADMIN_ROUTE } from '../utils/consts'

const useFetchInfo = () => {
    const { product } = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchBrands().then(data => product.setBrands(data))
        if (window.location.href.includes(ADMIN_ROUTE)) {
            fetchProducts(null, null, null, null).then(data => {
                product.setProducts(data.rows)
                product.setTotalCount(data.count)
            })
        } else {
            fetchProducts(product.selectedType.id, product.selectedBrand.id, product.page, 4).then(data => {
                product.setProducts(data.rows)
                product.setTotalCount(data.count)
            })
        }
    }, [product, product.page, product.selectedType, product.selectedBrand])
}

export default useFetchInfo