const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const newUserController = require("./controllers/createUser");
const getUsersController = require("./controllers/readUser");
const updateUsersController = require("./controllers/updateUser");
const deleteUsersController = require("./controllers/deleteUser");
const checkJwt = require("./middleware/jwt");

const cors = require("cors");
const { urlencoded } = require("body-parser");

// init express
const app = new express();

// permit other domains to load our resource
app.use(cors());

// use body-parser to parse req.body
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// parses incoming requests with json payloads
app.use(express.json());

// connect to mongo
mongoose.connect(
  "mongodb://localhost/node-mongo-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

// CREATE
app.post("/users", checkJwt, newUserController);

// READ
app.get("/users", checkJwt, getUsersController);

// UPDATE
app.patch("/users", checkJwt, updateUsersController);

// DELETE
app.delete("/users", checkJwt, deleteUsersController);

app.listen(3001, () => {
  console.log("App listening on port 3001");
});
