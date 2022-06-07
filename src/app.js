const express = require('express')
const app = express()
const port = 3000

const { randomUUID } = require('crypto')

const partidas = []

app.use(express.json())

app.get('/partidas', (req, res) => {
  res.send(partidas)
})

app.post('/partidas', function (req, res) {
  const { casa, visitante, placar_casa, placar_visitante } = req.body

  const partida = { casa, visitante, placar_casa, placar_visitante, id: randomUUID() }

  partidas.push(partida)

  res.json(partida)
})

app.put('/partidas/:id', function (req, res) {
  const { id } = req.params

  const indexPartida = partidas.findIndex(partida => id === partida.id)

  partidas[indexPartida] = { ...partidas[indexPartida], ...req.body }

  
  res.send(partidas[indexPartida])
})

app.delete('/partidas/:id', function (req, res) {
  const { id } = req.params

  const indexPartida = partidas.findIndex(partida => id === partida.id)

  partidas.splice(indexPartida, 1)

  res.send(partidas)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
