const express = require("express");
const cors = require('cors'); // may not be required
const { join } = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

app.use(cors());

app.use(morgan("dev"));
app.use(helmet());
app.use(express.static(join(__dirname, "public")));

app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

process.on("SIGINT", function() {
  process.exit();
});

module.exports = app;
