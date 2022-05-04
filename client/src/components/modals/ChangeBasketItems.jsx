import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import useFetchInfo from '../../hooks/useFetchInfo'
import { deleteBasketItem, updateQuantity } from '../../http/productAPI'
import { Context } from '../../index'
import { BodyDiv, BtnContainer, ChangeQuantity, DeleteItem } from '../styled/ChangeBasketItems'

const ChangeBasketItems = ({ show, onHide, item }) => {
    const { product } = useContext(Context)
    const [quantity, setQuantity] = useState(item.quantity)
    useFetchInfo()
    let prodObj = {}
    for (let prod of product.products) {
        prodObj[prod.id] = prod.name
    }

    const changeQuantity = async () => {
        try {
            const formData = new FormData()
            formData.append('basketId', item.basketId)
            formData.append('productId', item.productId)
            formData.append('quantity', quantity)
            await updateQuantity(formData)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const removeItem = async () => {
        try {
            await deleteBasketItem({basketId: item.basketId, productId: item.productId}).then(
                alert('Продукт был успешно удален из корзины!')
            ).finally(window.location.reload())
        }
        catch (e) {
            alert(e.response.data.message)
        }
    }
    

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size=""
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" >
                    Изменение товара "{Object.keys(prodObj).includes(String(item.productId)) ? prodObj[item.productId] : '-'}"
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BodyDiv>
                    <span>Количество:</span>
                    <BtnContainer>
                        <button onClick={() => setQuantity(Math.max(quantity - 1, 1))}>-</button>
                        <div>{quantity}</div>
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </BtnContainer>
                </BodyDiv>
            </Modal.Body>
            <Modal.Footer style={{display: 'flex', justifyContent: 'center'}}>
                <DeleteItem onClick={() => removeItem()}>Удалить товар из списка</DeleteItem>
                <ChangeQuantity onClick={() => changeQuantity()}>Изменить количество</ChangeQuantity>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangeBasketItems