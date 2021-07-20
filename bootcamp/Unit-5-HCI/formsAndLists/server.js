const express = require("express");
const { check, validationResult } = require("express-validator");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const Restaurant = require("./models/restaurant");
const Menu = require("./models/menu");
const MenuItem = require("./models/menuItem");

const initialiseDb = require("./initialiseDb");
initialiseDb();

const app = express();
const port = 3000;

const handlebars = expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(express.json());

app.get("/web/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.render("restaurants", { restaurants });
});

app.get("/web/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  res.render("restaurant", { restaurant });
});

const restaurantChecks = [
  check("name").not().isEmpty().trim().escape(),
  check("image").isURL(),
  check("name").isLength({ max: 50 }),
];

app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id, {
    include: {
      model: Menu,
      include: MenuItem,
    },
  });
  res.json(restaurant);
});

app.post("/restaurants", restaurantChecks, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await Restaurant.create(req.body);
  res.sendStatus(201);
});

app.post("/restaurants/:resId/menus", async (req, res) => {
  await Menu.create({
    title: req.body.title,
    RestaurantId: req.params.resId,
  });
  res.sendStatus(201);
});

app.post("/restaurants/:resId/menus/:menuId/items", async (req, res) => {
  await MenuItem.create({
    name: req.body.name,
    price: req.body.price,
    MenuId: req.params.menuId,
  });
  res.sendStatus(201);
});

app.delete("/restaurants/:id", async (req, res) => {
  await Restaurant.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.sendStatus(200);
});

app.put("/restaurants/:id", restaurantChecks, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const restaurant = await Restaurant.findByPk(req.params.id);
  await restaurant.update(req.body);
  res.sendStatus(200);
});

app.patch("/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  await restaurant.update(req.body);
  res.sendStatus(200);
});

app.delete("/items/:id", async (req, res) => {
  // should really be RESTful
  await MenuItem.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
