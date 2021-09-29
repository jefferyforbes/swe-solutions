/*
Overview:

Uses node, mongo and express to create CRUD API with routes 
to create, read, update and delete users.
*/

const mongoose = require("mongoose");
const express = require("express");
const basicAuth = require("express-basic-auth");
const bodyParser = require("body-parser");
const newUserController = require("./controllers/createUser");
const getUsersController = require("./controllers/readUser");
const updateUsersController = require("./controllers/updateUser");
const deleteUsersController = require("./controllers/deleteUser");
const customAuthoriser = require("./middleware/customAuthoriser");
const { urlencoded } = require("body-parser");
const loginController = require("./controllers/login");
const logoutController = require("./controllers/logout");

// init express
const app = new express();

// use body-parser to parse req.body
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

basicAuthOptions = {
  authorizer: customAuthoriser,
  authorizeAsync: true,
  unauthorizedResponse: (req) => {
    return `Sorry, but this user is not authorised to view this resource.`;
  },
};

// specify request body is json - app.use(bodyParser.json()) might also work
app.use(express.json());

// connect to mongo
mongoose.connect(
  "mongodb://localhost/your-db-name-here",
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

// LOGIN
app.post("/login", basicAuth(basicAuthOptions), loginController);

// LOGOUT
app.get("/logout", logoutController);

// CREATE
app.post("/users", newUserController);

// READ
app.get("/users", getUsersController);

// UPDATE
app.patch("/users", updateUsersController);

// DELETE
app.delete("/users", deleteUsersController);

app.listen(3001, () => {
  console.log("App listening on port 3001");
});
