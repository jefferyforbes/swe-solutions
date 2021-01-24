const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const db = require("./database.js");
const cors = require("cors"); // may not be required

// require("dotenv").config(".env"); // Note: env vars should not be used in production

// initialise Express
const app = express();

// specify out request bodies are json
app.use(express.json());

app.use(cors());

// create middleware for checking the JWT
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-tkw8v2ct.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://users",
  issuer: "https://dev-tkw8v2ct.eu.auth0.com/",
  algorithms: ["RS256"],
});

app.options("/users", (req, res) => {});

// return all users
app.get("/users", checkJwt, (req, res) => {
  const sql = "select * from users";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// return the matching user
app.get("/users/:id", checkJwt, (req, res) => {
  const sql = "select * from users where id = ?";
  db.all(sql, req.params.id, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// update a user
app.put("/users/:id", checkJwt, (req, res) => {
  const sql = "update users set firstname=?, lastname=? where id=?";
  const data = req.body;
  console.log(data.firstname);
  console.log(data.lastname);
  console.log(req.params.id);
  db.run(sql, [data.firstname, data.lastname, req.params.id], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({
      message: "success",
    });
  });
});

// create a new user
app.post("/users", checkJwt, (req, res) => {
  const sql = "insert into users (firstname, lastname) values(?,?)";
  const data = req.body;
  db.run(sql, [data.firstname, data.lastname], (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({
      message: "success",
    });
  });
});

// delete a user
app.delete("/users/:id", checkJwt, (req, res) => {
  const sql = "delete from users where id = ?";
  db.all(sql, req.params.id, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
    });
  });
});

// default response for any other request
app.use(function (req, res) {
  res.status(404);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
