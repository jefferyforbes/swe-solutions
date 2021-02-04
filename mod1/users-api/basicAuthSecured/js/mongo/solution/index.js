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

// init express
const app = new express();

// use body-parser to parse req.body
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// specify request body is json - app.use(bodyParser.json()) might also work
app.use(express.json());

// use basic auth and custom middleware function
app.use(
  basicAuth({
    authorizer: customAuthoriser,
    authorizeAsync: true,
    unauthorizedResponse: (req) => {
      return `Sorry, but '${req.body.username}' is not authorised to view this resource.`;
    },
  })
);

// connect to mongo
mongoose.connect(
  "mongodb://localhost/node-mongo-api",
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

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
