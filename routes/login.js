const express = require('express')
const router = express.Router()
const bcrypt = require ('bcryptjs')
const passport = require('passport');

// load user model
const User = require('../models/User')

//login page
router.get('/login', (req, res) => {
    res.render('login')
})


const errors = [];
const success = [];

// Handle Login
router.post('/login', (req, res, next)=> {
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