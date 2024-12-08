import express from 'express'
import React from 'react'
const fs = require('fs')
const path = require('path')
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { StaticRouter } from 'react-router-dom/server'
import { Routes, Route, Link, matchRoutes } from 'react-router-dom'
import routes from '../routes'
import { getStore } from '../store'

const app = express()

app.use(express.static('dist'))

app.get('*', (req, res) => {
  const css = new Set() // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach((style) => css.add(style._getCss()))
  const store = getStore()
  const promises = []
  const matchedRoutes = matchRoutes(routes, req.url)
  // console.log(matchedRoutes, 'matchedRoutes->>>>>>')

  const jsFiles = fs.readdirSync(path.join(__dirname, '../dist')).filter((file) => file.endsWith('.js'))
  const jsScripts = jsFiles.map((file) => `<script src="${file}" defer></script>`).join('\n')

  // https://reactrouter.com/6.28.0/hooks/use-routes
  matchedRoutes?.forEach((item) => {
    if (item.route.loadData) {
      const promise = new Promise((resolve) => {
        item.route.loadData(store).then(resolve).catch(resolve)
      })
      promises.push(promise)
    }
  })

  Promise.all(promises).then(() => {
    const content = renderToString(
      <Provider store={store}>
        <StyleContext.Provider value={{ insertCss }}>
          <StaticRouter location={req.url}>
            <Link to="/">首页</Link>
            <Link to="/detail">detail</Link>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} Component={route.component} />
              ))}
            </Routes>
          </StaticRouter>
        </StyleContext.Provider>
      </Provider>
    )
    res.send(`
      <!doctype html>
      <html>
        <head>
          <title>React SSR</title>
          ${jsScripts}
          <script>
            window.INITIAL_STATE =${JSON.stringify(store.getState())}
          </script>
          <style>${[...css].join('')}</style>
        </head>
        <body>
          <div id="root">${content}</div> 
        </body>
      </html>
    `)
  })
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
