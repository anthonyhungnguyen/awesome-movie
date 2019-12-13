import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import './FilmInfo.sass'

const FilmInfo = () => {
	const { id } = useParams()
	const [movieData, setMovieData] = useState({})

	useEffect(() => {
		axios
			.post('/api/movie', {
				id: id
			})
			.then(response => response.data)
			.then(data => {
				setMovieData(dataPreprocess(data))
			})
		return () => {
			document.body.style.backgroundImage = ''
		}
	}, [])

	const nestedDataToString = nestedData => {
		if (nestedData) {
			let nestedArray = Object.keys(nestedData).map(
				(key, index) => nestedData[key].name
			)
			let resultString = nestedArray.join(', ') // array to string
			return resultString
		}
	}

	const dataPreprocess = data => {
		let {
			poster_path,
			tagline,
			production_companies,
			production_countries,
			genres,
			revenue,
			backdrop_path,
			vote_average,
			release_date,
			original_title,
			overview,
			runtime
		} = data
		let genresList = nestedDataToString(genres)
		let productionCompaniesList = nestedDataToString(production_companies)
		let productionCountriesList = nestedDataToString(production_countries)
		return {
			poster_path,
			tagline,
			productionCompaniesList,
			productionCountriesList,
			genresList,
			revenue,
			backdrop_path,
			vote_average,
			release_date,
			original_title,
			overview,
			runtime
		}
	}

	const {
		poster_path,
		tagline,
		productionCompaniesList,
		productionCountriesList,
		genresList,
		revenue,
		backdrop_path,
		vote_average,
		release_date,
		original_title,
		overview,
		runtime
	} = movieData

	return (
		<section
			className='filminfo'
			style={{
				backgroundImage: `url("https://image.tmdb.org/t/p/original${backdrop_path}")`
			}}
		>
			<section className='filminfo_card'>
				{poster_path ? (
					<img
						src={`https://image.tmdb.org/t/p/w500${poster_path}`}
						className='filminfo_card_img'
						alt='poster'
					/>
				) : (
					<img
						src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g'
						className='filminfo_card_img'
						alt='poster'
					/>
				)}

				<section className='filminfo_card_info col'>
					<h1 className='filminfo_card_title'>{original_title}</h1>
					<h2 className='filminfo_card_tagline'>{tagline}</h2>
					<span className='filminfo_card_companies'>
						{productionCountriesList}
					</span>
					<p className='filminfo_card_overview'>{overview}</p>

					<span className='filminfo_card_genres'>{genresList}</span>
					<span className='filminfo_card_companies'>
						{productionCompaniesList}
					</span>

					<section className='filminfo_card_additionaldetails'>
						<div>
							Original Release:
							<span className='filminfo_card_metadata'>{release_date}</span>
						</div>
						<div>
							Running Time:
							<span className='filminfo_card_metadata'>{runtime} mins</span>
						</div>
						<div>
							Box Office:
							{revenue === 0 ? (
								'-'
							) : (
								<NumberFormat
									value={revenue}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
									className='filminfo_card_metadata'
								></NumberFormat>
							)}
						</div>
						<div>
							Vote Average:
							<span className='filminfo_card_metadata'>
								{vote_average} / 10
							</span>
						</div>
					</section>
				</section>
			</section>
		</section>
	)
}

export default FilmInfo
