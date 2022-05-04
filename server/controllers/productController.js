const uuid = require('uuid')
const path = require('path');
const { Product, ProductInfo, TypeBrand, Rating, Basket, BasketProduct, Order } = require('../entities/associations')
const ApiError = require('../error/ApiError');
const { validationResult } = require('express-validator')

class ProductController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!req.files || Object.keys(req.files).length === 0 || !errors.isEmpty()) {
                let errs = []
                if (!req.files || Object.keys(req.files).length === 0) {
                    errs.push(' Загрузите изображение ')
                }
                for (let objs of errors.array()) {
                    errs.push(' ' + objs.msg + ' ')
                }
                return next(ApiError.badRequest(errs))
            }

            let { name } = req.body
            const productExists = await Product.findOne(
                { where: { name } }
            )
            if (productExists) {
                return next(ApiError.badRequest('Продукт с таким названием уже существует'))
            }
            let { price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({ name, price, brandId, typeId, img: fileName });

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }

            let typeBrand = await TypeBrand.findOne({
                where: {
                    typeId: typeId,
                    brandId: brandId
                }
            })

            if (typeBrand === null) {
                const typeBrandBond = await TypeBrand.create({ typeId, brandId })
                return res.json(typeBrandBond)
            }

            return res.json(product)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let errs = []
                for (let objs of errors.array()) {
                    errs.push(' ' + objs.msg + ' ')
                }
                return next(ApiError.badRequest(errs))
            }

            let { name, oldName, price, brandId, typeId, info } = req.body
            const oldProduct = await Product.findOne(
                { where: { name: oldName } }
            )
            const productExists = await Product.findOne(
                { where: { name } }
            )
            if (productExists) {
                if (productExists.name !== oldName) {
                    return next(ApiError.badRequest('Продукт с таким названием уже существует'))
                }
            }

            if (!req.files || Object.keys(req.files).length === 0) {
                const product = await Product.update({
                    name: name,
                    price: price,
                    brandId: brandId,
                    typeId: typeId
                },
                    {
                        where: { name: oldName }
                    })
                if (info) {
                    info = JSON.parse(info)
                    await ProductInfo.destroy({
                        where: { productId: oldProduct.id }
                    })
                    info.forEach(i =>
                        ProductInfo.create({
                            title: i.title,
                            description: i.description,
                            productId: oldProduct.id
                        })
                    )
                }
                let products = await Product.findAndCountAll({
                    where: { typeId: oldProduct.typeId, brandId: oldProduct.brandId }
                })
                if (products.count >= 1) {
                    let typeBrand = await TypeBrand.findOne({
                        where: {
                            typeId: typeId,
                            brandId: brandId
                        }
                    })
                    if (typeBrand === null) {
                        const typeBrandBond = await TypeBrand.create({ typeId, brandId })
                        return res.json(typeBrandBond)
                    }
                } else {
                    const typeBrandBond = await TypeBrand.update({ typeId: typeId, brandId: brandId }, {
                        where: { typeId: oldProduct.typeId, brandId: oldProduct.brandId }
                    })
                    return res.json(typeBrandBond)
                }
                return res.json(product)
            }

            if (info) {
                info = JSON.parse(info)
                await ProductInfo.destroy({
                    where: { productId: oldProduct.id }
                })
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: oldProduct.id
                    })
                )
            }

            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.update({
                name: name,
                price: price,
                brandId: brandId,
                typeId: typeId,
                img: fileName
            }, { where: { name: oldName } }
            )

            let products = await Product.findAndCountAll({
                where: { typeId: oldProduct.typeId, brandId: oldProduct.brandId }
            })
            if (products.count >= 1) {
                let typeBrand = await TypeBrand.findOne({
                    where: {
                        typeId: typeId,
                        brandId: brandId
                    }
                })
                if (typeBrand === null) {
                    const typeBrandBond = await TypeBrand.create({ typeId, brandId })
                    return res.json(typeBrandBond)
                }
            } else {
                const typeBrandBond = await TypeBrand.update({ typeId: typeId, brandId: brandId }, {
                    where: { typeId: oldProduct.typeId, brandId: oldProduct.brandId }
                })
                return res.json(typeBrandBond)
            }

            return res.json(product)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
        if (!brandId && !typeId) {
            products = await Product.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId) {
            products = await Product.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && typeId) {
            products = await Product.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId && typeId) {
            products = await Product.findAndCountAll({ where: { typeId, brandId }, limit, offset })
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const { id } = req.params
        const product = await Product.findOne(
            {
                where: { id },
                include: [{ model: ProductInfo, as: 'info' }]
            },
        )
        return res.json(product)
    }

    async delete(req, res, next) {
        try {
            let name = req.params.name.slice(1)
            let product = await Product.findOne({
                where: { name: name }
            })
            let products = await Product.findAndCountAll({
                where: { typeId: product.typeId, brandId: product.brandId }
            })
            if (products.count === 1) {
                await TypeBrand.destroy({
                    where: { typeId: product.typeId, brandId: product.brandId }
                })
            }
            await Product.destroy({
                where: { name: name }
            })
            return res.json("Продукт " + name + " был удалён успешно")
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async giveRating(req, res, next) {
        try {
            const { rating, userId, productId } = req.body

            let rated = await Rating.findOne({
                where: {
                    userId: userId,
                    productId: productId,
                }
            })
            if (rated) {
                return next(ApiError.badRequest('Вы уже ставили оценку этому продукту!'))
            }
            await Rating.create({
                rate: rating,
                userId: userId,
                productId: productId
            })

            let productRatings = await Rating.findAndCountAll({
                where: {
                    productId: productId,
                }
            })
            let sum = 0
            for (let productRating of productRatings.rows) {
                sum += productRating.rate
            }
            const giveRating = await Product.update({ rating: sum / productRatings.count }, {
                where: { id: productId }
            })
            return res.json(giveRating)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async addToBasket(req, res, next) {
        try {
            const { productId, userId, quantity } = req.body
            const basket = await Basket.findOne({ where: { userId: userId } })
            const exists = await BasketProduct.findOne({
                where: {
                    basketId: basket.dataValues.id,
                    productId: productId,
                }
            })
            if (exists) {
                await BasketProduct.update({ quantity: Number(exists.dataValues.quantity) + Number(quantity) }, {
                    where: {
                        basketId: basket.dataValues.id,
                        productId: productId,
                    }
                })
                const basketProducts = await BasketProduct.findOne({
                    where:
                    {
                        productId: productId,
                        basketId: basket.dataValues.id
                    }
                })
                const product = await Product.findOne({ where: { id: productId } })
                const finalizeBasket = await BasketProduct.update({
                    price: Number(basketProducts.dataValues.quantity) * Number(product.dataValues.price)
                }, {
                    where: {
                        productId: productId,
                        basketId: basket.dataValues.id
                    }
                })
                return res.json(finalizeBasket)
            }

            await BasketProduct.create({
                basketId: basket.dataValues.id,
                productId: productId,
                quantity: quantity,
            })
            const basketProducts = await BasketProduct.findOne({
                where:
                {
                    productId: productId,
                    basketId: basket.dataValues.id
                }
            })
            const product = await Product.findOne({ where: { id: productId } })
            const finalizeBasket = await BasketProduct.update({
                price: Number(basketProducts.dataValues.quantity) * Number(product.dataValues.price)
            }, {
                where: {
                    productId: productId,
                    basketId: basket.dataValues.id
                }
            })
            return res.json(finalizeBasket)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async updateQuantity(req, res, next) {
        try {
            const { basketId, productId, quantity } = req.body
            await BasketProduct.update({quantity: quantity}, {where: {
                basketId: basketId,
                productId: productId
            }})
            const product = await Product.findOne({ where: { id: productId } })
            const finalizeBasket = await BasketProduct.update({
                price: Number(quantity) * Number(product.dataValues.price)
            }, {
                where: {
                    productId: productId,
                    basketId: basketId,
                }
            })
            return res.json(finalizeBasket)
        } catch (e) {

        }
    }
    async getBasketItems(req, res, next) {
        try {
            const { id } = req.params
            const basket = await Basket.findOne({
                where: {
                    userId: id
                }
            })
            const items = await BasketProduct.findAll({
                where: {
                    basketId: basket.dataValues.id
                }
            })
            return res.json(items)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteBasketItem(req, res, next) {
        try {
            const { basketId, productId } = req.params
            let bsktId = basketId.slice(1)
            let prdctId = productId.slice(1)
            await BasketProduct.destroy({where: {
                basketId: bsktId,
                productId: prdctId,
            }})
            return res.json('Успешно удалено')
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getOrders(req, res, next) {
        try {
            const { id } = req.params
            const orders = await Order.findAll({where: {userId: id}})
            return res.json(orders)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async placeOrder(req, res, next) {
        try {
            const { userId, sum, payType } = req.body
            const basket = await Basket.findOne({where: {userId: userId}})
            const basketId = basket.dataValues.id
            const basketProducts = await BasketProduct.findAll({where: {basketId: basketId}})
            const productIds = []
            for (let obj of basketProducts) {
                productIds.push(obj.dataValues.productId)
            }
            const productsArr = []
            for (let productId of productIds) {
                const prdct = await Product.findOne({where: {id: productId}})
                const basketProduct = await BasketProduct.findOne({where: {
                    basketId: basketId,
                    productId: productId
                }})
                productsArr.push((prdct.dataValues.name).concat(' ' + basketProduct.dataValues.quantity + 'шт.'))
            }
            let products = productsArr.join(', ')
            await BasketProduct.destroy({where: {basketId: basketId}})
            const order = await Order.create({payType, products, userId, sum})
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ProductController()