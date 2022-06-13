import { partidas } from './app-repository'
import {
  buscarIndexPartida,
  calcularResultado,
} from './app-utils'

const { randomUUID } = require('crypto')

export const getPartidas = (req, res) => {
  res.send(partidas)
}

export const criarPartida = (req, res) => {
  const novaPartida = { id: randomUUID(), ...req.body }

  const partidaComResultado = calcularResultado(novaPartida)

  partidas.push(partidaComResultado)

  res.send(partidaComResultado)
}

export const editarPartida = (req, res) => {
  const { id } = req.params
  const indexPartida = buscarIndexPartida(id)
  const novaPartida = { ...partidas[indexPartida], ...req.body }

  const partidaComResultado = calcularResultado(novaPartida)

  partidas[indexPartida] = partidaComResultado

  res.send(partidas[indexPartida])
}

export const deletarPartida = (req, res) => {
  const { id } = req.paramss
  const indexPartida = buscarIndexPartida(id)

  partidas.splice(indexPartida, 1)

  res.send(partidas)
}
