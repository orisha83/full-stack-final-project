const mongoose = require('mongoose');

let UsersSchema = new mongoose.Schema({
    userName : String,
    password : String
})

module.exports = mongoose.model('users', UsersSchema);