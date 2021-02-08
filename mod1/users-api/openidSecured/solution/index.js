const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const oidcConfig = require("./config");
const newUserController = require("./controllers/createUser");
const getUsersController = require("./controllers/readUser");
const updateUsersController = require("./controllers/updateUser");
const deleteUsersController = require("./controllers/deleteUser");
const { auth } = require("express-openid-connect");
const { urlencoded } = require("body-parser");

// init express
const app = new express();

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(oidcConfig));

// use body-parser to parse req.body
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// specify request body is json - app.use(bodyParser.json()) might also work
app.use(express.json());

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

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.listen(3001, () => {
  console.log("App listening on port 3001");
});
