import React, { createContext, useReducer, useContext } from 'react'

const initialState = {
	categories: [],
	products: [],
	filteredProducts: [],
	sort: '',
	selectedCategory: '',
	searchValue: '',
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_CATEGORIES':
			return { ...state, categories: action.payload }
		case 'SET_PRODUCTS':
			return { ...state, products: action.payload }
		case 'SET_FILTERED_PRODUCTS':
			return { ...state, filteredProducts: action.payload }
		case 'SET_SORT':
			return { ...state, sort: action.payload }
		case 'SET_SELECTED_CATEGORY':
			return { ...state, selectedCategory: action.payload }
		case 'SET_SEARCH_VALUE':
			return { ...state, searchValue: action.payload }
		case 'DELETE_PRODUCT':
			return {
				...state,
				products: state.products.filter(p => p.id !== action.payload),
			}
		case 'EDIT_PRODUCT':
			return {
				...state,
				products: state.products.map(p =>
					p.id === action.payload.id ? { ...action.payload } : p,
				),
			}
		default:
			return state
	}
}

const AppContext = createContext()

export const useAppContext = () => {
	return useContext(AppContext)
}

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	)
}
