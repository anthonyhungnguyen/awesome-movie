import React from 'react'
import { Facebook, Github } from 'grommet-icons'
import './Footer.sass'

const Footer = () => {
	return (
		<footer className='footer'>
			<span>@copyright Hưng</span>
			<a href='https://fb.com/phuchung276'>
				<Facebook color='plain' />
			</a>
			<a href='https://github.com/anthonyhungnguyen'>
				<Github color='white' />
			</a>
		</footer>
	)
}

export default Footer
