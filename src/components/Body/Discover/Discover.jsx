import React, { useEffect, useState } from 'react'
import './Discover.sass'
import Card from '../Card/Card'

const Discover = () => {
	const [discoverData, setDiscoverData] = useState([])
	useEffect(() => {
		const fetchDiscoverData = async () => {
			const response = await fetch('/api/discover')
			const data = await response.json()
			setDiscoverData(data.results)
		}
		fetchDiscoverData()
	}, [])
	return (
		<section className='discover'>
			{discoverData &&
				discoverData.map(d => (
					<Card
						popularity={d.popularity}
						poster_path={d.poster_path}
						title={d.title}
						released_date={d.released_date}
					/>
				))}
		</section>
	)
}

export default Discover
