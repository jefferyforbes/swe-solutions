# Overview:

Uses node, mongo and express to create CRUD API with routes
to create, read, update and delete users.

/login route is secured via basic auth. If the user authenticates
then a session is created that will allow the user to
make requests to the other routes.

# Usage

- start the server using using `npm start` or `nodemon index` or
  `node index`
