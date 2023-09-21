import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'

document.title = 'Diner Counter'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
