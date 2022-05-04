const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const validator = require('../middleware/validator')

router.post('/registration', validator.registration, userController.registration)
router.post('/registrationAdmin', validator.registrationAdmin, userController.registrationAdmin)
router.post('/login', validator.login, userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/admins', authMiddleware, userController.fetchAdmins)
router.get('/users', authMiddleware, userController.fetchUsers)
router.get('/', userController.fetchUser)
router.delete('/admin/:name', userController.deleteAdmin)

module.exports = router