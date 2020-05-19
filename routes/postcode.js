const express = require('express')
const router = express.Router()
const { forwardAuthenticated } = require('../config/auth')

const Postcode = require('../models/Postcode')


router.get ('/postcodeCheck', forwardAuthenticated, (req, res) =>{
    res.render('postcodeCheck')
})


// checkpostcode
router.post('/postcodeCheck', (req, res) =>{
    const  post  = req.body.postcode.replace(/ /g, "");; // takes out any spaces
    
    const  postcode = post.replace(/.{3}$/,' $&');// adds in space before last 3 digits
 
    const errors = [] 
    const success = [] 
   
    if( !postcode ){
        errors.push({ msg: 'Please Enter A Valid Postcode'})
    }
    if(errors.length > 0){
        res.render('postcodeCheck', {
            errors,
            postcode
        })       
    
    }else{
        Postcode.findOne({ postcode: postcode })
        .then( post => {
            
            if(post) {
                
                success.push({ msg: 'Your Postcode Is valid, Please complete registration' })  
                    res.render('register',   { 
                        success,   
                            postcode  
         })            
          
        }else{
            errors.push({ msg: 'Postcode Not Found' })
            res.render('nogo', {
                errors,
                postcode
            })
        
        }

    })
}
})


module.exports = router