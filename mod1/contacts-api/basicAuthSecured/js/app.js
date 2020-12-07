const express = require("express");
const db = require('./database.js');
const basicAuth = require('express-basic-auth');

// initialise Express
const app = express();

// check for a basic auth header with correct credentials
// TODO - make this a hash in database!
app.use(basicAuth({
  users: { 'admin': 'secret' },
  challenge: true,
  unauthorizedResponse: (req) => {
    return `unauthorized. ip: ${req.ip}`
  }
}));

// return the contacts for the currently logged in user
app.get("/contacts/me", (req, res) => {
    // TODO - bind variables for security
    const sql = "select * from contacts where userId = 'mandy'";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
   });

// default response for any other request
app.use(function(req, res){
    res.status(404);
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});