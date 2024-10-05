const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.json())

app.listen(3000, () => {
  console.log('Servidor funcionando en el puerto 3000')
})

const index = path.join(__dirname, 'index.html')

app.get('/', (req, res) => {
  res.sendFile(index)
})

app.get('/canciones', async(req, res) => {
  const canciones = await JSON.parse(fs.readFileSync('./repertorio.json'))
  res.send(canciones)
})

// app.post('/canciones', async(req, res) => {
//   const cancion = req.body
//   const canciones = await JSON.parse(fs.readFileSync('./repertorio.json'))
//   canciones.push(cancion)
//   fs.writeFileSync('./repertorio.json', JSON.stringify(canciones))
//   res.send(cancion)
// })

app.put('/canciones/:id', async(req, res) => {
  const id = parseInt(req.params.id)
  console.log(id, '<---- id')
  let canciones = await JSON.parse(fs.readFileSync('./repertorio.json'))
  const cancion = canciones.find((cancion) => {cancion.id === id})

  canciones = canciones.map((cancion) => {
    if (cancion.id === id) {
      return {
        ...cancion,
        ...req.body
      }
    }
    return cancion
  })

  fs.writeFileSync('./repertorio.json', JSON.stringify(canciones))
  res.send(cancion)
})

app.delete('/canciones/:id', async(req, res) => {
  const id = parseInt(req.params.id)
  let canciones = await JSON.parse(fs.readFileSync('./repertorio.json'))
  canciones = canciones.filter((cancion) => cancion.id !== id)
  fs.writeFileSync('./repertorio.json', JSON.stringify(canciones))
  res.send(canciones)})