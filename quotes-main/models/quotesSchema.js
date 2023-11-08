const mongoose = require('mongoose')
const Schema = mongoose.Schema
const quoteSchema = new Schema({
    author: {
        type: String,
        default: "undefined",
    },
    quote: {
        type: String,
        default: "unknown",
    },
    tempQuote:{
        type: String,
        default: "unknown",
    },
})
module.exports = mongoose.model('UserSchema', quoteSchema);