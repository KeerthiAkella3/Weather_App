const express = require('express');
var app = express();
app.set('view engine', 'ejs');
const fetch = require("node-fetch");
router = express.Router();
const logger = require('../Config/logger')
const api_key = 'add your API_KEY here';


/**
 * /getWeatherDetails gets the weather information using the DarkSky API.
 * The DarkSky API takes latitude and logitude as input. 
 * The input data for /getWeatherDetails must contain coordinates and location name. 
 * Output response contains weather details alerts, current weather conditions, daily weather conditions, 
 * hourly weather conditions and minutely weather conditions with status code 200
 */
router.get('/getWeatherDetails', async function (req, res) {
    /**
    * Using 'Winston' library and logging the requests in requests.log file
    */
    logger.info(` request from frontend to /getWeatherDetails: ${JSON.stringify(req.query)}`);
    console.log("Inside getWeatherDetails get request");
    console.log("Sending Request Body:");
    console.log(req.query);

    result = [];
    for (var i = 0; i < 4; i++) {
        console.log("for loop")
        console.log(req.query[i])
        let input = JSON.parse(req.query[i]);
        console.log(input)

        let place = input.place;
        let lat = input.latitude;
        let long = input.longitude;

        try {
            console.log("from input");
            console.log(lat)
            const api_url = `https://api.darksky.net/forecast/${api_key}/${lat}, ${long}`;
            const response = await fetch(api_url);
            const json_response = await response.json();
            console.log("response from api");
            console.log(json_response);
            result.push({ "place": place, "result": json_response });

        } catch (err) {
            console.log(err)
        }
    }
    console.log(result);
    res.status(200).json(result);

})

module.exports = router;