const mongoose = require('mongoose');

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