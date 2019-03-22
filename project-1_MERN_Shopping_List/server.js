// Bring in dependencies
const express = require("express");
const mongoose = require("mongoose"); // ORM interact with MongoDB
const bodyParser = require("body-parser"); // takes request and get data from body

const items = require("./routes/api/items");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/items", items);

// create var to port
const port = process.env.PORT || 5000;

// listen to port
app.listen(port, () => console.log(`Server started on port ${port}`));
