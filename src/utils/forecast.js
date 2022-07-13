const request = require('request');



const foreCast = (lat, long, callBack) => {
    const url = `http://api.weatherstack.com/current?access_key=9f84c96be58a9d428332788f8c004e86&query=${encodeURIComponent(long)},${encodeURIComponent(lat)}`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callBack('Unable to connect to weather services')
        }
        else if (response.body.error) {
            callBack('Unable to get weather, Try another search')
        }
        else {
            callBack(undefined, { forecast: `It is likely to be ${response.body.current.weather_descriptions[0]} in ${response.body.location.region}. And it is Currently ${response.body.current.temperature} degrees out there.`, location: response.body.location.region })
            // callBack(undefined, )
        }
    })
}


module.exports = foreCast;