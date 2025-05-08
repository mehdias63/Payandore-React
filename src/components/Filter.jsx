import { useAppContext } from '../Store'

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
		<div className="mb-6 text-primary-900">
			<h2 className="text-xl font-bold mb-4">Filter Products</h2>
			<div className="bg-primary-500 p-4 rounded-xl mb-6 gap-y-4">
				<div className="flex flex-col gap-4">
					<input
						type="text"
						value={searchValue}
						onChange={onSearch}
						placeholder="Search by title"
						className="bg-primary-500 p-2 rounded-lg border-primary-300"
					/>
					<select
						value={selectedCategory}
						onChange={onSelectedCategory}
						className="bg-primary-500 p-2 rounded-lg border-primary-300"
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
						className="bg-primary-500 p-2 rounded-lg border-primary-300"
					>
						<option value="">Sort by</option>
						<option value="latest">Newest first</option>
						<option value="earliest">Oldest first</option>
					</select>
				</div>
			</div>
		</div>
	)
}

export default Filter
