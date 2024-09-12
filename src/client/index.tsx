import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import App from './App'

// hydrateRoot 不会二次渲染，只会绑定事件
ReactDOM.hydrateRoot(document.getElementById('root')!, <App />)

// const root = ReactDOM.createRoot(document.getElementById('root')!)

// root.render(<App />)
