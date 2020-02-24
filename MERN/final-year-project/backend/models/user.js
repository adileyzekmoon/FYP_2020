var mongoose = require('mongoose');

const user = mongoose.model('User', {
    name: String,
    data: Array,
});

module.exports = user
