const express = require("express");
const app = express();
const airports = require("./airports.json");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger-config");

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
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    const startPage = page * pageSize + 1;
    const endPage = startPage + pageSize;
    let filteredAirports = [];

    for (let i = startPage; i < endPage; i++) {
      filteredAirports.push(airports[i]);
    }

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
 *     summary: the 'homepage'
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: returns a simple link to the airports
 *         content:
 *           text/html
 *
 */
app.get("/", (req, res) => {
  res.send(
    "<p>Welcome to the homepage. <a href='/airports'>Click here</a> to see the airports."
  );
});

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(specs, { explorer: true }));

module.exports = app;
