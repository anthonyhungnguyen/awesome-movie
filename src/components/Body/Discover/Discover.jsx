import React, { useEffect, useState } from 'react'
import './Discover.sass'
import Card from '../Card/Card'
import Loader from 'react-loader-spinner'
import ReactPaginate from 'react-paginate'
import { useStoreValue } from '../../../reducers/Store'
import axios from 'axios'

const Discover = () => {
	const [discoverData, setDiscoverData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [state, dispatch] = useStoreValue()
	useEffect(() => {
		const fetchDiscoverData = async () => {
			await axios
				.post('/api/discover', {
					page: state.currentDiscoverPage
				})
				.then(response => response.data)
				.then(data => {
					setDiscoverData(data.results)
					setIsLoading(false)
				})
		}
		fetchDiscoverData()
	}, [state])

	const handleOnPageChange = e => {
		dispatch({
			type: 'changeDiscoverPage',
			payload: e.selected + 1
		})
	}

	return isLoading ? (
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
		<section className='discover'>
			{discoverData &&
				discoverData.map(d => (
					<Card
						id={d.id}
						poster_path={d.poster_path}
						title={d.title}
						key={d.id}
					/>
				))}
			<ReactPaginate
				previousLabel={'<'}
				nextLabel={'>'}
				breakLabel={'..'}
				breakClassName={'break-me'}
				initialPage={state.currentPage}
				pageCount={20}
				marginPagesDisplayed={1}
				pageRangeDisplayed={2}
				onPageChange={handleOnPageChange}
				containerClassName={'pagination'}
				subContainerClassName={'pages pagination'}
				activeClassName={'active'}
			/>
		</section>
	)
}

export default Discover
