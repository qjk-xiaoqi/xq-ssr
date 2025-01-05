import * as React from 'react'

import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { Routes, Route, Link } from 'react-router-dom'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import routes from '../routes'

export const HTML = ({ store, insertCss, req }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React SSR</title>
      </head>
      <body>
        <div id="root">
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
        </div>
      </body>
    </html>
  )
}
