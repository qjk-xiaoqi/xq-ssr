const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>hello</title>
      </head>
      <body>
        <div id="root">hello, 小柒</div> 
      </body>
    </html>
  `)
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
