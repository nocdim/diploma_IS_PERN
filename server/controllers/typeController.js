const uuid = require('uuid')
const path = require('path');
const { Type } = require('../entities/associations')
const ApiError = require('../error/ApiError')
const { validationResult } = require('express-validator')

class TypeController {
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
            const typeExists = await Type.findOne(
                {where: { name }},
            )
            if (typeExists) {
                return next(ApiError.badRequest('Раздел с таким названием уже существует'))
            }
            const type = await Type.create({ name })
            return res.json(type)
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
            const typeExists = await Type.findOne(
                { where: { name } })
            if (typeExists) {
                if (typeExists.name !== oldName) {
                    return next(ApiError.badRequest('Раздел с таким названием уже существует'))
                }
            }
            const type = await Type.update({ name: name }, {
                where: { name: oldName }
            })
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res) {
        const { id } = req.params
        const type = await Type.findOne(
            {where: { id }},
        )
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
    async delete(req, res, next) {
        try {
            let name = req.params.name.slice(1)
            await Type.destroy({
                where: { name: name }
            })
            return res.json("Раздел " + name + " был удалён успешно")
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new TypeController()