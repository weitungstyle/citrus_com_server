const passport = require('../config/passport') // 引入 passport

function authenticated (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      err.message = 'Internal Server Authentication Error!'
      return next(err)
    }
    if (!user) {
      return res.status(401).json({ status: 'error', message: 'unauthorized' })
    }
    req.user = user
    return next()
  })(req, res, next)
}

function authenticatedSuccess (req, res, next) {
  res.status(200).json({ status: 'success' })
}

module.exports = {
  authenticated,
  authenticatedSuccess
}
