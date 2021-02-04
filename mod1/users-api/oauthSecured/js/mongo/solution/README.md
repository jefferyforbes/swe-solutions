# Overview:

Uses node, mongo and express to create CRUD API with routes
to create, read, update and delete users.

Secured using OAuth client credentials flow
Machine-to-machine app

See: https://auth0.com/docs/flows/client-credentials-flow?_ga=2.89648603.1302072122.1612373406-420700416.1607004121

# Usage

- NPM install to install packages
- nodemon index or node index should start the server
- Make a request for a token (see below)
- Call the endpoints with the token in the auth headers

# Make a request for a token

POST https://dev-y7rfyinf.eu.auth0.com/oauth/token
content-type: application/json

```json
{
  "client_id": "your id",
  "client_secret": "your secret",
  "audience": "https://users",
  "grant_type": "client_credentials"
}
```
