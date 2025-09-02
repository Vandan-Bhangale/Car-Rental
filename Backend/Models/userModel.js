const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type:String,
        enum: ['guest', 'owner'],
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;