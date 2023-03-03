const Order = require('../../models/order')
const { getOffset, getPagination } = require('../../helpers/pagination-helper')

const orderController = {
  getOrders: async (req, res, next) => {
    try {
      const DEFAULT_LIMIT = 10
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_LIMIT
      const offset = getOffset(limit, page)

      const orders = await Order.find().skip(offset).limit(limit).lean()
      const ordersCount = await Order.find().count()
      const pagination = getPagination(limit, page, ordersCount)
      const data = orders.map(order => ({
        ...order,
        createAt: new Date(order.createdAt).getTime() / 1000
      }))
      res.status(200).json({
        status: 'success',
        orders: data,
        pagination,
        messages: []
      })
    } catch (err) { next(err) }
  }
}
module.exports = orderController
