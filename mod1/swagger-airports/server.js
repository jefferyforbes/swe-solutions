const express = require("express");
const app = express();
const airports = require("./airports.json");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.listen(3000, () =>
  console.log("Airport API ready. Documents at http://localhost:3000/api-docs")
);

/**
 * @swagger
 * tags:
 *   name: Airports
 *   description: Airport management
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
  res.send(airports);
});

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Airports API",
      version: "1.0.0",
      description: "A test project to generate API docs",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/",
      },
      contact: {
        name: "Swagger",
        url: "https://swagger.io",
        email: "Info@SmartBear.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api-docs",
      },
    ],
  },
  apis: ["./server.js", "./Airport.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(specs, { explorer: true }));
