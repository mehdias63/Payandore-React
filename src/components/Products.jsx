import { useState } from 'react'
import { useAppContext } from '../Store'

function Products() {
	const { state, dispatch } = useAppContext()
	const { categories, products } = state

	const [productsForm, setProductsForm] = useState({
		title: '',
		quantity: '',
		category: '',
	})

	const changeHandler = e => {
		const { name, value } = e.target
		setProductsForm({ ...productsForm, [name]: value })
	}

	const addNewProduct = e => {
		e.preventDefault()
		const newProduct = {
			id: crypto.randomUUID(),
			...productsForm,
			createdAt: new Date().toISOString(),
		}
		dispatch({
			type: 'SET_PRODUCTS',
			payload: [...products, newProduct],
		})
		setProductsForm({ title: '', quantity: '', category: '' })
	}

	return (
		<div className="mb-6 text-primary-900">
			<h2 className="text-xl font-bold mb-2">Add New Product</h2>
			<form className="bg-primary-500 p-4 rounded-xl flex flex-col gap-y-4">
				<div>
					<label htmlFor="product-title" className="block mb-1">
						Title
					</label>
					<input
						type="text"
						name="title"
						value={productsForm.title}
						id="product-title"
						className="bg-transparent rounded-lg border border-primary-300 w-full md:w-auto"
						onChange={changeHandler}
					/>
				</div>
				<div>
					<label htmlFor="product-quantity" className="block mb-1">
						Quantity
					</label>
					<input
						type="number"
						name="quantity"
						value={productsForm.quantity}
						id="product-quantity"
						className="bg-transparent rounded-lg border border-primary-300 w-full md:w-auto"
						onChange={changeHandler}
					/>
				</div>
				<div>
					<label htmlFor="product-category" className="block mb-1">
						Category
					</label>
					<select
						onChange={changeHandler}
						value={productsForm.category}
						name="category"
						id="product-category"
						className="bg-primary-500 rounded-lg w-full border-primary-300"
					>
						<option value="">Select a category</option>
						{categories.map(category => (
							<option key={category.title} value={category.title}>
								{category.title}
							</option>
						))}
					</select>
				</div>
				<div className="flex items-center justify-between gap-x-4">
					<button
						className="flex-1 bg-primary-300 rounded-lg py-2 hover:bg-primary-300/40"
						onClick={addNewProduct}
					>
						Add New Product
					</button>
				</div>
			</form>
		</div>
	)
}

export default Products
