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
		<div className="text-primary-900 mt-6 mb-40">
			<h2 className="text-xl font-bold mb-4">Product List</h2>
			{filteredProducts.map(product => {
				const isEditing = editId === product.id
				return (
					<div
						key={product.id}
						className="bg-primary-500 p-4 rounded-xl mb-6 flex flex-col gap-2 "
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
									className="bg-primary-500 p-2 rounded-lg border-primary-300"
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
									className="bg-primary-500 p-2 rounded-lg border-primary-300"
								/>
								<select
									value={editedProduct.category}
									onChange={e =>
										setEditedProduct({
											...editedProduct,
											category: e.target.value,
										})
									}
									className="bg-primary-500 p-2 rounded-lg border-primary-300"
								>
									<option value="">Select a category</option>
									{categories.map(cat => (
										<option key={cat.title} value={cat.title}>
											{cat.title}
										</option>
									))}
								</select>
								<div className="flex gap-2 mt-2 items-center justify-between">
									<button
										className="bg-primary-300 px-4 py-1 rounded-lg hover:bg-primary-300/40"
										onClick={handleSave}
									>
										Save
									</button>
									<button
										className="bg-transparent border border-primary-900 px-4 py-1 rounded-lg hover:bg-primary-300/40"
										onClick={handleCancel}
									>
										Cancel
									</button>
								</div>
							</>
						) : (
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-x-3">
									<h3 className="text-lg font-bold">
										{product.title}
									</h3>
									<p>{product.category}</p>
									<span className="">
										{new Date(product.createdAt).toLocaleDateString(
											'en-UK',
										)}
									</span>
									<span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-300 border-2 border-slate-300 font-bold ">
										{product.quantity}
									</span>
								</div>
								<div className="flex gap-6">
									<button
										className="text-blue-400"
										onClick={() => handleEditClick(product)}
									>
										Edit
									</button>
									<button
										className="text-error"
										onClick={() => handleDelete(product.id)}
									>
										Delete
									</button>
								</div>
							</div>
						)}
					</div>
				)
			})}
		</div>
	)
}

export default ProductList
