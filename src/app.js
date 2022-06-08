import { getPartidas, criarPartida, editarPartida, deletarPartida } from './app-service'

const express = require('express')
export const app = express()
const port = 3000

app.use(express.json())

app.get('/partidas', (req, res) => {
  res.send(getPartidas())
})

app.post('/partidas', (req, res) => {
  res.send(criarPartida(req))
})

app.put('/partidas/:id', (req, res) => {
  res.send(editarPartida(req, res))
})

app.delete('/partidas/:id', (req, res) => {
  res.send(deletarPartida(req, res))
})

app.listen(port, () => {
  console.log(`Aplicação executando na porta ${port}`)
})
