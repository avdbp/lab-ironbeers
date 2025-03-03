const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
app.use(express.static("public"));

const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => {
      console.log(error);
      res.render('error');
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beerFromApi => {
      res.render('random-beer', { beer: beerFromApi[0] });
    })
    .catch(error => {
      console.log(error);
      res.render('error');
    });
});


app.listen(4000, () => console.log('🏃‍ on port 4000'));
