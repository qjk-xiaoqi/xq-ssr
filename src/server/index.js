import express from 'express'
import React from 'react'
const fs = require('fs')
const path = require('path')
import { renderToString } from 'react-dom/server'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { Home } from '../component/home'
import { Detail } from '../component/detail'
import { StaticRouter } from 'react-router-dom/server'
import { Routes, Route, Link } from 'react-router-dom'

const app = express()

app.use(express.static('dist'))

app.get('*', (req, res) => {
  const css = new Set() // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach((style) => css.add(style._getCss()))
  const content = renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <StaticRouter location={req.url}>
        <Link to="/">首页</Link>
        <Link to="/detail">detail</Link>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/detail" Component={Detail} />
        </Routes>
      </StaticRouter>
    </StyleContext.Provider>
  )

  const jsFiles = fs.readdirSync(path.join(__dirname, '../dist')).filter((file) => file.endsWith('.js'))
  const jsScripts = jsFiles.map((file) => `<script src="${file}" defer></script>`).join('\n')

  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>React SSR</title>
        ${jsScripts}
        <style>${[...css].join('')}</style>
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
