import Category from './components/Category'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Products from './components/Products'
import { useState } from 'react'

function App() {
	const [categories, setCategories] = useState([])
	const [products, setProducts] = useState([])
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
				<ProductList products={products} setProducts={setProducts} />
			</div>
		</div>
	)
}

export default App
