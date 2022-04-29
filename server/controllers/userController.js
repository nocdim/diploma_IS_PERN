const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../entities/associations')

const generateJwt = (id, email, role) => {
        return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
        )
}

class UserController {
    async registration(req, res, next) {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
        let errs = []
        for (let objs of errors.array()) {
            errs.push(' ' + objs.msg + ' ')
            }
            return next(ApiError.badRequest(errs))
        }
        
        const { email, password, role } = req.body

        if (!email || !password) {
            return next(ApiError.badRequest('Неккоректный email или пароль'))
        }

        const candidate = await User.findOne({where: {email}})

        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }
    async registrationAdmin(req, res, next) {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
        let errs = []
        for (let objs of errors.array()) {
            errs.push(' ' + objs.msg + ' ')
            }
            return next(ApiError.badRequest(errs))
        }
        
        const { name, password, role } = req.body

        const candidate = await User.findOne({where: {email: name}})

        if (candidate) {
            return next(ApiError.badRequest('Администратор с таким логином уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email: name, role, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }

    async deleteAdmin(req, res, next) {
        try {
            let admins = await User.findAndCountAll({where: {
                role: 'ADMIN'
            }})
            if (admins.count === 1) {
                return next(ApiError.forbidden('Невозможно удалить последнюю учетную запись администратора!'))
            }
            let name = req.params.name.slice(1)
            await User.destroy({
                where: { 
                    email: name 
                }
            })
            return res.json("Администратор " + name + " был удалён успешно")
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
        let errs = []
        for (let objs of errors.array()) {
            errs.push(' ' + objs.msg + ' ')
            }
            return next(ApiError.badRequest(errs))
        }

        const {email, password} = req.body

        const user = await User.findOne({where: {email}})
        if(!user) {
            return next(ApiError.badRequest('Пользователя с таким email не существует'))
        }

        const comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'))
        }

        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async fetchAdmins(req, res) {
        const admins = await User.findAll({where: { role: 'ADMIN' }})
        return res.json(admins)
    }
}

module.exports = new UserController()