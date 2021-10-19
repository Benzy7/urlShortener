const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
    mainUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String 
    },
    urlCode: {
        type: String
    },
    nbv: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model('Urls', UrlSchema);