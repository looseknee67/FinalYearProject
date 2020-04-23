const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/account', (req, res) => {
    res.render('account')
})



module.exports = router