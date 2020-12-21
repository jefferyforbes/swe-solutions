const express = require("express");
const db = require('./database.js');
const basicAuth = require('express-basic-auth');
const bcrypt = require('bcrypt');

// initialise Express
const app = express();

// specify out request bodies are json
app.use(express.json());

// check for a basic auth header with correct credentials
app.use(basicAuth({
  authorizer: dbAuthorizer, // customer authorizer,
  authorizeAsync: true, // we check the db which makes this async
  challenge: true,
  unauthorizedResponse: (req) => {
    return `unauthorized. ip: ${req.ip}`
  }
}));

// our custom async authorizer middleware, this is called for each request
function dbAuthorizer(username, password, callback) {
  const sql = "select password from users where username = ?;";
  db.get(sql, [username], async (err, user) => {
    err ? callback(err) : bcrypt.compare(password, user.password, callback);
  });
}

// return all users
app.get("/users", (req, res) => {
  const sql = "select id, username, firstname, lastname from users";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
});

// return the matching user
app.get("/users/:id", (req, res) => {
  const sql = "select id, username, firstname, lastname from users where id = ?";
  db.all(sql, req.params.id, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
});

// update a user
app.put("/users/:id", (req, res) => {
  const sql = "update users set firstname=?, lastname=? where id=?";
  const data = req.body;
  console.log(data.firstname);
  console.log(data.lastname);
  console.log(req.params.id);
  db.run(sql, [data.firstname, data.lastname, req.params.id], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json({
      "message": "success"
    })
  });
});

// create a new user
app.post("/users", (req, res) => {
  const sql = "insert into users (username, password, firstname, lastname) values(?,?,?,?)";
  const data = req.body;
  db.run(sql, [data.username, data.password, data.firstname, data.lastname], (err) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(201).json({
      "message": "success"
    })
  });
});

// delete a user
app.delete("/users/:id", (req, res) => {
  const sql = "delete from users where id = ?";
  db.all(sql, req.params.id, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success"
    })
  });
});

// default response for any other request
app.use(function (req, res) {
  res.status(404);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});