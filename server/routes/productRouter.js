const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')
const validator = require('../middleware/validator')

router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.get('/basket/:id', productController.getBasketItems)
router.post('/rate', productController.giveRating)
router.post('/basket', productController.addToBasket)
router.put('/basket', productController.updateQuantity)
router.delete('/basket/:basketId/:productId', productController.deleteBasketItem)
router.post('/', checkRole('ADMIN'), validator.product, productController.create)
router.put('/', checkRole('ADMIN'), validator.product, productController.update)
router.delete('/:name', checkRole('ADMIN'), productController.delete)



module.exports = router