import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ThankYou } from '../components/styled/OrderComplete'
import { SHOP_ROUTE } from '../utils/consts'

const OrderComplete = () => {
    const navigate = useNavigate()
    return (
        <div>
            <ThankYou>
                <div>
                    <div>
                        <p>Спасибо за покупку!</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button onClick={() => navigate(SHOP_ROUTE)}>Вернуться в магазин</button>
                    </div>
                </div>
            </ThankYou>
        </div>
    )
}

export default OrderComplete