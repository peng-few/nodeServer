const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Employee = new Schema({
    name: { required: true,type: String },
    position: { required: true,type: String }, 
})

module.exports = mongoose.model('Employee', Employee );