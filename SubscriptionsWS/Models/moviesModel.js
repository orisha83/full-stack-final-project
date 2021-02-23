const mongoose = require('mongoose');

let MoviesSchema = new mongoose.Schema({
    name : String,
    genres : [String],
    image : String,
    premiered : Date
})

module.exports = mongoose.model('movies', MoviesSchema);