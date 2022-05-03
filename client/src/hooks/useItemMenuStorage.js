import { useState, useEffect, useContext } from "react"
import { Context } from '../index'

const getSavedValues = (key, initialValues) => {
    const savedValues = JSON.parse(localStorage.getItem(key))
    if (savedValues) return savedValues

    if (initialValues instanceof Function) return initialValues()
    return initialValues
}

const useItemMenuStorage = (key, initialValues) => {
    const { product } = useContext(Context)
    let itemsMenuStates = {}
    for (let item of product.basketItems) {
        itemsMenuStates[item.productId] = false
    }
    const [values, setValues] = useState(() => {
        return getSavedValues(key, initialValues)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(itemsMenuStates))
    }, [itemsMenuStates])

    return [values, setValues]
}

export default useItemMenuStorage