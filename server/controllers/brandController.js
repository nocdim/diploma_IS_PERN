const { Brand } = require('../entities/associations')
const ApiError = require('../error/ApiError')
const { validationResult } = require('express-validator')

class BrandController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                let errs = []
                for (let objs of errors.array()) {
                    errs.push(' ' + objs.msg + ' ')
                }
                return next(ApiError.badRequest(errs))
            }

            let { name } = req.body
            const brandExists = await Brand.findOne(
                {
                    where: {name}
                },
            )
            if (brandExists) {
                return next(ApiError.badRequest('Производитель с таким названием уже существует'))
            }

            const brand = await Brand.create({ name })
            return res.json(brand)
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

            let { name, oldName } = req.body
            const brandExists = await Brand.findOne(
                {
                    where: {name}
                },
            )
            if (brandExists) {
                if (brandExists.name === oldName) {
                    return next(ApiError.badRequest('Пожалуйста, внесите изменения'))
                }
            } 
            
            const brand = await Brand.update({ name: name }, {
                where: {name: oldName} 
            })
            return res.json(brand)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            let name = req.params.name.slice(1)
            await Brand.destroy({
                where: { 
                    name: name 
                }
            })
            return res.json("Производитель " + name + " был удалён успешно")
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const brand = await Brand.findOne(
            {
                where: {id}
            },
        )
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
    
}

module.exports = new BrandController()