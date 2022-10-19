const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text: {
        type: String,
        required: true,
        maxLength: 50
    },
    completed: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        default: Date.now
    },
    timestamp: {
        type: String,
        default: Date.now
    }
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo