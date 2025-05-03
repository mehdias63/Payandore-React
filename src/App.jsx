import Category from './components/Category'
import Header from './components/Header'
import Products from './components/Products'

const products = [
	{
		id: 1,
		title: 'React.js',
		category: 'Frontend',
		created: '2022-10-08T18:48:46.250Z',
	},
	{
		id: 2,
		title: 'Node.js',
		category: 'Backend',
		created: '2023-11-04T18:48:46.250Z',
	},
	{
		id: 3,
		title: 'Vue.js',
		category: 'Frontend',
		created: '2024-05-11T18:48:46.250Z',
	},
]

const categories = [
	{
		id: 1,
		title: 'Frontend',
		description: 'The Frontend of Application',
		created: '2023-11-04T18:48:46.250Z',
	},
	{
		id: 2,
		title: 'Backend',
		description: 'The Backend of Application',
		created: '2023-10-04T18:48:46.250Z',
	},
]

function App() {
	return (
		<div className="bg-slate-800 min-h-screen">
			<Header />
			<div className="container max-w-screen-sm mx-auto p-4">
				<Category />
				<Products />
			</div>
		</div>
	)
}

export default App
