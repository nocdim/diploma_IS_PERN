import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const updateType = async (type) => {
    const {data} = await $authHost.put('api/type/', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const fetchOneType = async (id) => {
    const {data} = await $authHost.get('api/type/' + id)
    return data
}

export const deleteType = async (type) => {
    await $authHost.delete(`api/type/:${type.name}`, type)
}


export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const updateBrand = async (brand) => {
    const {data} = await $authHost.put('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const fetchOneBrand = async (id) => {
    const {data} = await $authHost.get('api/brand/' + id)
    return data
}

export const deleteBrand = async (brand) => {
    await $authHost.delete(`api/brand/:${brand.name}`, brand)
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product)
    return data
}

export const updateProduct = async (product) => {
    const {data} = await $authHost.put('api/product', product)
    return data
}

export const fetchProducts = async (typeId, brandId, page, limit = 100) => {
    const {data} = await $host.get('api/product', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}

export const deleteProduct = async (product) => {
    await $authHost.delete(`api/product/:${product.name}`, product)
}

export const giveRating = async (product) => {
    await $host.post('api/product/rate', product)
}

export const addToBasket = async (product) => {
    await $host.post('api/product/basket', product)
}

export const fetchBasketItems = async (id) => {
    const {data} = await $host.get('api/product/basket/' + id)
    return data
}

export const fetchOrders = async (id) => {
    const {data} = await $host.get('api/product/orders/' + id)
    return data
}

export const fetchAllOrders = async () => {
    const {data} = await $authHost.get('api/product/order/orders')
    return data
}

export const updateQuantity = async (product) => {
    const {data} = await $host.put('api/product/basket', product)
    return data
}

export const deleteBasketItem = async (product) => {
    const {data} = await $host.delete(`api/product/basket/:${product.basketId}/:${product.productId}`, product)
    return data
}

export const placeOrder = async (order) => {
    await $host.post('api/product/order', order)
}

export const deleteOrder = async (order) => {
    await $host.delete(`api/product/order/${order.id}`, order)
}

export const fetchComments = async (id) => {
    const { data } = await $host.get('api/product/comments/' + id)
    return data
}

export const createComment = async (comment) => {
    await $host.post('api/product/comment', comment)
}

export const makeSearch = async (search) => {
    const { data } = await $host.get('api/product/search/query/' + search)
    return data
}