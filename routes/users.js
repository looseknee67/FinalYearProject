const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require ('bcryptjs')

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
  console.log( username, password, password2, postcode)//////////////////////////////////
  let errors = [];

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
        console.log(username)/////////////////////////////////////////////////////
        if(user) {
            console.log(user)///////////////////////////////////////////////////////
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
      // hash password
          /*  bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {
                    res.redirect('/login')
                })
                .catch(err => console.log(err))
           }))      */
            bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
                if(err) throw err
                newUser.password = hash
                newUser.save()
                .then(user => {

                })
                res.redirect('/login')
            })
                /* .catch(err => console.log(err)) */
            }
        })      
    }
})

module.exports = router