import * as React from 'react'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Home } from '../component/home'
import { Detail } from '../component/detail'

const App: React.FC = () => {
  const insertCss = (...styles: any[]) => {
    const removeCss = styles.map((style) => style._insertCss())
    return () => removeCss.forEach((dispose) => dispose())
  }
  return (
    <StyleContext.Provider value={{ insertCss }}>
      <BrowserRouter>
        <Link to="/">首页</Link>
        <Link to="/detail">detail</Link>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/detail" Component={Detail} />
        </Routes>
      </BrowserRouter>
    </StyleContext.Provider>
  )
}

export default App
