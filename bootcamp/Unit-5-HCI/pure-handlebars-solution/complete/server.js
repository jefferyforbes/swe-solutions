const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const { Restaurant } = require('./Restaurant')
const { Menu } = require('./Menu')
const { MenuItem } = require('./MenuItem')
const { loadAndInsert } = require('./populateDB')
const { check, validationResult } = require('express-validator');

const app = express();
const port = 3000;

// setup our templating engine
const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

// serve static assets from the public/ folder
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// this route matches any GET request to the http://localhost:3000
app.get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll({

        include: [
            {
                model: Menu, as: 'menus',
                include: [{model:MenuItem, as: 'items'}]
            }
        ],
        nest: true
    })
    res.render('home', { restaurants })
})

app.get('/new', async (req, res) => {
    res.render('new')
})

app.get('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menus = await restaurant.getMenus({
        include: [{model: MenuItem, as: 'items'}],
        nest: true
    })
    res.render('restaurant', {restaurant, menus})
})

// delete a restaurant
app.delete('/restaurants/:id', async (req, res) => {
    await Restaurant.findByPk(req.params.id)
        .then(restaurant => {
            restaurant.destroy()
            res.redirect('/')
        })
})

app.post('/restaurants', [
    check('name').isLength({ min: 2 }),
    ], async (req, res) => {    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const restaurant = await Restaurant.create(req.body)
    res.redirect('/');
})

app.post('/restaurants', async (req, res) => {
    console.log(req.body);
    const name = req.body.restName;
    const restaurant = await Restaurant.create(body)
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})