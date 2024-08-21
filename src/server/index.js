import express from 'express'
import { renderToString } from 'react-dom/server'
import { Home } from '../component/home'
import { Detail } from '../component/detail'
import { StaticRouter } from 'react-router-dom/server'
import { Routes, Route, Link } from 'react-router-dom'

const app = express()

app.use(express.static('dist'))

app.get('*', (req, res) => {
  const content = renderToString(
    <div>
      <StaticRouter location={req.path}>
        <Link to="/">首页</Link>
        <Link to="/detail">detail</Link>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/detail" Component={Detail} />
        </Routes>
      </StaticRouter>
    </div>
  )

  res.send(`
    <html>
      <head>
        <title>hello</title>
        <script defer src='main.bundle.js'></script> 
      </head>
      <body>
        <div id="root">${content}</div> 
      </body>
    </html>
  `)
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
