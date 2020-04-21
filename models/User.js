const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
Username: {
    type :String    
},
Password: {
    type: String    
},

Postcode: {
    type: String,
    default: "PL"
},

});

module.exports = mongoose.model('User', userSchema);