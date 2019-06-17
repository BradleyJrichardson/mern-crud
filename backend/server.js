const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("server is running on port: " + PORT);
});

// Define the development database
const mongoURI = "mongodb://localhost/todos";

// connecting to mongodb from your application
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(console.log("connected to mongodb"));
