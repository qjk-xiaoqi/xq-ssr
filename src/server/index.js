import express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import { getStore } from '../store'
import { renderToPipeableStream, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Routes, Route, Link, matchRoutes } from 'react-router-dom'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import routes from '../routes'

import { Transform } from 'stream'
import { HTML } from './html'

const fs = require('fs')
const path = require('path')

const app = express()

app.use(express.static('dist'))

app.get('*', (req, res) => {
  // 1、创建store
  const store = getStore()
  const promises = []
  // 2、matchRoutes 分析路由组件，分析 store 中需要的数据
  const matchedRoutes = matchRoutes(routes, req.url)
  // https://reactrouter.com/6.28.0/hooks/use-routes
  matchedRoutes?.forEach((item) => {
    if (item.route.loadData) {
      const promise = new Promise((resolve) => {
        // 3/4、触发 Action 获取数据、更新 store 的数据
        item.route.loadData(store).then(resolve).catch(resolve)
      })
      promises.push(promise)
    }
  })
  // 新增css set
  const css = new Set() // CSS for all rendered React components
  // 定义 insertCss 方法，调用 _getCss 方法获取将组件样式添加到  css Set  中
  const insertCss = (...styles) => styles.forEach((style) => css.add(style._getCss()))
  // const cssFiles = fs.readdirSync(path.join(__dirname, '../dist/assets/css')).filter((file) => file.endsWith('.css'))
  // const cssScripts = cssFiles.map((file) => `<link rel="stylesheet" href="${file}">`).join('\n')
  const jsFiles = fs.readdirSync(path.join(__dirname, '../dist')).filter((file) => file.endsWith('.js'))
  const jsScripts = jsFiles.map((file) => `<script src="${file}" defer></script>`).join('\n')

  // 5、结合数据和组件生成HTML (自行拼接 html 字符串)
  Promise.all(promises).then(() => {
    const { pipe, abort } = renderToPipeableStream(
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
      </Provider>,
      {
        bootstrapScripts: jsFiles,
        bootstrapScriptContent: `window.INITIAL_STATE = ${JSON.stringify(store.getState())}`,
        onShellReady: () => {
          res.setHeader('content-type', 'text/html')
          // headTpl 代表 <html><head>...</head><body><div id='root'> 部分的模版
          // tailTpl 代表 </div></body></html> 部分的模版
          const headTpl = `
          <html lang="en">
          <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>React SSR</title>
            <style>${[...css].join('')}</style>
          </head>
          <body>
            <div id="root">`

          const tailTpl = `
            </div>
          </body>
        </html>
      `
          let isShellStream = true

          const injectTemplateTransform = new Transform({
            transform(chunk, _encoding, callback) {
              if (isShellStream) {
                this.push(`${headTpl}${chunk.toString()}`)
                isShellStream = false
              } else {
                this.push(chunk)
              }
              callback()
            },
            flush(callback) {
              // end触发前执行
              this.push(tailTpl)
              callback()
            },
          })
          pipe(injectTemplateTransform).pipe(res)
        },
        onErrorShell() {
          // 错误发生时替换外壳
          res.statusCode = 500
          res.send('<!doctype><p>Error</p>')
        },
      }
    )

    setTimeout(abort, 10_000)
  })

  /* 官方推荐的方式实现 **/
  // 5、结合数据和组件生成HTML (官方推荐的方式实现)
  // Promise.all(promises).then(() => {
  //   const { pipe, abort } = renderToPipeableStream(
  //     <HTML store={store} insertCss={insertCss} req={req} css={[...css].join('')} />,
  //     {
  //       bootstrapScripts: jsFiles,
  //       bootstrapScriptContent: `window.INITIAL_STATE = ${JSON.stringify(store.getState())}`,
  //       onShellReady: () => {
  //         res.setHeader('content-type', 'text/html')
  //         let isShellStream = true

  //         const injectTemplateTransform = new Transform({
  //           transform(chunk, _encoding, callback) {
  //             if (isShellStream) {
  //               const chunkString = chunk.toString()
  //               let curStr = ''
  //               const titleIndex = chunkString.indexOf('</title>')
  //               if (titleIndex !== -1) {
  //                 const styleTag = `<style>${[...css].join('')}</style>`
  //                 curStr = chunkString.slice(0, titleIndex + 8) + styleTag + chunkString.slice(titleIndex + 8)
  //               }
  //               this.push(curStr)
  //               isShellStream = false
  //             } else {
  //               this.push(chunk)
  //             }
  //             callback()
  //           },
  //         })
  //         pipe(injectTemplateTransform).pipe(res)
  //       },
  //       onErrorShell() {
  //         // 错误发生时替换外壳
  //         res.statusCode = 500
  //         res.send('<!doctype><p>Error</p>')
  //       },
  //     }
  //   )

  //   setTimeout(abort, 10_000)
  // })

  /* renderToString 的方式实现 **/
  // 5、结合数据和组件生成HTML
  // Promise.all(promises).then(() => {
  //   const content = renderToString(
  //     <Provider store={store}>
  //       <StyleContext.Provider value={{ insertCss }}>
  //         <StaticRouter location={req.url}>
  //           <Link to="/">首页</Link>
  //           <Link to="/detail">detail</Link>
  //           <Routes>
  //             {routes.map((route) => (
  //               <Route key={route.path} path={route.path} Component={route.component} />
  //             ))}
  //           </Routes>
  //         </StaticRouter>
  //       </StyleContext.Provider>
  //     </Provider>
  //   )

  //   res.send(`
  //     <!doctype html>
  //     <html>
  //       <head>
  //         <title>React SSR</title>
  //         ${jsScripts}
  //         <script>
  //           window.INITIAL_STATE =${JSON.stringify(store.getState())}
  //         </script>
  //         <!-- 获取页面的样式，放入 <style> 标签中 -->
  //         <style>${[...css].join('')}</style>
  //       </head>
  //       <body>
  //         <div id="root">${content}</div>
  //       </body>
  //     </html>
  //   `)
  // })
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
