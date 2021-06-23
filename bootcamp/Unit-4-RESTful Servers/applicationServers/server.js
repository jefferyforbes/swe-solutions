const express = require("express");
const Restaurant = require('./models/restaurant');
const app = express();
const port = 3000;

app.get("/flipcoin", (req, res) => {
    res.send(["Heads", "Tails"][Math.floor(Math.random() * 2)]);
});

app.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});