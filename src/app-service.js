import { validationResult } from 'express-validator'
import { partidas } from './app-repository'

const { randomUUID } = require('crypto')

export const getPartidas = (req, res) => {
  res.send(partidas)
}

export const criarPartida = (req, res) => {
  const novaPartida = { id: randomUUID(), ...req.body }

  partidas.push(novaPartida)

  res.send(req.body)
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

export const validarSchema = (req, res, next) => {
  const erros = validationResult(req)
  if (!erros.isEmpty()) {
    return res.status(400).json({ errors: erros.array() })
  }
  next()
}
