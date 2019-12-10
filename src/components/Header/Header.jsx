import React from 'react'
import { Link } from 'react-router-dom'
import './Header.sass'

const Header = () => {
	return (
		<header className='header'>
			<img
				src={`https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-9/46368215_955712594612467_7863885445946408960_n.jpg?_nc_cat=105&_nc_ohc=SmnqPxiOXhYAQnIdM3rcjDDVA5gwTuxiWTCcCRfnun5J-5mCOvJQ7anoQ&_nc_ht=scontent.fsgn4-1.fna&oh=3677f8527e9fa5c6c81b51db9aaddfa0&oe=5E81A4FC`}
				className='header_img hover-shadow'
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
