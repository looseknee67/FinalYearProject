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


module.exports = router