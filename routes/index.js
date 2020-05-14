const express = require('express')
const router = express.Router()

// homepage
router.get('/', (req, res) => {
    res.render('index')
})

// user account
router.get('/account', (req, res) => {
    res.render('account')
})







     
            
        
    

module.exports = router