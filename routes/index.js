const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureGuest, (req, res) => {
  res.render('Login')
})

router.get('/dashboard', ensureAuth, (req, res) => {
  res.json(req.user)
})

module.exports = router
