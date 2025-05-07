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
		<div className="mb-6">
			<h2 className="text-xl text-slate-300 font-bold mb-2">
				Add New Product
			</h2>
			<form className="bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4">
				<div>
					<label
						htmlFor="product-title"
						className="block mb-1 text-slate-400"
					>
						Title
					</label>
					<input
						type="text"
						name="title"
						value={productsForm.title}
						id="product-title"
						className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
						onChange={changeHandler}
					/>
				</div>
				<div>
					<label
						htmlFor="product-quantity"
						className="block mb-1 text-slate-400"
					>
						Quantity
					</label>
					<input
						type="number"
						name="quantity"
						value={productsForm.quantity}
						id="product-quantity"
						className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
						onChange={changeHandler}
					/>
				</div>
				<div>
					<label
						htmlFor="product-category"
						className="block mb-1 text-slate-400"
					>
						Category
					</label>
					<select
						onChange={changeHandler}
						value={productsForm.category}
						name="category"
						id="product-category"
						className="bg-transparent text-slate-400 rounded-xl w-full"
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
						className="flex-1 bg-slate-500 text-slate-200 rounded-xl py-2"
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
