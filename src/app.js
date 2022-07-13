const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000;

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Himanshu Sharma'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Himanshu Sharma'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'This is some helpful text.',
		title: 'Help',
		name: 'Himanshu Sharma'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'an error ocurred'
		})
	}

	geocode(req.query.address, (error, geoData) => {
		if (error) {
			return res.send({
				error: 'unable to get address'
			})
		}

		forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error: 'unable to get weather'
				})
			}

			return res.send({
				...forecastData,
				address: req.query.address
			})
		})
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Himanshu Sharma',
		errorMessage: 'Help article not found.'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Himanshu Sharma',
		errorMessage: 'Page not found.'
	})
})

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`)
})