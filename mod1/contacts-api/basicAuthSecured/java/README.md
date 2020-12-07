# Overview
This sample demonstrates how to secure an API using Basic Auth.
Please note that the code is not production ready, it exists to demonstrate concepts.

## Building this application into IntelliJ
> File->New->Project/Module from existing source

## Running this application
Under the `Maven` menu on the right hand side, select the project and then select:
> Plugins -> spring-boot -> sprint-boot:run
The application should start on port 8080.

## Calling the API
Using Postman / cURL send a GET request to
`http://localhost:8080/contacts/me`
with a Basic Auth header with `Username`and `Password` set to the values in the `SecurityConfiguration` class.

## Terminating the application
Click on the red circle in the bottom left