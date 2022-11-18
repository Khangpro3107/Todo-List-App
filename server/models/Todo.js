const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  desc: {
    type: String,
    maxLength: 200,
  },
  deadline: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
