import { makeAutoObservable } from "mobx"

export default class ProductStore {
    constructor() {
        this._types = [
            {id: 1, name: 'BRUH sausage'}
        ]
        this._brands = [
            {id: 1, name: 'BRUH'},
            {id: 2, name: 'MOMENT'}

        ]
        this._products = [
            {id: 1, name: 'BRUH', price: 500, rating: 3, img: `https://sun9-37.userapi.com/impg/5kBjH-GnXeTXH9qLjHhOSS752woFZZxl3K6sKg/eeQbZw3y0Xs.jpg?size=1079x1080&quality=96&sign=fbce729e08bd4adaa6686fe8053b9186&c_uniq_tag=PEMR2ROfSsbsFiJTHq6-Zsl4Rt_b2rIUw5nU5qoNZ9M&type=album`},
            {id: 2, name: 'MOMENT', price: 500, rating: 3, img: `https://sun9-37.userapi.com/impg/5kBjH-GnXeTXH9qLjHhOSS752woFZZxl3K6sKg/eeQbZw3y0Xs.jpg?size=1079x1080&quality=96&sign=fbce729e08bd4adaa6686fe8053b9186&c_uniq_tag=PEMR2ROfSsbsFiJTHq6-Zsl4Rt_b2rIUw5nU5qoNZ9M&type=album`},
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