import { useAppContext } from '../store'

function Filter({
	onSort,
	onSearch,
	sort,
	selectedCategory,
	onSelectedCategory,
}) {
	const { state } = useAppContext()
	const { categories, searchValue } = state

	return (
		<div className="bg-slate-700 p-4 rounded-xl mb-6">
			<h2 className="text-slate-300 font-bold mb-4">
				Filter Products
			</h2>
			<div className="flex flex-col gap-4">
				<input
					type="text"
					value={searchValue}
					onChange={onSearch}
					placeholder="Search by title"
					className="bg-slate-800 text-slate-200 p-2 rounded"
				/>
				<select
					value={selectedCategory}
					onChange={onSelectedCategory}
					className="bg-slate-800 text-slate-200 p-2 rounded"
				>
					<option value="">All categories</option>
					{categories.map(cat => (
						<option key={cat.title} value={cat.title}>
							{cat.title}
						</option>
					))}
				</select>
				<select
					value={sort}
					onChange={onSort}
					className="bg-slate-800 text-slate-200 p-2 rounded"
				>
					<option value="">Sort by</option>
					<option value="latest">Newest first</option>
					<option value="earliest">Oldest first</option>
				</select>
			</div>
		</div>
	)
}

export default Filter
