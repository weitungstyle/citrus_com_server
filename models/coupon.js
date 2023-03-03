const mongoose = require('mongoose')
const Schema = mongoose.Schema

const couponSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  isEnabled: {
    type: Boolean,
    default: true
  },
  percent: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Number
  },
  code: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Coupon', couponSchema)
