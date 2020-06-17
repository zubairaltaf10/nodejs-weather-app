const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoienViZWUiLCJhIjoiY2tiZ2FzYjZuMHdqdDJzbnVqNHVva3BuMyJ9.yNfjzeUQnoout3puzQm7Bw'

    request({ url, json: true }, (error, { body }) => {
                if (error) {
            console.log("error")
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length == 0) {
            console.log("else if")
            callback('Unable to find location. Try another search.', undefined)
        } else {
            console.log(body.features[0].center[1])
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode