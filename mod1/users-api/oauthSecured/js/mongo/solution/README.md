## Usage

- NPM install to install packages
- nodemon index or node index should start the server
- Make a request for a token (see below)
- Call the endpoints with the token in the auth headers

## Make a request for a token

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
