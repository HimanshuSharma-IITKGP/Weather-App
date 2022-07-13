const request = require('request');

const geoCode = (address, callBack) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGltYW5zaHVzaGFybWEtaWl0a2dwIiwiYSI6ImNsNWhwb2hjYTAwazgzY3BnajZuN3ozdzcifQ.fJ90cXHExJtlW4Haw2oCwg&limit=1`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callBack('Unable to connect to location services')
        }
        else if (response.body.features.length === 0) {
            callBack('Unable to find location, Try another search')
        } else {
            callBack(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name,
            })
        }
    })
}

module.exports = geoCode;