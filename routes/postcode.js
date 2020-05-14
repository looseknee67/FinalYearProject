const express = require('express')
const router = express.Router()

const Postcode = require('../models/Postcode')


router.get ('/postcodeCheck', (req, res) =>{
    res.render('postcodeCheck')
})


// checkpostcode
router.post('/postcodeCheck', (req, res) =>{
    const  post  = req.body.postcode.replace(/ /g, "");; // takes out any spaces
    
    const  postcode = post.replace(/.{3}$/,' $&');// adds in space before last 3 digits
 
    const errors = [] 
   
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
                
       /*  errors.push({ msg: 'Postcode Found' })  */      
        res.render('register', {
            errors,
            postcode
        })
        }else{
            errors.push({ msg: 'No Go' })
            res.render('nogo', {
                errors,
                postcode
            })
        
        }

    })
}
})

module.exports = router