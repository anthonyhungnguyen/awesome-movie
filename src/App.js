import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Discover from './components/Body/Discover/Discover'
import Search from './components/Body/Search/Search'

const App = () => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path='/'>
					<Discover />
				</Route>
				<Route path='/search'>
					<Search />
				</Route>
			</Switch>
			<Footer />
		</Router>
	)
}

export default App
