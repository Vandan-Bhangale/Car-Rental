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
    },
    time: {
        type : Date,
        default: Date.now
    },
    localTime: {
    type: String,
    default: () => {
      // Store local time as string when user signs up
      return new Date().toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;