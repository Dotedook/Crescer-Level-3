import { validationResult } from 'express-validator'
import { partidas } from './app-repository'

export const validarSchema = (req, res, next) => {
  const erros = validationResult(req)
  if (!erros.isEmpty()) {
    return res.status(400).json({ errors: erros.array() })
  }
  next()
}

export const calcularResultado = partida => {
  const { visitante, casa } = partida

  partida.isEmpate = false

  if (visitante.pontuacao > casa.pontuacao) {
    partida.vencedor = visitante.time
  } else if (casa.pontuacao > visitante.pontuacao) {
    partida.vencedor = casa.time
  } else {
    partida.isEmpate = true
    partida.vencedor = null
  }

  return partida
}

export const buscarPartidaPorId = id => {
  return partidas.find(partida => id === partida.id)
}

export const buscarIndexPartida = id => {
  return partidas.findIndex(partida => id === partida.id)
}

export const getPartidaTimeEditada = (partida, tipo, propriedade) => {
  const novaPartida = { ...partida }

  if (propriedade.time) {
    novaPartida[tipo].time = propriedade.time
  }
  if (propriedade.pontuacao) {
    novaPartida[tipo].pontuacao = propriedade.pontuacao
  }

  calcularResultado(novaPartida)
  return novaPartida
}
