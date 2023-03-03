const express = require('express')
const router = express.Router()
// const cors = require('cors')
const upload = require('../../middleware/multer')

const { authenticated } = require('../../middleware/auth')

const userController = require('../../controllers/admin/user-controller')
const productController = require('../../controllers/admin/product-controller')
const orderController = require('../../controllers/admin/order-controller')
const couponController = require('../../controllers/admin/coupon-controller')
const uploadController = require('../../controllers/admin/upload-controller')

router.post('/signin', userController.signIn)

router.post('/product', authenticated, productController.addProduct)
router.get('/products/all', authenticated, productController.getProductsAll)
router.get('/products', authenticated, productController.getProducts)
router.put('/product/:id', authenticated, productController.editProduct)
router.delete('/product/:id', authenticated, productController.deleteProduct)
router.post('/upload', authenticated, upload.single('file-to-upload'), uploadController.getImageUrl)

router.get('/orders', authenticated, orderController.getOrders)

router.post('/coupon', authenticated, couponController.addCoupon)
router.get('/coupons', authenticated, couponController.getCoupons)
router.put('/coupon/:id', authenticated, couponController.editCoupon)
router.delete('/coupon/:id', authenticated, couponController.deleteCoupon)

module.exports = router
