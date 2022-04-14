const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')
const validator = require('../middleware/validator')

router.get('/', brandController.getAll)
router.get('/:id', checkRole('ADMIN'), brandController.getOne)
router.post('/', checkRole('ADMIN'), validator.brand, brandController.create)
router.put('/:name', checkRole('ADMIN'), validator.brand, brandController.update)
router.delete('/:name', checkRole('ADMIN'), brandController.delete)

module.exports = router

