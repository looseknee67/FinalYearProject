const mongoose = require('mongoose');

const PostcodeSchema = new mongoose.Schema({
postcode: {
    type :String,
    required: true    
},

local: {
    type: String,
    required: true 
},

});

module.exports = mongoose.model('Postcode', PostcodeSchema, 'postcodes');