# Express OpenID Connect Webapp Sample

This sample demonstrates authentication for an Express Node.js app. The sample quickly shows how to log in, log out, and view profile information of the logged-in user.

See a detailed walk-through of this sample app on the [Express Quickstart](https://auth0.com/docs/quickstart/webapp/express).

## Running This Sample Locally

1. Install the dependencies with npm:

```bash
npm install
```


2. Edit `.env` and replace the following values:

- `CLIENT_ID` - your Auth0 application client id
- `ISSUER_BASE_URL` - absolute URL to your Auth0 application domain (ie: `https://accountName.auth0.com`)
- `SECRET` - your application client secret`

3. Run the sample app:

```bash
npm start
```

The sample app will be served at `localhost:3000`.

