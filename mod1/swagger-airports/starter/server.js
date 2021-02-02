const express = require("express");
const app = express();
const airports = require("./airports.json");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./openapi");

/**
 * @swagger
 * tags:
 *   name: Airports
 *   description: Airport management
 *
 */

/**
 * @swagger
 * /airports:
 *   get:
 *
 */
app.get("/airports", (req, res) => {
  res.send(airports);
});

app.get("/", (req, res) => {
  res.send(
    "<p>Welcome to the homepage. <a href='/airports'>Click here</a> to see the airports."
  );
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions), { explorer: true })
);

module.exports = app;
