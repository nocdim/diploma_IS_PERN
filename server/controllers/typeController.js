const uuid = require('uuid')
const path = require('path');
const { Type } = require('../entities/associations')
const ApiError = require('../error/ApiError')
const { validationResult } = require('express-validator')

class TypeController {
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

            const typeExists = await Type.findOne(
                {
                    where: { name }
                },
            )
            if (typeExists) {
                return next(ApiError.badRequest('Раздел с таким названием уже существует'))
            }

            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const type = await Type.create({ name, img: fileName })
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
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

            const oldName = req.params.name.slice(1)
            let { name } = req.body
            console.log(oldName + ' --> ' + name)
            const typeExists = await Type.findOne(
                {
                    where: { name }
                },
            )
            if (typeExists) {
                return next(ApiError.badRequest('Раздел с таким названием уже существует'))
            }

            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const type = await Type.update({ name: name, img: fileName }, {
                where: {name: oldName}
            })
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const type = await Type.findOne(
            {
                where: {id}
            },
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