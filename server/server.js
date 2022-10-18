const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");
const app = express();
const morgan = require('morgan')
require("dotenv").config();

app.use(morgan('common'));
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.log(err.message));

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json(todos);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/todo/new", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    return res.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/todo/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    return res.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
  }
});

app.patch("/todo/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      text: req.body.text,
      completed: req.body.completed,
      timestamp: Date.now(),
    });
    console.log("todo: ", todo)
    return res.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(3001, console.log("Server on port 3001..."));
