const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const user = require('../models/User') 
const connected = [];

// homepage
router.get('/', (req, res) => {
    res.render('index')
})

// chat
router.get('/localChat', (req, res) => {

    var user = req.user.username;
    connected.push(user);
    console.log(connected);
    res.render('localChat', {layout: 'account-layout', name: user, connected: connected});                                       
})

// end chat 
router.get('/localChat/endchat', (req, res) => {

    var user = req.user.username;
    connected.splice( connected.indexOf(user), 1 );
    console.log(connected);
    res.render('account', {layout: 'account-layout', name: user, postcode: req.user.postcode })  
}) 



module.exports = router