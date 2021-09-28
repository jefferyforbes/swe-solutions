# README
This code demonstrates how to use Basic Auth to secure a RESTful service which support the creation, editing and deletion of messages. It uses the Node.js web server, the Express web framework (including Express basicauth support) and SQLite database.

## Pre-requisites
1. Install node.js from https://nodejs.org/en/ (may need to specify version). This includes the Node Package Manager (npm) which enables access to software pacakges.
2. Run `node -v` and `npm -v` to ensure Node and npm are installed successfully
3. Install VS Code and ensure `Auto Save` is enabled

## What is node?
* Node.js is an open-source, cross-platform, back-end, JavaScript runtime environment that executes JavaScript code outside a web browser.
* Node.js provides capabilities to create your own web server which will handle HTTP requests asynchronously.
* Each Node project has a `package.json` file which holds meta data about the project, for example, the dependencies it has on other projects, the author of the code etc. This file can be create via the command `npm init`.

## What is Express?
* [Express](https://expressjs.com/) is a Node framework which provides support for implementing RESTful APIs.

## Running this app
To run the code, execute: `npm install` to install all the project dependencies, then run `node app.js` or `npm run dev` if you want to run in developer mode.

To create a message:
> `curl --location --request POST 'http://localhost:3000/messages' \
--header 'Authorization: Basic YWRtaW46c2VjcmV0' \
--header 'Content-Type: application/json' \
--data-raw '{"message":"I am a new message"}'`

To retrieve all messages:
>`curl --location --request GET 'http://localhost:3000/messages' \
--header 'Authorization: Basic YWRtaW46c2VjcmV0'`

To retrieve a specific message:
>`curl --location --request GET 'http://localhost:3000/messages/1' \
--header 'Authorization: Basic YWRtaW46c2VjcmV0'`

To update a message:
>`curl --location --request PUT 'http://localhost:3000/messages/2' \
--header 'Authorization: Basic YWRtaW46c2VjcmV0' \
--header 'Content-Type: application/json' \
--data-raw '{"message":"updated message"}'`

To delete a message:
>`curl --location --request DELETE 'http://localhost:3000/messages/2' \
--header 'Authorization: Basic YWRtaW46c2VjcmV0'`




