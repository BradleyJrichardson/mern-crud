const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const todoRoutes = express.Router();
let Todo = require("./todo.model");

app.use(cors());
app.use(bodyParser.json());
app.use("/todos", todoRoutes);
// http://localhost:4000/todos/add for example

app.listen(PORT, () => {
  console.log("server is running on port: " + PORT);
});

// Define the development database
const mongoURI = "mongodb://localhost/todos";

// connecting to mongodb from your application
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(console.log("connected to mongodb"));

// using an endpoint to retrieve all the todos from the db
todoRoutes.route("/").get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

// getting a specific todo by id
todoRoutes.route("/:id").get((req, res) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
});

// adding a todo
todoRoutes.route("/add").post((req, res) => {
  let todo = new Todo(req.body);
  todo
    .save()
    .then(todo => {
      res.status(200).json({ todo: "todo added" });
    })
    .catch(err => {
      res.status(400).send("failed to add todo");
    });
});

todoRoutes.route("/update/:id").post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo) res.status(404).send("data is not found");
    else todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;

    todo
      .save()
      .then(todo => {
        res.json("Todo updated");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});
