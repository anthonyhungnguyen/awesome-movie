import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Discover from './components/Body/Discover/Discover'
import Search from './components/Body/Search/Search'
import FilmInfo from './components/Body/FilmInfo/FilmInfo'
import { StoreProvider } from './reducers/Store'

const App = () => {
	return (
		<StoreProvider>
			<Router>
				<Header />
				<Switch>
					<Route exact path='/'>
						<Discover />
					</Route>
					<Route path='/search'>
						<Search />
					</Route>
					<Route path='/movie/:id' component={FilmInfo} />
				</Switch>
				<Footer />
			</Router>
		</StoreProvider>
	)
}

export default App
