import React from 'react'
import { Facebook, Github } from 'grommet-icons'
import './Footer.sass'

const Footer = () => {
	return (
		<footer className='footer'>
			<h1 className='footer_left'>GET AWESOME MOVIES NOW</h1>
			<section className='footer_right'>
				<Facebook size='large' color='plain' />{' '}
				<Github size='large' color='plain' />
			</section>
		</footer>
	)
}

export default Footer
