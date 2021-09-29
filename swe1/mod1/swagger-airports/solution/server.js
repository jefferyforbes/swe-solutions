const express = require("express");
const app = express();
const airports = require("./airports.json");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./openapi");

// parse req body
app.use(express.json());

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
    // set-up vars
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    let startPage = 0;
    let filteredAirports = [];

    // get the start page
    if (page > 1) startPage = page * pageSize + 1;

    // get the end page
    const endPage = startPage + pageSize;

    // loop through the start/end bounds and add to array
    for (let i = startPage; i < endPage; i++) {
      filteredAirports.push(airports[i]);
    }

    // send it! :D
    return res.status(200).send(filteredAirports);
  }

  // otherwise, send all airports
  res.status(200).send(airports);
});

/**
 * @swagger
 * /airports/:id:
 *   get:
 *     summary: returns a single airport resource
 *     tags: [Airports]
 *     responses:
 *       200:
 *         description: returns a single airport resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Airport'
 *       404:
 *         description: user not found
 *
 */
app.get("/airports/:id", (req, res) => {
  console.log(req.params.id);
});

/**
 * @swagger
 * /airports:
 *   post:
 *     summary: posts an airport and adds it to json array
 *     tags: [Airports]
 *     requestBody:
 *       description: request body for post new airport
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Airport'
 *     responses:
 *       201:
 *         description: tells the user the resource was created
 *
 */
app.post("/airports", (req, res) => {
  try {
    airports.push(req.body);
  } catch (e) {
    return console.log(e.message);
  }

  console.log(req.body);
  res.status(201).send("Created!");
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions), { explorer: true })
);

module.exports = app;
