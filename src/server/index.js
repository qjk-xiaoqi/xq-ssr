import express from 'express'
import App from '../App'
import { renderToString } from 'react-dom/server'

const content = renderToString(<App />)
const app = express()

app.use(express.static('dist'))

app.get('/', (req, res) => {
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
