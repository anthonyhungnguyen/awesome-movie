const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/discover', (req, res, next) => {
	fetch(
		`https://api.themoviedb.org/3/discover/movie?api_key=c36cd33a7148f4910d540a389e049b76&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
	)
		.then(res => res.json())
		.then(data => res.send(data))
})

router.post('/search', (req, res, next) => {
	const { movieName, year, genre, sortBy } = req.body
	if (movieName !== '') {
		fetch(`
	https://api.themoviedb.org/3/search/movie?api_key=c36cd33a7148f4910d540a389e049b76&language=en-US&sort_by=${sortBy}&query=${movieName}&page=1&include_adult=false&year=${year}&with_genres=${genre}`)
			.then(res => res.json())
			.then(data => res.send(data))
	} else {
		fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=c36cd33a7148f4910d540a389e049b76&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&year=${year}&with_genres=${genre}`
		)
			.then(res => res.json())
			.then(data => res.send(data))
	}
})

router.get('/genres', (req, res, next) => {
	fetch(
		'https://api.themoviedb.org/3/genre/movie/list?api_key=c36cd33a7148f4910d540a389e049b76&language=en-US'
	)
		.then(res => res.json())
		.then(data => res.send(data))
})

router.post('/movie', (req, res, next) => {
	const { id } = req.body
	fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=c36cd33a7148f4910d540a389e049b76`
	)
		.then(response => response.json())
		.then(data => res.send(data))
})

module.exports = router
