var mongoose = require('mongoose');

const user = mongoose.model('User', {
    name: String,
    recovData: Array,
    date: String
});

module.exports = user
