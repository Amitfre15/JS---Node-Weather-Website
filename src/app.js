const path = require("path");
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials')

// Define handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewDirectory);
hbs.registerPartials(partialsDirectory);

// Define static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App", 
        name: "Amit Frechter"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me", 
        name: "Amit Frechter"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page", 
        message: "Here for the rescue!",
        name: "Amit Frechter"
    });
})

app.get('/weather', (req, res) => {
    const adress = req.query.search;
    if (!adress) {
        return res.send({
            error: "You must provide an adress"
        })
    }
    geocode(adress, (error, { location, latitude, longtitude } = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error){
                res.send({error});
            }
            else {
                res.send({
                    adress,
                    location,
                    forecastData
                });
            }
        }) 
    }) 
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404", 
        errorMessage: "Help article not found",
        name: "Amit Frechter"
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404", 
        errorMessage: "Page not found",
        name: "Amit Frechter"
    });
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
});