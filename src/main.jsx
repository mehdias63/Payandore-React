import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './Store'
import { DarkModeProvider } from './context/DarkModeContext'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<DarkModeProvider>
			<AppProvider>
				<App />
			</AppProvider>
		</DarkModeProvider>
	</StrictMode>,
)
