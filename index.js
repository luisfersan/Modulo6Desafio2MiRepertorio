const express = require('express')

const fs = require('fs')

const path = require('path')

const app = express()

app.listen(3000, () => {
  console.log('Servidor funcionando en el puerto 3000')
})

const index = path.join(__dirname, 'index.html')

app.get('/', (req, res) => {
  res.sendFile(index)
})

app.get('/canciones', (req, res) => {
  const canciones = JSON.parse(fs.readFileSync('./repertorio.json'))
  res.send(canciones)
})
