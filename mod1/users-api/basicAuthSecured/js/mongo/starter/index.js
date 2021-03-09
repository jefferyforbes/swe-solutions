const mongoose = require("mongoose");
const express = require("express");
const basicAuth = require("express-basic-auth");
const newUserController = require("./controllers/createUser");
const getUsersController = require("./controllers/readUser");
const updateUsersController = require("./controllers/updateUser");
const deleteUsersController = require("./controllers/deleteUser");
const customAuthoriser = require("./middleware/customAuthoriser");
const { urlencoded } = require("body-parser");

// init express
const app = new express();

// parse req body
app.use(express.json());

// use basic auth and custom middleware function
app.use(basicAuth({}));

// connect to mongo
mongoose.connect(
  "mongodb://localhost/your-db-here",
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

// CREATE
app.post("", newUserController);

// READ
app.get("", getUsersController);

// UPDATE
app.patch("", updateUsersController);

// DELETE
app.delete("", deleteUsersController);

app.listen(3001, () => {
  console.log("App listening on port 3001");
});
