const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
username: {
    type :String,
    required: true  
},
password: {
    type: String,
    required: true    
},

postcode: {
    type: String,
    required: true   
},

});

module.exports = mongoose.model('User', userSchema);