const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: { required: true,type: String },
    password: { required: true,type: String },
    role: { 
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
     },
    refreshToken: String
})

module.exports = mongoose.model('User', User );