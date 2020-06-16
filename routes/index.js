const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const user = require('../models/User') 
const connected = []

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

    user.findOne({
        username: req.user.username
      }).then(user => {

       if(connected.indexOf(user) == -1){           
        connected.push(user); 
       }    
        }),              
    
            res.render('localChat', {layout: 'account-layout', name: user.user, connected: connected});                                       
}) 
// end chat
router.get('/localChat/endchat', (req, res) => {

    user.findOne({
        username: req.user.username
      }).then(user => {

       if(user !== ""){
        return connected.splice(0, connected.length);   
        
       }
            
        }),
        
        res.render('account', {layout: 'account-layout', name: user.user})
    
}) 

// user account
router.get('/account',  (req, res) => {                                        
    res.render('account', {layout: 'account-layout', name: req.user.username})
    
})


module.exports = router