const express = require('express')
const router = express.Router()
// const cors = require('cors')

const productController = require('../../controllers/product-controller')
const orderController = require('../../controllers/order-controller')
const cartController = require('../../controllers/cart-controller')

router.get('/products/all', productController.getProducts)
router.get('/product/:id', productController.getProduct)

router.delete('/cart/:id', cartController.deleteCart)
router.get('/cart', cartController.getCarts)
router.post('/cart', cartController.addCart)

router.post('/coupon', orderController.useCoupon)
router.post('/order', orderController.postOrder)

module.exports = router
