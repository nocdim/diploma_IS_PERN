const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const validator = require('../middleware/validator')

router.post('/registration', validator.registration, userController.registration)
router.post('/login', validator.login, userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router