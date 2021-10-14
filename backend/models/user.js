const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        allowNull: false
    },
    password: {
        type: String,
        required: true,
        allowNull: false
    },
    email: {
        type: String,
        required: true,
        allowNull: false
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
})

module.exports = mongoose.model('Users', UserSchema);