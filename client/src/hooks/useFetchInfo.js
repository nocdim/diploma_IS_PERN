import { useEffect, useContext } from 'react'
import { Context } from '../index'
import { fetchBrands, fetchProducts, fetchTypes } from "../http/productAPI"
import { ADMIN_EDIT_ROUTE, ADMIN_ROUTE } from '../utils/consts'

const useFetchInfo = () => {
    const { product } = useContext(Context)

    useEffect(() => {
        if (window.location.href.substr(21) === '/') {
            fetchTypes().then(data => product.setTypes(data))
            fetchBrands().then(data => product.setBrands(data))
            fetchProducts(product.selectedType.id, product.selectedBrand.id, product.page, 4).then(data => {
                product.setProducts(data.rows)
                product.setTotalCount(data.count)
            })
        } else if (window.location.href.substr(21) === ADMIN_ROUTE) {
            fetchTypes().then(data => product.setTypes(data))
            fetchBrands().then(data => product.setBrands(data))
            fetchProducts(null, null, null, null).then(data => {
                product.setProducts(data.rows)
                product.setTotalCount(data.count)
            })
        } else if (window.location.href.includes(ADMIN_EDIT_ROUTE)) {
            fetchTypes().then(data => product.setTypes(data))
            fetchBrands().then(data => product.setBrands(data))
        }
    }, [product, product.page, product.selectedType, product.selectedBrand])
}

export default useFetchInfo