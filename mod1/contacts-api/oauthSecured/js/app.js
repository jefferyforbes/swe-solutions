const express = require("express");
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const db = require('./database.js');
require('dotenv').config('.env'); // Note: env vars should not be used in production

// initialise Express
const app = express();

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