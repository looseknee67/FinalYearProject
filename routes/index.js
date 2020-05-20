const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
//const user = require('../models/User') 

// homepage
router.get('/', (req, res) => {
    res.render('index')
})

// messageboard
  router.get('/messageBoard', (req, res) => {
    res.render('messageboard', {layout: 'account-layout'})
})   

// swapshop
router.get('/swapShop', (req, res) => {
    res.render('swapShop', {layout: 'account-layout'})
})   

// chat
router.get('/localChat', (req, res) => {
    res.render('localChat', {layout: 'account-layout'})
})   

// user account
router.get('/account',  (req, res) => {                                        //ensureAuthenticated,
    res.render('account', {layout: 'account-layout', name: req.user.username})
    
})

router.get('/nogo',(req, res) => {
    res.render('nogo', { layout: 'account-layout' })
     
})


module.exports = router