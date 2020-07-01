const request = require('request');

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=524f4ee1ea5f830ceb7dc48f2c466b35&query=' + latitude + ',' + longtitude;

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            const {temperature, feelslike, humidity, weather_descriptions} = body.current;
            callback(undefined, "It is currently " + weather_descriptions[0] + " outside. The Temperature is" + temperature + " degrees and it feels like " + feelslike + ". There are " + humidity + "% of humidity.");
        }
        
    })
}

module.exports = forecast;