const express = require('express');
const request = require('request');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { weatherData: null, error: null });
});

app.get('/weather', (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.render('index', { weatherData: null, error: 'Please enter a city name' });
    }

    // Fetch full weather data in JSON format
    const url = `https://wttr.in/${city}?format=j1`;

    request(url, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            return res.render('index', { weatherData: null, error: 'Error, please try again' });
        }

        // Parse the JSON data
        const weatherData = JSON.parse(body);
        res.render('index', { weatherData, error: null });
    });
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});