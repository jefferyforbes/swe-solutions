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
To create a user:
> `curl --location --request POST 'http://localhost:8080/users' \
--header 'Authorization: Basic YWRtaW46bmltZGE=' \
--header 'Content-Type: application/json' \
--header 'Cookie: JSESSIONID=FE289FF2325B69377F024B8171C73706' \
--data-raw '{"username":"bb1","password":"26dc6b95e3849f63422de6b4c8bd55b6", "firstname":"bambam","lastname":"rubble"}'`

To retrieve all users:
>`curl --location --request GET 'http://localhost:8080/users' \
--header 'Authorization: Basic YWRtaW46bmltZGE='`

To retrieve a specific user:
>`curl --location --request GET 'http://localhost:8080/users/1' \
--header 'Authorization: Basic YWRtaW46bmltZGE='`

To update a user:
>`curl --location --request PUT 'http://localhost:8080/users/2' \
--header 'Authorization: Basic YWRtaW46bmltZGE=' \
--header 'Content-Type: application/json' \
--header 'Cookie: JSESSIONID=235BFEE49344106CE593DAC5571622B7' \
--data-raw '{"firstname":"bambammy","lastname":"rubbley"}'`

To delete a user:
>`curl --location --request DELETE 'http://localhost:8080/users/2' \
--header 'Authorization: Basic YWRtaW46bmltZGE=' \
--header 'Cookie: JSESSIONID=932B4F511124816BF47C4139D8D05346'`


## Terminating the application
Click on the red circle in the bottom left