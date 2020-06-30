var express = require("express");
var app = new express();

const mongoose = require('mongoose')
const router = express.Router()

var Posts = require('../models/posts');
var Comments = require('../models/comments');
var Swaps = require('../models/swaps');

// get user posts
router.get('/postList', (req, res) => {
    const user = Posts.find({user: req.user.username});
    Posts.find(user).exec((err, docs) => {
        if(!err){
            res.render('userPosts',{layout: 'account-layout', list: docs })
           
        }

    })
})

// get user comments
router.get('/commentList', (req, res) => {
    const user = Comments.find({user: req.user.username, commentId: Comments.postId});
    Comments.find(user).exec((err, docs) => {
        if(!err){
            res.render('userComments',{layout: 'account-layout', list: docs })
           
        }

    })
})

// get user swaps
router.get('/swapList', (req, res) => {
    const user = Swaps.find({user: req.user.username, swapsId: Swaps.postId});
    Swaps.find(user).exec((err, docs) => {
        if(!err){
            res.render('userSwaps',{layout: 'account-layout', list: docs })
           
        }

    })
})

// get comment to edit
router.get('/comment/edit/:id', (req,res) => {
    Comments.findById(req.params.id, (err, doc) => {

        if (err) {
          console.log(err);
        } else {
              res.render('editComment', { layout: 'account-layout', list:doc });
        }
    })
})

// edit user comment
router.post('/editcomment/:id', async (req, res) =>{

    let comment
    
    try {
        comment = await Comments.findOneAndUpdate(req.params.id)
        comment.comment = req.body.comment,
       
        await comment.save();

        Comments.find({}, (err, list) => {
        res.render('userComments', { layout: 'account-layout',  name: req.user.username, postcode: req.user.postcode, list:list});
        })

    } catch {
        if(err){
            console.log(err)
        }
    }
})           

// delete user comment 
router.get('/comment/delete/:id',(req,res) =>{
    Comments.findByIdAndRemove(req.params.id, (err) => {
         if (!err) {
           
                res.render('account', { layout: 'account-layout',  name: req.user.username, postcode: req.user.postcode});
                           
         } else {
            console.log(err);
         }
     }) 
 }) 

// get user post to edit
router.get('/post/edit/:id', (req,res) => {
    Posts.findById(req.params.id, (err, doc) => {

        if (err) {
          console.log(err);
        } else {
              res.render('editPost', { layout: 'account-layout', list:doc });
        }
    })
})


// edit user post 
router.post('/editpost/:id', async (req, res, next) => {

    req.post = await Posts.findById(req.params.id)
    next()
    
    }, editPost())
     
    function editPost() {
        return async (req, res) => {
            let post = req.post
            post.title = req.body.title
            post.content = req.body.content
    
            try{
                post = await post.save()
                res.render('account', { layout: 'account-layout',  name: req.user.username, postcode: req.user.postcode});
    
            } catch(e) {
    
            res.render('userPosts', { layout: 'account-layout',  name: req.user.username, postcode: req.user.postcode});
        }
    }
    }
   
// delete user post
router.get('/post/delete/:id',(req, res) =>{
    Posts.findByIdAndRemove(req.params.id, (err) => {
          if (!err) {
              
                 res.render('account', { layout: 'account-layout',  name: req.user.username, postcode: req.user.postcode});
                           
          } else {
             console.log(err);
          }
      }) 
 })

// delete user swap
router.get('/swaps/delete/:id',(req,res) =>{
    Swaps.findByIdAndRemove(req.params.id, (err) => {
         if (!err) {
           
                res.render('account', { layout: 'account-layout',  name: req.user.username, postcode: req.user.postcode});
                           
         } else {
            console.log(err);
         }
     }) 
 })   

 // get user swap to edit  
router.get('/swaps/edit/:id', (req, res) => {
    Swaps.findById(req.params.id, (err, doc) => {

        if (err) {
          console.log(err);
        } else {
              res.render('editSwap', { layout: 'account-layout', list:doc });
        }
    })
})

// edit user swap 
router.post('/editswap/:id',  async  (req, res, next) => {

    req.swap = await Swaps.findById(req.params.id)
    next()
    
    }, editSwap())
    
    
    function editSwap () {
        
        return async (req, res) => {
            console.log('hello');
            let swap = req.swap
            swap.title = req.body.title
            swap.desc = req.body.desc
            /* swap.img = req.body.image *//* { 
                data: fs.readFileSync('./uploads/' + req.file.filename), 
                contentType: 'image/png'
            }, */
            swap.catagory = req.body.catagory
            swap.price = req.body.price   
            
                swap = await swap.save()

                res.render('account', { layout: 'account-layout',  name: req.user.username, postcode: req.user.postcode});               
    }
}


module.exports = router