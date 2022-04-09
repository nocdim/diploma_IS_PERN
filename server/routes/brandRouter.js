const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')
const validator = require('../middleware/validator')

router.post('/', checkRole('ADMIN'), validator.brand, brandController.create)
router.get('/', brandController.getAll)
router.delete('/:name', checkRole('ADMIN'), brandController.delete)

module.exports = router

