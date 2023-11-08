const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const expiryTimeMinute = 120 ;
let currentDate = new Date();
currentDate.setMinutes(currentDate.getMinutes() + expiryTimeMinute);

const expirySchema = new Schema({
    createdAt:{
        type:Date,
        expires:0,
        default:currentDate,
    },
    apikey:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('ExpirySchema', expirySchema);