import React, { createContext, useReducer, useContext } from 'react'

const StoreContext = createContext(null)

const initialState = {
	currentPage: 1,
	currentSearch: '',
	currentGenre: { id: 28, name: 'Action' },
	currentSortBy: { id: 'popularity.desc', name: 'Popularity Descending' },
	currentYear: '',
	sortByList: [
		{ id: 'popularity.desc', name: 'Popularity Descending' },
		{ id: 'popularity.asc', name: 'Popularity Ascending' },
		{ id: 'vote_average.desc', name: 'Rating Descending' },
		{ id: 'vote_average.asc', name: 'Rating Ascending' },
		{ id: 'release_date.desc', name: 'Released Date Descending' },
		{ id: 'release_date.asc', name: 'Release Date Ascending' },
		{ id: 'original_title.desc', name: 'Title (A-Z)' },
		{ id: 'original_title.asc', name: 'Title (Z-A)' }
	]
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'changePage':
			return {
				...state,
				currentPage: action.payload
			}
		case 'changeSearch':
			return {
				...state,
				currentSearch: action.payload
			}
		case 'changeGenre':
			return {
				...state,
				currentGenre: action.payload
			}
		case 'changeSortBy':
			return {
				...state,
				currentSortBy: action.payload
			}
		case 'changeYear':
			return {
				...state,
				currentYear: action.payload
			}
		default:
			return state
	}
}

export const StoreProvider = ({ children }) => (
	<StoreContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StoreContext.Provider>
)

export const useStoreValue = () => useContext(StoreContext)
