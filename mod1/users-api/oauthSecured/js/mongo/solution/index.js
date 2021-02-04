/*
  Overview:

  Uses node, mongo and express to create CRUD API with routes 
  to create, read, update and delete users.

  Secured using OAuth client credentials flow
  Machine-to-machine app

  See: https://auth0.com/docs/flows/client-credentials-flow?_ga=2.89648603.1302072122.1612373406-420700416.1607004121
*/

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
app.post("/users", newUserController);

// READ
app.get("/users", checkJwt, getUsersController);

// UPDATE
app.patch("/users", updateUsersController);

// DELETE
app.delete("/users", deleteUsersController);

app.listen(3001, () => {
  console.log("App listening on port 3001");
});
