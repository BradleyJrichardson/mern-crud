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
