const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxLength: 10,
        minlength: 4,
        unique: true
    },
    password: {
        type: String
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User