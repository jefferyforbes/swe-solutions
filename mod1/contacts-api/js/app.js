const express = require("express");
const db = require('./database.js');

// initialise Express
const app = express();

// return the contacts for the currently logged in user
app.get("/contacts/me", (req, res) => {
    // TODO - add Basic Auth as per https://medium.com/javascript-in-plain-english/add-basic-authentication-to-an-express-app-9536f5095e88
    const sql = "select * from contacts where userId = 'mandy'";
    const params = []
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