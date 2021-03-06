const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

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

// this route matches any GET request to the [rootURL]
app.get('/', (request, response) => {
    response.render('restaurants', {date: new Date()})
})

// this route matches any GET request to the [rootURL]/about
app.get('/about', (request, response) => {
    response.render('about', {date: new Date(), author:'multiverse'})
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})