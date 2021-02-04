const config = require("../config");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// create middleware for checking the JWT
module.exports = checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.oauth.AUTH0_DOMAIN}.eu.auth0.com/.well-known/jwks.json`,
  }),
  audience: config.oauth.AUTH0_AUDIENCE,
  // issuer: `https://${config.oauth.AUTH0_DOMAIN}.eu.auth0.com`,
  algorithms: ["RS256"],
});
