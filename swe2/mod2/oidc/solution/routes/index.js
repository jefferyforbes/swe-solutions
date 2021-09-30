const dotenv = require('dotenv');
var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const fetch = require("node-fetch");

dotenv.load();

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

router.get('/messages', requiresAuth(), async function (req, res, next) {
  let { token_type, access_token } = req.oidc.accessToken;
  console.log('token is:' + access_token);
  try {
    const response = await fetch('http://localhost:8080/messages', {
      method: 'GET',
      crossDomain: true,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const responseData = await response.json();

    res.render('messages', {
      messages: JSON.stringify(responseData),
      title: 'Messages page'
    });
  } catch (error) {
    // TODO - better error handling
    console.log(error);
    res.redirect("/");
  }

});

module.exports = router;
