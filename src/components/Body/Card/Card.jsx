import React from 'react'
import './Card.sass'
import { Link } from 'react-router-dom'
import { Button } from 'grommet'

const Card = ({ id, poster_path, title }) => {
	return (
		<section className='card hover'>
			{poster_path ? (
				<img
					className='card_img'
					src={`https://image.tmdb.org/t/p/w500${poster_path}`}
					alt='poster'
				/>
			) : (
				<img
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g'
					className='card_img'
					alt='poster'
				/>
			)}

			<section className='card_body'>
				<h1>{title}</h1>
				<Link to={`/movie/${id}`}>
					<Button label='Read more' />
				</Link>
			</section>
		</section>
	)
}

export default Card
