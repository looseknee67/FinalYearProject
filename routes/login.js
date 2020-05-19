const express = require('express')
const router = express.Router()
const bcrypt = require ('bcryptjs')
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth')

// load user model
const User = require('../models/User')

//login page
router.get('/login', forwardAuthenticated, (req, res) => {
    res.render('login')
})



// Handle Login
router.post('/login', forwardAuthenticated, (req, res, next)=> {
    passport.authenticate('local', {
        successRedirect: '/account', 
        failureRedirect: '/login',
         failureFlash: true 
       
    })(req, res, next)
})
  
  // Handle Logout
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('successMsg', 'You are logged out');
  res.redirect('/login');
  
    });
  

  module.exports = router