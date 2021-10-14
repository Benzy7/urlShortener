const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
    mainUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    nbv: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model('Urls', UrlSchema);