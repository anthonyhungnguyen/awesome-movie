const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/discover', (req, res, next) => {
	fetch(
		'https://api.themoviedb.org/3/discover/movie?api_key=c36cd33a7148f4910d540a389e049b76&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
	)
		.then(res => res.json())
		.then(data => res.send(data))
})
module.exports = router
