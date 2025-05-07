import { useEffect } from 'react'
import { useAppContext } from './Store'
import Category from './components/Category'
import Filter from './components/Filter'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Products from './components/Products'

function App() {
	const { state, dispatch } = useAppContext()
	const {
		categories,
		products,
		filteredProducts,
		sort,
		selectedCategory,
		searchValue,
	} = state

	useEffect(() => {
		let result = products
		result = filterSearchTitle(result)
		result = filterSelectedCategory(result)
		result = sortDate(result)
		dispatch({ type: 'SET_FILTERED_PRODUCTS', payload: result })
	}, [products, sort, searchValue, selectedCategory])

	const searchHandler = e => {
		dispatch({
			type: 'SET_SEARCH_VALUE',
			payload: e.target.value.trim().toLowerCase(),
		})
	}

	const sortHandler = e => {
		dispatch({ type: 'SET_SORT', payload: e.target.value })
	}

	const selectCategoryHandler = e => {
		dispatch({
			type: 'SET_SELECTED_CATEGORY',
			payload: e.target.value,
		})
	}

	const filterSearchTitle = array => {
		return array.filter(p =>
			p.title.toLowerCase().includes(searchValue),
		)
	}

	const sortDate = array => {
		let sortedProducts = [...array]
		return sortedProducts.sort((a, b) => {
			if (sort === 'latest') {
				return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
			} else if (sort === 'earliest') {
				return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
			}
		})
	}

	const filterSelectedCategory = array => {
		if (!selectedCategory) return array
		return array.filter(item => item.category === selectedCategory)
	}

	const deleteProductHandler = productId => {
		dispatch({ type: 'DELETE_PRODUCT', payload: productId })
	}

	const editProductHandler = editedProduct => {
		dispatch({ type: 'EDIT_PRODUCT', payload: editedProduct })
	}

	useEffect(() => {
		const savedProducts =
			JSON.parse(localStorage.getItem('products')) || []
		const savedCategories =
			JSON.parse(localStorage.getItem('categories')) || []
		dispatch({ type: 'SET_PRODUCTS', payload: savedProducts })
		dispatch({ type: 'SET_CATEGORIES', payload: savedCategories })
	}, [])

	useEffect(() => {
		if (products.length) {
			localStorage.setItem('products', JSON.stringify(products))
		}
	}, [products])

	useEffect(() => {
		if (categories.length) {
			localStorage.setItem('categories', JSON.stringify(categories))
		}
	}, [categories])

	return (
		<div className="bg-slate-800 min-h-screen">
			<Header products={products} />
			<div className="container max-w-screen-sm mx-auto p-4">
				<Category categories={categories} />
				<Products categories={categories} />
				<Filter
					searchValue={searchValue}
					onSort={sortHandler}
					onSearch={searchHandler}
					sort={sort}
					categories={categories}
					selectedCategory={selectedCategory}
					onSelectedCategory={selectCategoryHandler}
				/>
				<ProductList
					products={filteredProducts}
					onDelete={deleteProductHandler}
					categories={categories}
					onEdit={editProductHandler}
				/>
			</div>
		</div>
	)
}

export default App
