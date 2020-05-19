const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const { forwardAuthenticated } = require('../config/auth')

// homepage
router.get('/', forwardAuthenticated, (req, res) => {
    res.render('index')
})

// user account
router.get('/account', ensureAuthenticated, (req, res) => {
    res.render('account', {layout: 'account-layout', name: req.user.username})
    
})

   

module.exports = router