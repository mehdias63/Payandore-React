import Category from './components/Category'
import Filter from './components/Filter'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Products from './components/Products'
import { useState, useEffect } from 'react'

function App() {
	const [categories, setCategories] = useState([])
	const [products, setProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [sort, setSort] = useState('')
	const [searchValue, setSearchValue] = useState('')

	useEffect(() => {
		let result = products
		result = filterSearchTitle(result)
		result = sortDate(result)
		setFilteredProducts(result)
	}, [products, sort, searchValue])

	const searchHandler = e => {
		setSearchValue(e.target.value.trim().toLowerCase())
	}
	const sortHandler = e => {
		setSort(e.target.value)
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
	return (
		<div className="bg-slate-800 min-h-screen">
			<Header />
			<div className="container max-w-screen-sm mx-auto p-4">
				<Category
					categories={categories}
					setCategories={setCategories}
				/>
				<Products
					categories={categories}
					products={products}
					setProducts={setProducts}
				/>
				<Filter
					searchValue={searchValue}
					onSort={sortHandler}
					onSearch={searchHandler}
					sort={sort}
				/>
				<ProductList
					products={filteredProducts}
					setProducts={setProducts}
				/>
			</div>
		</div>
	)
}

export default App
