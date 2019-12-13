import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Search.sass'
import Card from '../Card/Card'
import { Form, TextInput, Select } from 'grommet'
import Loader from 'react-loader-spinner'
import { useStoreValue } from '../../../reducers/Store'
import ReactPaginate from 'react-paginate'

const Search = () => {
	const [state, dispatch] = useStoreValue()
	const [movieName, setMovieName] = useState(state.currentSearch)
	const [searchResultList, setSearchResultList] = useState([])
	const [year] = useState(state.currentYear)
	const [sortByList] = useState(state.sortByList)
	const [sortBy] = useState(state.currentSortBy)
	const [genres, setGenres] = useState([])
	const [genre] = useState(state.currentGenre)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchMovies = async () => {
			await axios
				.post('/api/search', {
					movieName: movieName,
					year: year,
					genre: genre.id,
					sortBy: sortBy.id,
					page: state.currentSearchPage
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
	}, [state])

	const handleOnSubmit = async e => {
		const { currentSearch, currentGenre, currentSortBy, currentYear } = state
		e.preventDefault()
		const response = await axios.post('/api/search', {
			movieName: currentSearch,
			year: currentYear,
			genre: currentGenre.id,
			sortBy: currentSortBy.id
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
				dispatch({
					type: 'changeYear',
					payload: e.option
				})
				break
			case 'sortBySelect':
				let sortId = sortByList.filter(d => d.name === e.option)[0].id
				dispatch({
					type: 'changeSortBy',
					payload: {
						id: sortId,
						name: e.option
					}
				})
				break
			case 'genreSelect':
				let genreId = genres.filter(d => d.name === e.option)[0].id
				dispatch({
					type: 'changeGenre',
					payload: {
						id: genreId,
						name: e.option
					}
				})
				break
			default:
				return
		}
	}

	const handleOnPageChange = e => {
		dispatch({
			type: 'changeSearchPage',
			payload: e.selected + 1
		})
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
						onChange={e => {
							dispatch({
								type: 'changeSearch',
								payload: e.target.value
							})
							setMovieName(e.target.value)
						}}
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
								key={d.id}
							/>
						))}
					<ReactPaginate
						previousLabel={'previous'}
						nextLabel={'next'}
						breakLabel={'...'}
						breakClassName={'break-me'}
						initialPage={state.currentPage}
						pageCount={20}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						onPageChange={handleOnPageChange}
						containerClassName={'pagination'}
						subContainerClassName={'pages pagination'}
						activeClassName={'active'}
					/>
				</section>
			)}
		</section>
	)
}

export default Search
