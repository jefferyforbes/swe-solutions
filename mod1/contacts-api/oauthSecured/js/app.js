const express = require("express");
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const db = require('./database.js');

// initialise Express
const app = express();

// create middleware for checking the JWT
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-1u1yg6-m.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://contacts',
  issuer: 'https://dev-1u1yg6-m.eu.auth0.com/',
  algorithms: ['RS256']
});

//app.use(checkJwt);

app.get("/contacts", (req, res) => {
  res.json({"message":"success"});
});

// return the contacts for the currently logged in user
app.get("/contacts/me", checkJwt, (req, res) => {
  const userEmail = req.user['https://example.com/email']; // see Rules in Auth0
  console.log("userId is:"+userEmail); // TODO - try to get name and look it up
  // TODO - bind variables for security & fix response if not authorised (too much exposure currently)
  const sql = "select * from contacts where userId = 'mandy'";
  const params = []
  db.all(sql, params, (err, rows) => {
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

// default response for any other request
app.use(function (req, res) {
  res.status(404);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});