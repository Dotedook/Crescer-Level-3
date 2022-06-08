import { partidas } from './app-repository'
import { validarIndexPartida } from './app-validator'

const { randomUUID } = require('crypto')

export const getPartidas = (req, res) => {
  res.send(partidas)
}

export const criarPartida = (req, res) => {
  const { casa, visitante, placarCasa, placarVisitante } = req.body

  const partida = { casa, visitante, placarCasa, placarVisitante, id: randomUUID() }

  partidas.push(partida)

  res.send(partida)
}

export const editarPartida = (req, res) => {
  const { id } = req.params
  const indexPartida = partidas.findIndex(partida => id === partida.id)

  partidas[indexPartida] = { ...partidas[indexPartida], ...req.body }

  res.send(partidas[indexPartida])
}

export const deletarPartida = (req, res) => {
  const { id } = req.params

  const indexPartida = partidas.findIndex(partida => id === partida.id)

  partidas.splice(indexPartida, 1)

  res.send(partidas)
}
