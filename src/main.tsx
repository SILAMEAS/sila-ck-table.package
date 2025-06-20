import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// npm version patch   # for bugfixes
// npm version minor   # for new features
// npm version major   # for breaking changes

createRoot(document.getElementById('root')!).render(
  <App />
)
