import React, { useContext, useEffect, useState } from 'react'
import AdminLoader from '../components/AdminLoader'
import { fetchOrders } from '../http/productAPI'
import { Context } from '../index'

const Orders = () => {
    const { product } = useContext(Context)
    const userId = localStorage.getItem('userId')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchOrders(userId).then(data => {
            product.setOrders(data)
        }).finally(() => setLoading(false))
    }, [userId])

    if (loading) {
        return (
            <AdminLoader />
        )
    }

  return (
    <div>Orders</div>
  )
}

export default Orders