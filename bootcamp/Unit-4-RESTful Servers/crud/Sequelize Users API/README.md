# Intro/about

An additional Sequelize CRUD API example that has Users, Posts and Comments. Useful to compare
and contrast with the class based models that the Restaurants example uses. Also features
a bit of Sequelize validation.

This version uses Promises rather than async/await, but can easily be changed on the fly to
show async/await to the apprentices.

# Usage

- Run NPM install
- Run `node server`. This should create and connect to the DB
- Open up Postman/other API testing tool and create Users, Posts, etc

# Notes

- When adding posts and comments, a UserId or PostId needs to be sent
- [DB Browser](https://sqlitebrowser.org/dl/) is a great tool to see the foreign keys Sequelize adds for you
- The users.json file can be used to 'bulk create' users in the DB. See server.js code and instructions

# Future development

At the moment all the code exists in one file, which doesn't make it as readable/modular as it could be. Suggest
we break the code out into modular files in the fullness of time. For now, it'll do :)
