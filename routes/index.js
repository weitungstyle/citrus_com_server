const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const customer = require('./modules/customer')
const { authenticated, authenticatedSuccess } = require('../middleware/auth')

router.post('/user/check', authenticated, authenticatedSuccess)

router.use('/admin', admin)
router.use('/', customer)

module.exports = router
