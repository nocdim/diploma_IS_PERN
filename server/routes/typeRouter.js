const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')
const validator = require('../middleware/validator')

router.post('/', checkRole('ADMIN'), validator.type, typeController.create)
router.get('/', typeController.getAll)
router.delete('/:name', checkRole('ADMIN'), typeController.delete)

module.exports = router

