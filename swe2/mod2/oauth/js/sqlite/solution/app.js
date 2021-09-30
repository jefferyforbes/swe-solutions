const express = require("express");
const db = require('./database.js');
const bcrypt = require('bcrypt');

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors'); 

require('dotenv').config('.env'); // Note: env vars should not be used in production

// initialise Express
const app = express();

app.use(cors());

// specify out request bodies are json
app.use(express.json());

// create middleware for checking the JWT
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}`,
  algorithms: ['RS256']
  });

// our custom async authorizer middleware, this is called for each request
function dbAuthorizer(username, password, callback) {
  const sql = "select password from users where username = ?;";
  db.get(sql, [username], async (err, user) => {
    err ? callback(err) : bcrypt.compare(password, user.password, callback);
  });
}

// return all messages
app.get("/messages", checkJwt, (req, res) => {
  const sql = "select * from messages";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json(
      rows
    )
  });
});

// return the matching message
app.get("/messages/:id", checkJwt, (req, res) => {
  const sql = "select * from messages where id = ?";
  db.all(sql, req.params.id, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json(rows)
  });
});

// update a message
app.put("/messages/:id", checkJwt, (req, res) => {
  const sql = "update messages set message=? where id=?";
  const data = req.body;
  console.log(data);
  console.log(req.params.id);
  db.run(sql, [data.message, req.params.id], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json({
      "message": "success"
    })
  });
});

// create a new message
app.post("/messages", checkJwt, (req, res) => {
  const sql = "insert into messages (message) values(?)";
  const data = req.body;
  db.run(sql, [data.message], (err) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(201).json({
      "message": "success"
    })
  });
});

// delete a message
app.delete("/messages/:id", checkJwt, (req, res) => {
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