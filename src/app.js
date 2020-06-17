const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(path.join(__dirname,"../public/index.html"))
const app = express()
const port = process.env.PORT || 3000

const publicpath = path.join(__dirname, '../public')
const templatesPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicpath))

app.set('view engine', 'hbs')
app.set('views', templatesPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    //  res.send("hello express");
    //  console.log(JSON.stringify(res))
    res.render('index', {
        name: 'zubair',
        title: 'title here'
    })
})

app.get('/about', (req, res) => {
    //    res.send('<title>about</about>')
    res.render('about', {
        title: 'aboutt'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "you must provide an address"
        })
    }
    console.log(req.query.address)
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error,forecastData) => {
            if (error) {
                res.send({
                    error: error
                })
            }
            res.send({
                forecast:forecastData,
                location,
                "address":req.query.address
            })
       })
    })


})

app.listen(port, () => {
    console.log(port)
})