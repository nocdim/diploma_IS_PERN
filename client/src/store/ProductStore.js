import { makeAutoObservable } from "mobx"

export default class UserStore {
    constructor() {
        this._types = [
            {id: 1, name: 'BRUH sausage'}
        ]
        this._brands = [
            {id: 1, name: 'BRUH'},
            {id: 2, name: 'MOMENT'}

        ]
        this._products = [

        ]
        this._selectedType = {}
        this._selectedBrand = {}
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setProducts(products) {
        this._products = products
    }
    setSelectedType(type) {
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get products() {
        return this._products
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
}