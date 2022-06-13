import { partidas } from './app-repository'
import { buscarIndexPartida, calcularResultado } from './app-utils'

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

export const getTime = (req, res) => {
  const nomeTime = req.headers.authorization
  const resposta = {
    nome: nomeTime,
    partidasJogadas: 0,
    golsFeitos: 0,
    golsTomados: 0,
    vitorias: 0,
    derrotas: 0,
    empates: 0,
  }

  //VITIN VAI FAZER :)

  res.send(resposta)
}
