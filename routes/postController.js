var express = require("express");
var app = new express();

const mongoose = require('mongoose')
const router = express.Router()

var Posts = require('../models/posts');
var Comments = require('../models/comments');


// createpost
router.get('/createPost', (req, res) => {
    res.render('createPost', {layout: 'account-layout'})
})

// details of post
router.get('/post-detail', (req, res) => {
    res.render('post-detail', {layout: 'account-layout'})
})   

/// get all posts
 router.get('/messageboard',(req, res) =>{
    
    Posts.find({}, (err, posts) => {
         if (err) {
          console.log(err);           
         
        } else {
           res.render('messageboard', {layout: 'account-layout', posts: posts});

        }
    }) 
})

// display comments
router.get('/posts/detail/:id',(req,res) =>{
    Posts.findById(req.params.id, (err, postDetail) => {
        if (err) {
          console.log(err);
        } else {
            Comments.find({'postId':req.params.id}, (err, comments) => {
                res.render('postDetail', { layout: 'account-layout', postDetail: postDetail, comments: comments, postId: req.params.id, user: req.user.username});
            })
        }
    }) 
})  

// save post
 router.post('/newpost', (req, res) => {
    let errors = [];
    const post = new Posts();

    post.title= req.body.title,
    post.content= req.body.content,
    post.user= req.user.username 
 
    if(post.title == "" || post.content == "" ){

        errors.push({ msg: 'All fields required' }); 
    }

    if(errors.length > 0){

        res.render('createPost', {layout: 'account-layout', errors })         
                 
        }else{

    post.save((err) => {
        if(!err){
            Posts.find({}, (err, posts) => {
                                                       
            res.render('messageboard', {layout: 'account-layout', posts: posts});
        })
    }else{
            console.log('An error occured' + err);
        }
    })
    }   
 })


module.exports = router