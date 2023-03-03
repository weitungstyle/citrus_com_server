const Cart = require('../models/cart')
const Coupon = require('../models/coupon')
const Order = require('../models/order')
const { getTotal } = require('../helpers/calculate-helper')

const orderController = {
  useCoupon: async (req, res, next) => {
    try {
      const { code } = req.body.data
      const coupon = await Coupon.findOne({ code }).lean()
      if (!coupon) {
        return res.status(400).json({ status: 'error', message: '找不到優惠券!' })
      } else if (coupon.isEnabled === false) {
        return res.status(400).json({ status: 'error', message: '優惠券無法使用或已過期' })
      } else {
        const carts = await Cart.find({ orderId: null }).populate('productId').lean()
        const total = Math.ceil(getTotal(carts, coupon.percent))
        await Cart.updateMany({ orderId: null }, { couponId: coupon._id })
        return res.status(200).json({ status: 'success', message: `已套用優惠券:${code}`, data: { finalTotal: total } })
      }
    } catch (err) { next(err) }
  },
  postOrder: async (req, res, next) => {
    const { user } = req.body.data
    try {
      if (!user) {
        return res.status(400).json({ status: 'error', message: '尚無用戶資料' })
      } else {
        const carts = await Cart.find({ orderId: null }).populate('couponId').populate('productId').lean()
        const percent = carts[0].couponId.percent
        const total = Math.ceil(getTotal(carts, percent))
        const products = {}
        for (let i = 0; i < carts.length; i++) {
          products[carts[i]._id] = carts[i]
        }
        const order = await Order.create({
          products,
          user,
          total
        })
        await Cart.updateMany({ orderId: null }, { orderId: order._id })
        return res.status(200).json({ status: 'success', message: '已建立訂單', total, createAt: order.createdAt, orderId: order._id })
      }
    } catch (err) { next(err) }
  },
  postPayment: async (req, res, next) => {
    const orderId = req.params.id
    try {
      const order = await Order.findOneAndUpdate({ _id: orderId }, { isPaid: true })
      if (!order) {
        return res.status(400).json({ status: 'error', message: '找不到訂單' })
      } else {
        res.status(200).json({ status: 'success', message: '付款完成' })
      }
    } catch (err) { next(err) }
  }
}
module.exports = orderController
