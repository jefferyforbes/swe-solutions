const express = require("express");
const app = express();

// our airports json
const airports = require("./airports.json");

// swagger components
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// swagger config
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
 *    description: The airports route
 *
 */
app.get("/airports", (req, res) => {
  res.send(airports);
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions), { explorer: true })
);

module.exports = app;
