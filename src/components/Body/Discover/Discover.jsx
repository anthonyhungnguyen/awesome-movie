import React, { useEffect, useState } from 'react'
import './Discover.sass'
import Card from '../Card/Card'
import Loader from 'react-loader-spinner'
import { useStoreValue } from '../../../reducers/Store'

const Discover = () => {
	const [discoverData, setDiscoverData] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [state, dispatch] = useStoreValue()
	useEffect(() => {
		const fetchDiscoverData = async () => {
			const response = await fetch('/api/discover')
			const data = await response.json()
			setDiscoverData(data.results)
			setIsLoading(false)
		}
		fetchDiscoverData()
	}, [])
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
		</section>
	)
}

export default Discover
