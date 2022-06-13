import { partidas } from './app-repository'
import {
  buscarIndexPartida,
  buscarPartidaPorId,
  calcularResultado,
  getPartidaTimeEditada,
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

export const editarTimePartida = (req, res) => {
  const { id } = req.params
  const partida = buscarPartidaPorId(id)

  const { visitante, casa } = req.body

  console.log(req.body)

  if (visitante) {
    const novaPartida = getPartidaTimeEditada(partida, 'visitante', visitante)
    partida.visitante = novaPartida.visitante
  }

  if (casa) {
    const novaPartida = getPartidaTimeEditada(partida, 'casa', casa)
    partida.casa = novaPartida.casa
  }

  res.send(partida)
}

export const deletarPartida = (req, res) => {
  const { id } = req.paramss
  const indexPartida = buscarIndexPartida(id)

  partidas.splice(indexPartida, 1)

  res.send(partidas)
}
