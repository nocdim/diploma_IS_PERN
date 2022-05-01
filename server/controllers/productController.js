const uuid = require('uuid')
const path = require('path');
const { Product, ProductInfo, TypeBrand, Rating } = require('../entities/associations')
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

            let rated = await Rating.findOne({where: {
                userId: userId,
                productId: productId,
            }})
            if (rated) {
                return next(ApiError.badRequest('Вы уже ставили оценку этому продукту!'))
            }
            await Rating.create({
                rate: rating, 
                userId: userId, 
                productId: productId
            })

            let productRatings = await Rating.findAndCountAll({where: {
                productId: productId,
            }})
            let sum = 0
            for (let productRating of productRatings.rows) {
                sum += productRating.rate
            }
            const giveRating = await Product.update({ rating: sum/productRatings.count }, {
                where: { id: productId }
            })
            return res.json(giveRating)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new ProductController()