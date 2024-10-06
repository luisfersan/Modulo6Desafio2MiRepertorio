// ******* Punto 1. Levantar un servidor local usando Express Js.

// ******* Instalamos Express.

// npm init -y
// npm install express

// ******* Creamos el archivo server.js donde configuramos el servidor básico de Express.

const express = require('express') // Importamos el módulo Express para crear el servidor.
const app = express() // Creamos una instancia de Express.
const PORT = 3000 // Definimos el puerto en el que correrá el servidor.

// Utilizamos Middleware para manejar JSON. Es un software que se sitúa entre un sistema operativo y las aplicaciones que se ejecutan en él.
app.use(express.json()) // Esto nos permite manejar payloads JSON.

// Iniciar el servidor.
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

// ******* Punto 2. Devolver una página web como respuesta a una consulta GET.

// ******* Para devolver una página HTML al hacer una consulta GET, agregamos una ruta que facilite el archivo index.html.
// ******* Colocamos el archivo HTML (index.html) entregado en el desafío, dentro de una carpeta pública llamada public y lo configuramos para que Express sirva archivos estáticos.

// Esto permitirá que al visitar http://localhost:3000/, el servidor devuelva el archivo index.html:

const path = require('path') // Importamos el módulo Path para trabajar con rutas de archivos.
app.use(express.static('public')) // Esta instrucción facilita o sirve archivos estáticos.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// ******* Punto 3. Ofrecer diferentes rutas con diferentes métodos HTTP que permitan las operaciones CRUD de datos alojados en un archivo JSON local.

// *******  Primero, creamos un archivo repertorio.json donde se almacenarán las canciones. Inicialmente vacío: []
// ******* Ahora, implementamos las rutas para las operaciones CRUD. Vamos a utilizar el módulo File System (fs) para leer y escribir en el archivo repertorio.json.

const fs = require('fs') // Importamos el módulo File System para leer y escribir archivos.
const dataPath = './repertorio.json' // Definimos la ruta del archivo JSON donde se almacenan las canciones.

// Creamos la función para leer el archivo JSON.

const getCanciones = () => {
  const jsonData = fs.readFileSync(dataPath)
  return JSON.parse(jsonData)
}

// Creamos la función para escribir en el archivo JSON.

const saveCanciones = (data) => {
  const stringifyData = JSON.stringify(data, null, 2)
  fs.writeFileSync(dataPath, stringifyData)
}

// GET: Para obtener todas las canciones.

app.get('/canciones', (req, res) => {
  const canciones = getCanciones()
  res.json(canciones)
})

// POST: Para agregar una nueva canción.

app.post('/canciones', (req, res) => {
  const canciones = getCanciones()
  const nuevaCancion = req.body
  canciones.push(nuevaCancion)
  saveCanciones(canciones)
  res.status(201).send('Canción agregada')
})

// PUT: Para editar una canción existente por id.

app.put('/canciones/:id', (req, res) => {
  const canciones = getCanciones()
  const { id } = req.params
  const nuevaInfo = req.body

  const cancionIndex = canciones.findIndex((c) => c.id == id)
  if (cancionIndex !== -1) {
    canciones[cancionIndex] = { id, ...nuevaInfo }
    saveCanciones(canciones)
    res.send('Canción actualizada')
  } else {
    res.status(404).send('Canción no encontrada')
  }
})

// DELETE: Para eliminar una canción por id.

app.delete('/canciones/:id', (req, res) => {
  const canciones = getCanciones()
  const { id } = req.params

  const nuevasCanciones = canciones.filter((c) => c.id != id)
  saveCanciones(nuevasCanciones)

  res.send('Canción eliminada')
})

// ******* Punto 4. Manipular los parámetros obtenidos en la URL.

// ******* Ya estamos manipulando el parámetro id en las rutas PUT y DELETE, previamente credas, mediante req.params.id

// Ahora vamos a manipularlo en la ruta PUT:
app.put('/canciones/:id', (req, res) => {
  const { id } = req.params // Obtenemos el id desde la URL lógica para encontrar y actualizar la canción.
})

// ******* 5. Manipular el payload de una consulta HTTP al servidor.

// ******* En las rutas POST y PUT, estamos manipulando el payload (los datos enviados en el cuerpo de la solicitud).
// ******* Usamos req.body para acceder a los datos enviados desde el cliente:

app.post('/canciones', (req, res) => {
  const nuevaCancion = req.body // Acceder al payload de la solicitud
  canciones.push(nuevaCancion) // Agregar la nueva canción al array
  saveCanciones(canciones) // Guardar los cambios en el JSON
  res.status(201).send('Canción agregada')
})
