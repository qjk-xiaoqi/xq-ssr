import * as React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Home } from '../component/home'
import { Detail } from '../component/detail'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Link to="/">首页</Link>
      <Link to="/detail">detail</Link>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/detail" Component={Detail} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
