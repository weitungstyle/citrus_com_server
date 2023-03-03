const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  qty: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number,
    default: 0
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    index: true,
    required: true
  },
  couponId: {
    type: Schema.Types.ObjectId,
    ref: 'Coupon',
    index: true,
    required: false
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    index: false
  }
})

module.exports = mongoose.model('Cart', cartSchema)
