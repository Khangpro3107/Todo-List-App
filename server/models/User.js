const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxLength: 50
    },
    password: {
        type: String
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User