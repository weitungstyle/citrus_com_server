const Product = require('../models/product')
const { getPagination } = require('../helpers/pagination-helper')

const productController = {
  getProducts: async (req, res, next) => {
    try {
      const DEFAULT_LIMIT = 10
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_LIMIT
      // const offset = getOffset(limit, page)
      // take data
      const products = await Product.find({ isEnabled: true }).lean()
      const allProducts = await Product.find({ isEnabled: true }).lean()
      const pagination = getPagination(limit, page, allProducts.length)
      res.status(200).json({
        status: 'success',
        products,
        pagination,
        messages: []
      })
    } catch (err) { next(err) }
  },
  getProduct: async (req, res, next) => {
    try {
      const _id = req.params.id
      const product = await Product.findOne({ _id, isEnabled: true }).lean()
      if (!product) { res.status(404).json({ status: 'error', message: '找不到產品' }) }
      res.status(200).json({
        status: 'success',
        product
      })
    } catch (err) { next(err) }
  }
}
module.exports = productController
