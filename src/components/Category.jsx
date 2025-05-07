import { useState } from 'react'
import { useAppContext } from '../Store'

function Category() {
	const { state, dispatch } = useAppContext()
	const { categories } = state
	const [isShow, setIsShow] = useState(false)
	const [categoryForm, setCategoryForm] = useState({
		title: '',
		description: '',
	})

	const changeHandler = e => {
		const { name, value } = e.target
		setCategoryForm({ ...categoryForm, [name]: value })
	}

	const AddNewCategoryHandler = e => {
		e.preventDefault()
		dispatch({
			type: 'SET_CATEGORIES',
			payload: [
				...categories,
				{ ...categoryForm, createdAt: new Date().toISOString() },
			],
		})
		setCategoryForm({ title: '', description: '' })
	}

	return (
		<div>
			<div
				className={`mb-6 ${isShow ? '' : 'hidden'}`}
				id="category-wrapper"
			>
				<h2 className="text-xl font-bold mb-2 text-primary-900">
					Add New Category
				</h2>
				<form className="bg-primary-500 text-primary-900 p-4 rounded-xl flex flex-col gap-y-4">
					<div>
						<label htmlFor="category-title" className="block mb-1">
							Title
						</label>
						<input
							type="text"
							name="title"
							value={categoryForm.title}
							id="category-title"
							className="bg-transparent rounded-lg border border-primary-300 w-full md:w-auto"
							onChange={changeHandler}
						/>
					</div>
					<div>
						<label
							htmlFor="category-description"
							className="block mb-1"
						>
							Description
						</label>
						<textarea
							className="bg-transparent rounded-lg border border-primary-300 w-full"
							name="description"
							value={categoryForm.description}
							id="category-description"
							onChange={changeHandler}
						></textarea>
					</div>
					<div className="flex items-center justify-between gap-x-4">
						<button
							className="flex-1 border border-primary-300 rounded-lg py-2 hover:bg-primary-300/40"
							onClick={e => {
								e.preventDefault()
								setIsShow(false)
							}}
						>
							Cancel
						</button>
						<button
							className="flex-1 bg-primary-300 rounded-lg py-2 hover:bg-primary-300/40"
							onClick={AddNewCategoryHandler}
						>
							Add Category
						</button>
					</div>
				</form>
			</div>
			<button
				className={`text-slate-600 text-lg mb-4 font-medium ${
					isShow && 'hidden'
				}`}
				onClick={() => setIsShow(!isShow)}
			>
				Add new Category?
			</button>
		</div>
	)
}

export default Category
