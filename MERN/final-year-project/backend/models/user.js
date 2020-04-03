var mongoose = require('mongoose');

const user = mongoose.model('User', {
    name: String,
    user: String,
    email: String,
    password: String,
    data: Array,
});

module.exports = user
