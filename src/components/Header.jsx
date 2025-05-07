import Toggle from './Toggle'
import { Moon } from 'lucide-react'
import { useDarkMode } from '../context/DarkModeContext'

function Header({ products }) {
	const { isDarkMode } = useDarkMode()
	return (
		<div className="h-12 flex items-center justify-center gap-x-4 bg-primary-300 text-primary-900 mb-6">
			<h1 className="md:text-xl text-sm font-bold">
				Inventory App using React & tailwind
			</h1>
			<span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-300 border-2 border-slate-300 font-bold ">
				{products.length}
			</span>
			<div className="flex items-center gap-x-2">
				<Toggle />
				<Moon
					className={`${
						isDarkMode ? 'text-primary-50' : 'text-primary-400'
					}`}
				/>
			</div>
		</div>
	)
}

export default Header
