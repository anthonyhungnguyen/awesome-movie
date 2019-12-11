import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Search.sass'
import Card from '../Card/Card'
import { Form, TextInput, Select } from 'grommet'
import Loader from 'react-loader-spinner'

const Search = () => {
	const [movieName, setMovieName] = useState('')
	const [searchResultList, setSearchResultList] = useState([])
	const [year, setYear] = useState('')
	const [sortByList] = useState([
		{ id: 'popularity.desc', name: 'Popularity Descending' },
		{ id: 'popularity.asc', name: 'Popularity Ascending' },
		{ id: 'vote_average.desc', name: 'Rating Descending' },
		{ id: 'vote_average.asc', name: 'Rating Ascending' },
		{ id: 'release_date.desc', name: 'Released Date Descending' },
		{ id: 'release_date.asc', name: 'Release Date Ascending' },
		{ id: 'original_title.desc', name: 'Title (A-Z)' },
		{ id: 'original_title.asc', name: 'Title (Z-A)' }
	])
	const [sortBy, setSortBy] = useState({
		id: 'popularity.desc',
		name: 'Popularity Descending'
	})
	const [genres, setGenres] = useState([])
	const [genre, setGenre] = useState({ id: 28, name: 'Action' })
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		const fetchMovies = async () => {
			await axios
				.post('/api/search', {
					movieName: movieName,
					year: year,
					genre: genre.id,
					sortBy: sortBy.id
				})
				.then(response => response.data)
				.then(data => {
					setSearchResultList(data.results)
					setIsLoading(false)
				})
		}
		const getGenres = async () => {
			await axios
				.get('/api/genres')
				.then(response => response.data)
				.then(data => setGenres(data.genres))
		}
		getGenres()
		fetchMovies()
	}, [year, genre, sortBy, movieName])

	const handleOnSubmit = async e => {
		e.preventDefault()
		const response = await axios.post('/api/search', {
			movieName: movieName,
			year: year,
			genre: genre.id,
			sortBy: sortBy.id
		})
		const data = await response.data
		setSearchResultList(data.results)
	}

	const generateYear = () => {
		let yearList = []
		for (let i = 1900; i <= 2019; i += 1) {
			yearList.push(i)
		}
		return yearList.reverse()
	}

	const handleOnChange = e => {
		switch (e.target.name) {
			case 'yearSelect':
				setYear(e.option)
				break
			case 'sortBySelect':
				let sortId = sortByList.filter(d => d.name === e.option)[0].id
				setSortBy({ id: sortId, name: e.option })
				break
			case 'genreSelect':
				let genreId = genres.filter(d => d.name === e.option)[0].id
				setGenre({ id: genreId, name: e.option })
				break
			default:
				return
		}
	}

	return (
		<section className='search'>
			<section className='search_input'>
				<Select
					name='yearSelect'
					options={['', ...generateYear()]}
					value={year}
					onChange={handleOnChange}
					placeholder='Pick year'
				/>
				<Select
					name='sortBySelect'
					options={Object.keys(sortByList).map(
						(key, index) => sortByList[key]['name']
					)}
					value={sortBy.name}
					onChange={handleOnChange}
					placeholder='Sort by'
				/>
				{genres && (
					<Select
						name='genreSelect'
						options={Object.keys(genres).map(
							(key, index) => genres[key]['name']
						)}
						value={genre.name}
						onChange={handleOnChange}
						placeholder='Genres'
					/>
				)}
				<Form onSubmit={handleOnSubmit} className='search_form'>
					<TextInput
						name='searchChange'
						placeholder='search movie here...'
						onChange={e => setMovieName(e.target.value)}
						value={movieName}
					/>
				</Form>
			</section>
			{isLoading ? (
				<Loader
					type='Puff'
					color='#00BFFF'
					height={50}
					width={50}
					style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				/>
			) : (
				<section className='search_result'>
					{searchResultList &&
						searchResultList.map(d => (
							<Card
								id={d.id}
								title={d.title}
								poster_path={d.poster_path}
								key={d.title}
							/>
						))}
				</section>
			)}
		</section>
	)
}

export default Search
