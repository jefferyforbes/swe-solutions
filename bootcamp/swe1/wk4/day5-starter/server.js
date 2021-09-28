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

// *** start - SET UP HANDLEBARS
const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')
// *** end - SET UP HANDLEBARS

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

    //res.json(restaurants)

    res.render('home', { restaurants })
})

app.get('/simple', async (req, res) => {
    res.render('simple', {
        name: "mandy"
    })

})


app.get('/person', async (req, res) => {
    res.render('person', {
        people:["callum", "halima", "lucas"]
    })
})

// app.get('/test', async (req, res) => {
//     res.render('test', {
//         name:"mandy"
//     })
// })



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

/*
app.get('/test', async (req, res) => {
    res.render('test', {
        name:"mandy"
    })
})*/