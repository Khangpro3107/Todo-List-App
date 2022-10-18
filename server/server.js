const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://khangle:khangle@cluster0.nvsfjle.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.log(err.message));

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

app.post("/todo/new", async (req, res) => {
  const todo = await Todo.create(req.body);
  res.status(200).json(todo);
});

app.delete("/todo/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json(todo);
});

app.patch("/todo/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, {
    text: req.body.text,
    completed: req.body.completed,
    timestamp: Date.now(),
  });
  res.status(200).json(todo);
});

app.listen(3001, console.log("Server on port 3001..."));
