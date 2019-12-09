import React from 'react'
import { Link } from 'react-router-dom'
import './Header.sass'

const Header = () => {
	return (
		<header className='header'>
			<img
				src='https://codetheweb.blog/assets/img/icon2.png'
				className='header_img'
				alt='logo'
			/>
			<ul>
				<li className='hover'>
					<Link to='/discover'>Discover</Link>
				</li>
				<li className='hover'>
					<Link to='/search'>Search</Link>
				</li>
			</ul>
		</header>
	)
}

export default Header
