# Overview
This sample demonstrates how to secure an API using Basic Auth.

In this sample, the login credentials are stored in a database (username=admin password=secret)

Please note that the code is not production ready, it exists to demonstrate concepts.

## Building this application into IntelliJ
> File->New->Project/Module from existing source

## Running this application
Under the `Maven` menu on the right hand side, select the project and then select:
> Plugins -> spring-boot -> sprint-boot:run
The application should start on port 8080.

## Calling the API

To create a message:
> `curl --location --request POST 'http://localhost:8080/messages' \
--header 'Authorization: Basic YWRtaW46c2VjcmV0' \
--header 'Content-Type: application/json' \
--data-raw '{"message":"I am a new message"}'`

To retrieve all messages:
>`curl --location --request GET 'http://localhost:8080/messages' \
--header 'Authorization: Basic YWRtaW46c2VjcmV0'`

To retrieve a specific message:
>`curl --location --request GET 'http://localhost:8080/messages/1' \
--header 'Authorization: Basic YWRtaW46c2VjcmV0'`

To update a message:
>`curl --location --request PUT 'http://localhost:8080/messages/2' \
--header 'Authorization: Basic YWRtaW46c2VjcmV0' \
--header 'Content-Type: application/json' \
--data-raw '{"message":"updated message"}'`

To delete a message:
>`curl --location --request DELETE 'http://localhost:8080/messages/2' \
--header 'Authorization: Basic YWRtaW46c2VjcmV0'`



## Terminating the application
Click on the red circle in the bottom left