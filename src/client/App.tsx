import * as React from 'react'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import { getStore } from '../store'
import routes from '@/routes'

const App: React.FC = () => {
  const insertCss = (...styles: any[]) => {
    const removeCss = styles.map((style) => style._insertCss())
    return () => removeCss.forEach((dispose) => dispose())
  }
  return (
    <Provider store={getStore()}>
      <StyleContext.Provider value={{ insertCss }}>
        <BrowserRouter>
          <Link to="/">首页</Link>
          <Link to="/detail">detail</Link>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} Component={route.component} />
            ))}
          </Routes>
        </BrowserRouter>
      </StyleContext.Provider>
    </Provider>
  )
}

export default App
