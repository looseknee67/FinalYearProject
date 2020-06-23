var express = require("express");
const router = express.Router()
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 

var Swaps = require('../models/swaps');

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
var upload = multer({ storage: storage }); 

// createswap
router.get('/createSwap', (req, res) => {
    res.render('createSwap', {layout: 'account-layout'})
})
// modal
router.get('/showModal/:id', (req, res) => {
    res.render('modal', {layout: 'account-layout'})
})

// contactSeller
 router.get('/contactSeller', (req, res) => {
    res.render('contactSeller', {layout: 'account-layout'})
})
 
// swapshop--- retrieve images
router.get('/swapShop', (req, res) => {
    Swaps.find({}, (err, swaps) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.render('swapShop', { layout: 'account-layout', swaps: swaps }); 
        } 
    }); 
}); 

 

// Uploading the image 
router.post('/newSwap', upload.single('image'), (req, res, next) => { 
  
    var obj = { 
        title: req.body.title, 
        desc: req.body.desc, 
        img: { 
            data: fs.readFileSync('./uploads/' + req.file.filename), 
            contentType: 'image/png'
        },
        user: req.user.username,
        catagory: req.body.catagory
    } 
     Swaps.create(obj,  (err, swaps) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            swaps.save(); 
             res.render('swapShop', {layout: 'account-layout', swaps: swaps, user: req.user.username}); 
        } 
    }); 
}); 

// modal
router.get('/item/detail/:id',(req,res) =>{
    Swaps.findById(req.params.id, (err, itemDetail) => {
        if (err) {
          console.log(err);
        } else {
            
                res.render('itemModal', { layout: 'account-layout', itemDetail: itemDetail, itemId: req.params.id, user: req.user.username});
            }
        })
    })
 



module.exports = router