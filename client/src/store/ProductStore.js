import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._types = []
        this._brands = []
        this._products = []
        this._basketItems = []
        this._orders = []
        this._allOrders = []
        this._comments = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 8
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
    setBasketItems(basketItems) {
        this._basketItems = basketItems
    }
    setOrders(orders){
        this._orders = orders
    }
    setAllOrders(allOrders){
        this._allOrders = allOrders
    }
    setComments(comments){
        this._comments = comments
    }
    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
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
    get basketItems() {
        return this._basketItems
    }
    get orders() {
        return this._orders
    }
    get allOrders() {
        return this._allOrders
    }
    get comments() {
        return this._comments
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}