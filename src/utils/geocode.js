const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW1pdGZyZSIsImEiOiJja2JwMnVsYzcyOHdjMnRxdmliYmxhaXlrIn0.ibi-Hg0ykpWeElbNvA9qCA&limit=1';

    request({url, json: true}, (error, {body} = {}) => {    
        if (error) {
            callback("Unable to connect to GeoCoding service", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location, try another search", undefined);
        } else {
            const {center, place_name} = body.features[0];
            callback(undefined, {
                longtitude: center[0],
                latitude: center[1],
                location: place_name
            });
        }
    })
}


module.exports = geocode;