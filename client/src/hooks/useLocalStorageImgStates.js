import { useState, useEffect, useContext } from "react"
import { Context } from '../index'

const getSavedValues = (key, initialValues) => {
    const savedValues = JSON.parse(localStorage.getItem(key))
    if (savedValues) return savedValues

    if (initialValues instanceof Function) return initialValues()
    return initialValues
}

const useLocalImgStorageStates = (key, initialValues) => {
    const { product } = useContext(Context)
    let productsImgStates = {}
    for (let productImg of product.products) {
        productsImgStates[productImg.id] = false
    }
    const [values, setValues] = useState(() => {
        return getSavedValues(key, initialValues)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(productsImgStates))
    }, [productsImgStates])

    return [values, setValues]
}

export default useLocalImgStorageStates

