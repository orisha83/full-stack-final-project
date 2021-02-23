const mongoose = require('mongoose');

let SubscriptionsSchema = new mongoose.Schema({
    memberId : String,
    movies : [{}]
})

module.exports = mongoose.model('subscriptions', SubscriptionsSchema);