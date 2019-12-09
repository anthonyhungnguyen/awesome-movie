import React from 'react'
import './Card.css'

const Card = ({ popularity, poster_path, title, released_date }) => {
	return (
		<section className='paper'>
			<img
				className='paper_img'
				src={`https://image.tmdb.org/t/p/w500${poster_path}`}
				alt='poster'
			/>
			<h2 className='paper_h2'>{popularity}</h2>
			<h1 className='paper_h1'>{title}</h1>
			<hr />
			<p className='paper_p'>{released_date}</p>
			<a className='paper_a btn'>Read More </a>
			<div className='paper_space'></div>
		</section>
	)
}

export default Card
