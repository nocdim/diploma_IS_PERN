const uuid = require('uuid')
const path = require('path');
const {Product, ProductInfo, TypeBrand} = require('../entities/associations')
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

            let {name} = req.body
            const productExists = await Product.findOne(
                {
                    where: {name}
                },
            )
            if (productExists) {
                return next(ApiError.badRequest('Продукт с таким названием уже существует'))
            }
            let {price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({name, price, brandId, typeId, img: fileName});

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

            let typeBrand = await TypeBrand.findOne({ where: {
                typeId: typeId,
                brandId: brandId
            } })

            if (typeBrand === null){
                const typeBrandBond = await TypeBrand.create({typeId, brandId})
                return res.json(typeBrandBond)
            }

            return res.json(product) 

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
        if (!brandId && !typeId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            products = await Product.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            products = await Product.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            products = await Product.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            },
        )
        return res.json(product)
    }

}

module.exports = new ProductController()