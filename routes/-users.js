const express = require('express')
const router = express.Router()
const bcrypt = require ('bcryptjs')
const passport = require('passport');

// load user model
const User = require('../models/User')

const saltRounds = 10;

//login page
router.get('/login', (req, res) => {
    res.render('login')
})

// register page
router.get('/register', (req, res) => {
    res.render('register')
})

// user account
router.get('/account', (req, res) => {
    res.render('account')
})

// Handle Register
router.post('/register', (req, res) => {
  const { username, password, password2, postcode} = req.body;

  const errors = [];
  const success = [];

  //check inputs
  if(!username || !password || !password2 || !postcode){
      errors.push({ msg: 'All fields required' });    
  }
  // check matching passwords
  if(password !== password2){
      errors.push({ msg: 'Passwords don\'t match'})
  }
  // 6 min chars for password
  if(password.length < 6){
    errors.push({ msg: 'Password needs to be at least 6 characters'})
  }
if(errors.length > 0){
    res.render('register', {
        errors,
        username,
        password,
        password2,
        postcode
    })

}else{
    // valid new user
    User.findOne({ username: username })
   
    .then(user => {
       
        if(user) {
           
            errors.push({ msg: 'Username is unavailable' })
            res.render('register', {
                errors,
                username,
                password,
                password2,
                postcode
            })
            }else{
                const newUser = new User({
                    username: username,
                    password: password,
                    postcode: postcode
                })
     
            bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
                if(err) throw err
                newUser.password = hash
                newUser.save()
                .then(user => {
                    success.push({ msg: 'Registration Successful, You Can Now Login' })
                    res.render('login', {
                        success
                    })
                })               
            })
                .catch(err => console.log(err))
            }
        })      
    }
})

// Handle Login
router.post(
    '/login',
    passport.authenticate('local', {
      failureRedirect: '/login'
    }), (req, res) => {
        res.redirect('/account');
    });
/* router.post('/login', (req, res, next)=> {
    passport.authenticate('local', {
        successRedirect: '/account', 
        failureRedirect: '/login', 
        failureFlash: true  
    })(req, res, next)
}) */
  
  // Handle Logout
  router.get('/logout', (req, res) => {
    req.logout();
    success.push({ msg: 'You are logged out'});
    res.render('login', {
        success
    });
  })
module.exports = router