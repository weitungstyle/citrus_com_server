if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// include models
const Coupon = require('../models/coupon')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Order = require('../models/order')

// helper function
const { faker } = require('@faker-js/faker/locale/zh_TW')
const { getTotal, sample } = require('../helpers/calculate-helper')

// connect to database
const db = require('../connection/mongoose')

db.once('open', async () => {
  const cartAmount = 40
  const orderAmount = 20
  const cartPerOrder = cartAmount / orderAmount
  console.log('Begining building orders\' data...')
  try {
    const products = await Product.find().lean()
    const coupons = await Coupon.find().lean()
    // create cart's data
    const cartData = []
    for (let i = 0; i < cartAmount; i++) {
      const randomProduct = sample(products)
      cartData.push({
        qty: Math.floor(Math.random() * 2) + 1,
        productId: randomProduct._id,
        total: randomProduct.price
      })
    }
    await Cart.insertMany(cartData)

    // create order's data
    const orderData = []
    for (let i = 0; i < orderAmount; i++) {
      const title = ['ms', 'mr']
      orderData.push({
        isPaid: true,
        user: {
          address: faker.address.streetAddress(),
          business: Math.round(Math.random()),
          city: faker.address.city(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          state: 'Taiwan',
          tel: faker.phone.number(),
          telCode: '+886',
          title: title[Math.fround(Math.random() * title.length)],
          zipcode: faker.address.zipCode()
        }
      })
    }
    await Order.insertMany(orderData)

    // pair cart with order
    const carts = await Cart.find().populate('productId').lean()
    const orders = await Order.find().lean()
    for (let i = 0; i < orderAmount; i++) {
      const orderItem = carts.splice(0, cartPerOrder)
      const coupon = sample(coupons)
      await Promise.all(orderItem.map(async (cart) => Cart.findOneAndUpdate({ _id: cart._id }, { orderId: orders[i]._id, couponId: coupon._id })))
      const total = Math.ceil(getTotal(orderItem, coupon.percent))
      const products = {}
      for (let j = 0; j < orderItem.length; j++) {
        products[orderItem[j]._id] = orderItem[j]
      }
      await Order.findOneAndUpdate({ _id: orders[i]._id }, { total, products })
    }
    console.log('Done!')
  } catch (err) {
    console.log(err)
  } finally {
    process.exit()
  }
})
