var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
var Posts = new Schema({
title: String,    
content: String,
user: String

}, {
    timestamps: true
});
module.exports = mongoose.model('Posts', Posts);