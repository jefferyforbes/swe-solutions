# README

## Pre-requisites
1. Install node.js from https://nodejs.org/en/ (may need to specify version). This includes the Node Package Manager (npm) which enables access to software pacakges.
2. Run `node -v` and `npm -v` to ensure Node and npm are installed successfully
3. Install VS Code and ensure `Auto Save` is enabled

## What is node?
* Node.js is an open-source, cross-platform, back-end, JavaScript runtime environment that executes JavaScript code outside a web browser.
* Node.js provides capabilities to create your own web server which will handle HTTP requests asynchronously.

### Questions:
* Can you think of any other web servers you have used? 

## Initialising your app
* Create a folder where you will store your REST API code
* Open this folder in VS Code
* Open up a Terminal in VS Code and run `npm init`. This will prompt you for details of your app in order to create a `package.json` file. All npm packages contain a file, usually in the project root, called package.json - this file holds various metadata relevant to the project.
* We then need to add [Express](https://expressjs.com/) as a dependency. Express is a Node framework which provides support for implementing RESTful APIs. To do this, run `npm install express --save`. You'll notice your `package.json` file has been modified to include this dependency and the Express modules have been added to the directory `/node_modules`.
* Install SQLite, a small yet full-featured SQL database engine using `npm install sqlite3`
* You can now run `node app.js`

Q. Is there a way to run the npm through a script to avoid checking in node content?




