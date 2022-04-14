const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')
const validator = require('../middleware/validator')

router.get('/', typeController.getAll)
router.get('/:id', checkRole('ADMIN'), typeController.getOne)
router.post('/', checkRole('ADMIN'), validator.type, typeController.create)
router.put('/:name', checkRole('ADMIN'), validator.type, typeController.update)
router.delete('/:name', checkRole('ADMIN'), typeController.delete)

module.exports = router

