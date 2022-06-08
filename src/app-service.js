import { partidas } from './app-repository'
import { validarIndexPartida } from './app-validator'

const { randomUUID } = require('crypto')

export const getPartidas = () => {
  return partidas
}

export const criarPartida = req => {
  const { casa, visitante, placarCasa, placarVisitante } = req.body

  const partida = { casa, visitante, placarCasa, placarVisitante, id: randomUUID() }

  partidas.push(partida)

  return partida
}

export const editarPartida = (req, res) => {
  const { id } = req.params

  validarIndexPartida(id, res)

  const indexPartida = partidas.findIndex(partida => id === partida.id)

  partidas[indexPartida] = { ...partidas[indexPartida], ...req.body }

  return partidas[indexPartida]
}

export const deletarPartida = (req, res) => {
  const { id } = req.params

  validarIndexPartida(id, res)

  const indexPartida = partidas.findIndex(partida => id === partida.id)

  partidas.splice(indexPartida, 1)

  return partidas
}
