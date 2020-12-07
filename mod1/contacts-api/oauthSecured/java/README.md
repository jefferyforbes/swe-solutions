# Overview
This sample demonstrates how to secure an API using OAuth.
Please note that the code is not production ready, it exists to demonstrate concepts.

## Building this application into IntelliJ
> File->New->Project/Module from existing source

## Running this application
Under the `Maven` menu on the right hand side, select the project and then select:
> Plugins -> spring-boot -> sprint-boot:run
The application should start on port 8080.

## Calling the API
You firstly need to obtain a valid OAuth token by using Postman/cURL to call:

`POST https://[your Auth0 environment].eu.auth0.com/oauth/token` 

with the following request body:
```json
{
  "audience": "https://contacts",
  "grant_type": "client_credentials",
  "client_id": "uM1QlHYwOcQ33YNTBVQEPkwm5CHKd1Zb",
  "client_secret": "G1XVwHP3yDVTJcQ7MFo3WUrjOLC3B-4NwvVh1iM8gQVIY3XuyC9tW-h-yD9NVXBF"
}
```

Then use Using Postman / cURL to call:
`GET http://localhost:8080/contacts/me`
passing the `access_token` returned from the previous call in the `Bearer Token` header.

## Terminating the application
Click on the red circle in the bottom left