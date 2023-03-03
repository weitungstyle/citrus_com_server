const Product = require('../../models/product')
const { getOffset, getPagination } = require('../../helpers/pagination-helper')

const productController = {
  addProduct: async (req, res, next) => {
    let { title, category, originPrice, price, unit, image, description, content, color, isEnabled, imageUrl } = req.body.data
    try {
      originPrice = Number(originPrice)
      price = Number(price)

      await Product.create({
        title,
        category,
        originPrice,
        price,
        unit,
        image,
        description,
        content,
        color,
        isEnabled,
        imageUrl
      })

      res.status(200).json({
        status: 'success',
        message: '已建立產品'
      })
    } catch (err) { next(err) }
  },
  getProducts: async (req, res, next) => {
    try {
      const DEFAULT_LIMIT = 10
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      // take data
      const products = await Product.find().skip(offset).limit(limit).sort({ createdAt: 'DESC' }).lean()
      const productsCount = await Product.find().count()
      const pagination = getPagination(limit, page, productsCount)
      res.status(200).json({
        status: 'success',
        products,
        pagination,
        messages: []
      })
    } catch (err) { next(err) }
  },
  getProductsAll: async (req, res, next) => {
    try {
      const products = await Product.find().lean()
      res.status(200).json({
        status: 'success',
        products
      })
    } catch (err) { next(err) }
  },
  editProduct: async (req, res, next) => {
    const _id = req.params.id
    let { title, category, originPrice, price, unit, imageUrl, description, content, color, isEnabled, imageModelUrl } = req.body.data
    try {
      originPrice = Number(originPrice)
      price = Number(price)
      await Product.findOneAndUpdate({ _id }, {
        title,
        category,
        originPrice,
        price,
        unit,
        imageUrl,
        description,
        content,
        color,
        isEnabled,
        imageModelUrl
      })

      res.status(200).json({
        status: 'success',
        message: '已更新產品'
      })
    } catch (err) { next(err) }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const _id = req.params.id
      const product = await Product.findByIdAndUpdate(_id, {
        isEnabled: false
      })
      if (!product) return res.status(403).json({ status: 'error', message: '找不到產品' })
      res.status(200).json({
        status: 'success',
        message: '已刪除產品'
      })
    } catch (err) { next(err) }
  }
}
module.exports = productController
