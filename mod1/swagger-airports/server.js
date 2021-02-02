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
 *     summary: returns an array of airports
 *     tags: [Airports]
 *     responses:
 *       200:
 *         description: returns an array of airports
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Airport'
 */
app.get("/airports", (req, res) => {
  if (req.query.page && req.query.pageSize) {
    // get page number and size
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    // get the start page
    const startPage = page * pageSize + 1;

    // get the end page
    const endPage = startPage + pageSize;

    // setup array for the filtered airports
    let filteredAirports = [];

    // loop through the start/end bounds and add to array
    for (let i = startPage; i < endPage; i++) {
      filteredAirports.push(airports[i]);
    }

    // send it! :D
    res.send(filteredAirports);
  } else {
    res.send(airports);
  }
});

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Home route
 *
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: the homepage
 *     tags: [Home]
 *
 */
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
