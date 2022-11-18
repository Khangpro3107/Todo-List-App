const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Todo = require("./models/Todo");
const User = require("./models/User");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(morgan("common"));
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.log(err.message));

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json(todos);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(`Error at ${req.originalUrl}.`);
  }
});

app.get("/todo/:id", async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const item = await Todo.findOne({ _id: req.params?.id });
      if (item) return res.status(200).json(item);
      else return res.status(404).json(null);
    } else return res.status(404).json(null);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(`Error at ${req.originalUrl}.`);
  }
});

app.post("/todo/new", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    return res.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(`Error at ${req.originalUrl}.`);
  }
});

app.delete("/todo/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    return res.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(`Error at ${req.originalUrl}.`);
  }
});

app.patch("/todo/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      desc: req.body.desc,
      completed: req.body.completed,
      deadline: req.body.deadline,
      timestamp: Date.now(),
    });
    return res.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(`Error at ${req.originalUrl}.`);
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const isValidPassword = await bcrypt.compare(req.body.password, user.password);
      if (isValidPassword) return res.status(200).json({username: req.body.username, msg: "Login successful!", result: true});
    }
    return res.status(401).json({msg: "Invalid login credentials.", result: false});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(`Error at ${req.originalUrl}.`);
  }
});

app.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await User.create({
      username: req.body.username,
      password: hashedPassword
    })
    return res.status(200).json({username: req.body.username, msg: "Registration success!"})
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(`Error at ${req.originalUrl}.`);
  }
});

app.post("/register/find", async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (user) return res.status(200).json({username: user.username, result: true});
    return res.status(200).json({msg: "Username not found", result: false});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(`Error at ${req.originalUrl}.`);
  }
})

app.listen(process.env.PORT, console.log(`Server listening on port ${process.env.PORT}!`));
