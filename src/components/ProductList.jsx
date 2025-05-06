import { useState } from 'react'

function ProductList({ products, onDelete, onEdit, categories }) {
	const [editId, setEditId] = useState(null)
	const [editedProduct, setEditedProduct] = useState({
		title: '',
		quantity: '',
		category: '',
	})

	const handleEditClick = product => {
		setEditId(product.id)
		setEditedProduct({ ...product }) // پر کردن مقادیر محصول برای ویرایش
	}

	const handleSave = () => {
		if (
			editedProduct.title &&
			editedProduct.quantity &&
			editedProduct.category
		) {
			// ذخیره کردن تغییرات
			onEdit(editedProduct)
			setEditId(null) // بستن حالت ویرایش
			setEditedProduct({ title: '', quantity: '', category: '' })
		} else {
			alert('لطفا تمام فیلدها را پر کنید!')
		}
	}

	const handleCancel = () => {
		setEditId(null)
		setEditedProduct({ title: '', quantity: '', category: '' })
	}

	return (
		<div>
			<h2 className="text-slate-400">ProductList</h2>
			{products.map(product => {
				const isEditing = editId === product.id
				return (
					<div
						key={product.id}
						className="flex items-center justify-between mb-2 w-full min-w-[400px]"
					>
						{isEditing ? (
							<div className="w-full">
								<input
									type="text"
									name="title"
									value={editedProduct.title}
									onChange={e =>
										setEditedProduct({
											...editedProduct,
											title: e.target.value,
										})
									}
									className="bg-transparent text-slate-400 rounded-xl border border-slate-500 w-full mb-2"
								/>
								<input
									type="number"
									name="quantity"
									value={editedProduct.quantity}
									onChange={e =>
										setEditedProduct({
											...editedProduct,
											quantity: e.target.value,
										})
									}
									className="bg-transparent text-slate-400 rounded-xl border border-slate-500 w-full mb-2"
								/>
								<select
									name="category"
									value={editedProduct.category}
									onChange={e =>
										setEditedProduct({
											...editedProduct,
											category: e.target.value,
										})
									}
									className="bg-transparent text-slate-400 rounded-xl border border-slate-500 w-full mb-2"
								>
									<option value="">Select a category</option>
									{categories.map(cat => (
										<option key={cat.createdAt} value={cat.title}>
											{cat.title}
										</option>
									))}
								</select>
								<div className="flex items-center gap-x-4">
									<button
										onClick={handleSave}
										className="bg-blue-500 text-white rounded-xl px-4 py-2"
									>
										Save
									</button>
									<button
										onClick={handleCancel}
										className="bg-red-500 text-white rounded-xl px-4 py-2"
									>
										Cancel
									</button>
								</div>
							</div>
						) : (
							<div className="flex items-center gap-x-4 w-full">
								<span className="text-slate-400">
									{product.title}
								</span>
								<span className="text-slate-400">
									{new Date(product.createdAt).toLocaleDateString(
										'fa-IR',
									)}
								</span>
								<span className="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-2xl">
									{product.category}
								</span>
								<span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-300 text-slate-300">
									{product.quantity}
								</span>
								<div className="flex items-center gap-x-4">
									<button
										className="bg-green-500 text-white rounded-xl px-4 py-2"
										onClick={() => handleEditClick(product)}
									>
										Edit
									</button>
									<button
										className="delete-product border px-2 py-o.5 rounded-2xl border-red-400 text-red-400"
										onClick={() => onDelete(product.id)}
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
