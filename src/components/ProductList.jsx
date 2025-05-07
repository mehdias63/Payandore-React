import { useState } from 'react'
import { useAppContext } from '../Store'

function ProductList() {
	const { state, dispatch } = useAppContext()
	const { filteredProducts, categories } = state

	const [editId, setEditId] = useState(null)
	const [editedProduct, setEditedProduct] = useState({
		title: '',
		quantity: '',
		category: '',
	})

	const handleEditClick = product => {
		setEditId(product.id)
		setEditedProduct({ ...product })
	}

	const handleSave = () => {
		if (
			editedProduct.title &&
			editedProduct.quantity &&
			editedProduct.category
		) {
			dispatch({ type: 'EDIT_PRODUCT', payload: editedProduct })
			setEditId(null)
			setEditedProduct({ title: '', quantity: '', category: '' })
		} else {
			alert('لطفا تمام فیلدها را پر کنید!')
		}
	}

	const handleCancel = () => {
		setEditId(null)
		setEditedProduct({ title: '', quantity: '', category: '' })
	}

	const handleDelete = id => {
		dispatch({ type: 'DELETE_PRODUCT', payload: id })
	}

	return (
		<div className="text-slate-300 mt-6">
			<h2 className="text-lg font-semibold mb-4">Product List</h2>
			{filteredProducts.map(product => {
				const isEditing = editId === product.id
				return (
					<div
						key={product.id}
						className="bg-slate-700 p-4 rounded-xl mb-2 flex flex-col gap-2"
					>
						{isEditing ? (
							<>
								<input
									type="text"
									value={editedProduct.title}
									onChange={e =>
										setEditedProduct({
											...editedProduct,
											title: e.target.value,
										})
									}
									placeholder="Title"
									className="bg-slate-800 text-slate-300 p-2 rounded"
								/>
								<input
									type="number"
									value={editedProduct.quantity}
									onChange={e =>
										setEditedProduct({
											...editedProduct,
											quantity: e.target.value,
										})
									}
									placeholder="Quantity"
									className="bg-slate-800 text-slate-300 p-2 rounded"
								/>
								<select
									value={editedProduct.category}
									onChange={e =>
										setEditedProduct({
											...editedProduct,
											category: e.target.value,
										})
									}
									className="bg-slate-800 text-slate-300 p-2 rounded"
								>
									<option value="">Select a category</option>
									{categories.map(cat => (
										<option key={cat.title} value={cat.title}>
											{cat.title}
										</option>
									))}
								</select>
								<div className="flex gap-2 mt-2">
									<button
										className="bg-blue-500 px-4 py-1 rounded"
										onClick={handleSave}
									>
										Save
									</button>
									<button
										className="bg-gray-500 px-4 py-1 rounded"
										onClick={handleCancel}
									>
										Cancel
									</button>
								</div>
							</>
						) : (
							<>
								<div>
									<strong>{product.title}</strong> -{' '}
									{product.quantity} pcs - <em>{product.category}</em>
								</div>
								<div className="flex gap-2">
									<button
										className="text-blue-400"
										onClick={() => handleEditClick(product)}
									>
										Edit
									</button>
									<button
										className="text-red-400"
										onClick={() => handleDelete(product.id)}
									>
										Delete
									</button>
								</div>
							</>
						)}
					</div>
				)
			})}
		</div>
	)
}

export default ProductList
