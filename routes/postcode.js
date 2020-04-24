const express = require('express')
const router = express.Router()

const Postcode = require('../models/Postcode')


router.get ('/postcodeCheck', (req, res) =>{
    res.render('postcodeCheck')
})


// checkpostcode
router.post('/postcodeCheck', (req, res) =>{
    const { postcode } = req.body;
    console.log('first post' + postcode)////////////////////////////////////////////////////
    const errors = []
    
   /*  if(!postcode){
    errors.push({ msg: 'Please Enter A Postcode'})
    } */
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
            console.log('help1' + post )////////////////////////////////
            if(post) {
                console.log('help2' + post )////////////////////////////////////////
        errors.push({ msg: 'Postcode Found' })       
        res.render('postcodeCheck', {
            errors,
            postcode
        })
        }else{
            errors.push({ msg: 'No Go' })
            res.render('postcodeCheck', {
                errors,
                postcode
            })
        
        }

    })
}
})

module.exports = router