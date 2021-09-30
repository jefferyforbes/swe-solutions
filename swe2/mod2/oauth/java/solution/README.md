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

> `curl --location --request POST 'https://[your Auth0 environment].eu.auth0.com/oauth/token' \
--header 'Content-Type: application/json' \
--data-raw '{
  "audience": "messagesAPI",
  "grant_type": "client_credentials",
  "client_id": "[your machine-machine Auth0 app client id]",
  "client_secret": "[your machine-machine Auth0 app client secret]"
}'`

Use this token in the following calls:

To create a message:
>`curl --location --request POST 'http://localhost:8080/messages' \
--header 'Authorization: Bearer [add your Auth0 token here] ' \
--header 'Content-Type: application/json' \
--data-raw '{"firstname":"bambam","lastname":"rubble"}'`

To retrieve all messages:
>`curl --location --request GET 'http://localhost:8080/messages' \
--header 'Authorization: Bearer [add your Auth0 token here] '`

To retrieve a specific message:
>`curl --location --request GET 'http://localhost:8080/messages/1' \
--header 'Authorization: Bearer [add your Auth0 token here] '`

To update a message:
>`curl --location --request PUT 'http://localhost:8080/messages/2' \
--header 'Authorization: Bearer [add your Auth0 token here] '
--header 'Content-Type: application/json' \
--data-raw '{"firstname":"bambammy","lastname":"rubbley"}'`

To delete a message:
>`curl --location --request DELETE 'http://localhost:8080/messages/2' \
--header 'Authorization: Bearer [add your Auth0 token here] '`

## Terminating the application
Click on the red circle in the bottom left