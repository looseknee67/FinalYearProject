var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
var Comments = new Schema({
comment :String,
postId :String,
user: String   

}, {
    timestamps: true
})
module.exports = mongoose.model('Comments', Comments);