const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  isPaid: {
    type: Boolean,
    default: false,
    required: true
  },
  total: {
    type: Number,
    required: false
  },
  products: {
    type: Schema.Types.Object
  },
  user: {
    type: Schema.Types.Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Order', orderSchema)
