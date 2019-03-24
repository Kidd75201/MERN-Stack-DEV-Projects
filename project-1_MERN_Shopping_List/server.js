// Bring in dependencies
const express = require("express");
const mongoose = require("mongoose"); // ORM interact with MongoDB
const bodyParser = require("body-parser"); // takes request and get data from body
const path = require("path");

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

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// create var to port
const port = process.env.PORT || 5000;

// listen to port
app.listen(port, () => console.log(`Server started on port ${port}`));
