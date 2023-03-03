const Coupon = require('../../models/coupon')
const { getOffset, getPagination } = require('../../helpers/pagination-helper')

const couponController = {
  addCoupon: async (req, res, next) => {
    let { title, isEnabled, percent, dueDate, code } = req.body.data
    try {
      percent = Number(percent)
      await Coupon.create({
        title,
        isEnabled,
        percent,
        dueDate,
        code
      })
      res.status(200).json({
        status: 'success',
        message: '已建立優惠券'
      })
    } catch (err) { next(err) }
  },
  getCoupons: async (req, res, next) => {
    try {
      const DEFAULT_LIMIT = 10
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_LIMIT
      const offset = getOffset(limit, page)

      const coupons = await Coupon.find().skip(offset).limit(limit).lean()
      const couponsCount = await Coupon.find().count()
      const pagination = getPagination(limit, page, couponsCount)
      res.status(200).json({
        status: 'success',
        coupons,
        pagination,
        messages: []
      })
    } catch (err) { next(err) }
  },
  editCoupon: async (req, res, next) => {
    const _id = req.params.id
    let { title, isEnabled, percent, dueDate, code } = req.body.data
    try {
      percent = Number(percent)
      await Coupon.findByIdAndUpdate(_id, {
        title,
        isEnabled,
        percent,
        dueDate,
        code
      })
      res.status(200).json({
        status: 'success',
        message: '已更新優惠券'
      })
    } catch (err) { next(err) }
  },
  deleteCoupon: async (req, res, next) => {
    try {
      const _id = req.params.id
      const coupon = await Coupon.findByIdAndUpdate(_id, { isEnabled: false })
      if (!coupon) return res.status(403).json({ status: 'error', message: '找不到產品' })
      res.status(200).json({
        status: 'success',
        message: '已刪除優惠券'
      })
    } catch (err) { next(err) }
  }
}
module.exports = couponController
