const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/user')
const userController = {
  signIn: async (req, res, next) => {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username, role: 'admin' })
      if (!user) return res.status(401).json({ status: 'error', message: '登入失敗' })

      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (!isPasswordMatch) return res.status(401).json({ status: 'error', message: '登入失敗' })

      // sign JWT, 5 days valid
      const userData = user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '5d' })
      res.status(200).json({
        status: 'success',
        token,
        expired: Date.now() + 5 * 24 * 60 * 60 * 1,
        user: req.user,
        message: '登入成功'
      })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = userController
