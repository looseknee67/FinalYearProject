var mongoose = require('mongoose');
const { urlencoded } = require('body-parser');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const contactSchema = new mongoose.Schema({
target: {
    type :String,
    required: true  
},
title: {
    type: String,
    required: true    
},

message: {
    type: String,
    required: true   
},

sender: {type: String,
    required: true  
    
}
});

module.exports = mongoose.model('Contact', contactSchema, 'contact');