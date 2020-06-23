var mongoose = require('mongoose');
const { urlencoded } = require('body-parser');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
var Swaps = new Schema({
title: String,    
desc: String,
img: { 
    data: Buffer, 
    contentType: String 
},
user: String,
catagory: String
},
{
    timestamps: true
});
module.exports = mongoose.model('Swaps', Swaps);