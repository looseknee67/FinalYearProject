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

// edit user comment
router.get('/comment/edit/:id', (req,res) => {
    Comments.findById(req.params.id, (err, doc) => {

        if (err) {
          console.log(err);
        } else {
              res.render('editComment', { layout: 'account-layout', list:doc });
        }
    })
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
router.get('/editpost/:id',(req, res) =>{
    let post
    Posts.findOneAndUpdate(req.params.id, 
        
        post.content = req.body.content,
        post.title = req.body.title,
        post.save())
        
         if (!err) {        
           
                res.render('account', { layout: 'account-layout',  name: req.user.username, postcode: req.user.postcode});
                         
         } else {
            console.log(err);
         }
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



module.exports = router