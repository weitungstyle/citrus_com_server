const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  originPrice: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isEnabled: {
    type: Boolean,
    default: true
  },
  imgModelUrl: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', productSchema)
