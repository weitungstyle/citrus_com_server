if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')

// include seeds files
const users = require('./users.json').users
const coupons = require('./coupons.json').coupons
const products = require('./products.json').products

// include models
const User = require('../models/user')
const Coupon = require('../models/coupon')
const Product = require('../models/product')

// connect to database
const db = require('../connection/mongoose')

db.once('open', async () => {
  console.log('Begining building users\', products\', and coupons\' data...')
  try {
    await Promise.all(
      users.map(async user => {
        const { username, password } = user
        await User.create({
          username,
          password: bcrypt.hashSync(password, 12)
        })
        console.log('Users created.')
        await Product.insertMany(products)
        console.log('Products created.')
        await Coupon.insertMany(coupons)
        console.log('Coupons created. All done!')
      }
      ))
  } catch (err) {
    console.log(err)
  } finally {
    process.exit()
  }
})
