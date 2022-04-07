const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')
const validator = require('../middleware/validator')

router.post('/', checkRole('ADMIN'), validator.product, productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)



module.exports = router