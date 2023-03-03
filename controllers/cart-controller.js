const Cart = require('../models/cart')
const Product = require('../models/product')

const { getTotal } = require('../helpers/calculate-helper')

const cartController = {
  addCart: async (req, res, next) => {
    try {
      const { productId, qty } = req.body.data
      const product = await Product.findById(productId).lean()
      const createCart = await Cart.create({ productId, qty, total: product.price * qty })
      if (createCart) {
        const cart = await Cart.findById(createCart._id).lean()
        const data = {
          ...cart,
          product
        }
        res.status(200).json({
          status: 'success',
          message: '已加入購物車',
          data
        })
      }
    } catch (err) { next(err) }
  },
  deleteCart: async (req, res, next) => {
    try {
      const id = req.params.id
      const cart = await Cart.findByIdAndDelete(id)
      if (cart) {
        res.status(200).json({ status: 'success', message: '已刪除' })
      }
    } catch (err) { next(err) }
  },
  getCarts: async (req, res, next) => {
    const percent = 100
    try {
      const carts = await Cart.find({ orderId: null }).populate('productId').populate('couponId').lean()
      const total = getTotal(carts, percent)
      res.status(200).json({
        status: 'success',
        data: { carts, total },
        message: []
      })
    } catch (err) { next(err) }
  }
}
module.exports = cartController
